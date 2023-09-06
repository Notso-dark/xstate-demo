import { useInterpret, useSelector } from "@xstate/react";
import { useRouter } from "next/router";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import type { InterpreterFrom, StateFrom } from "xstate";
import { authenticationMachine } from "./authentication.machine";
import { Auth } from "./authentication.type";

export interface IAuthContext {
  authService: InterpreterFrom<typeof authenticationMachine>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

type AuthState = StateFrom<typeof authenticationMachine>;
export const authSelector = (state: AuthState) => state.context.auth;
export const loggedInSelector = (state: AuthState) => state.matches("loggedIn");

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const logout = useCallback(() => {
    context.authService.send({ type: "LOG_OUT" });
  }, [context.authService]);

  const login = useCallback(
    ({ auth }: { auth: Auth }) => {
      context.authService.send({ type: "LOG_IN", auth });
    },
    [context.authService]
  );

  const auth = useSelector(context.authService, authSelector);
  const isLoggedIn = useSelector(context.authService, loggedInSelector);

  const memoizedContext = useMemo(
    () => ({
      ...context,
      auth,
      isLoggedIn,
      login,
      logout,
    }),
    [auth, context, isLoggedIn, login, logout]
  );
  return memoizedContext;
}

export interface IAuthProviderProps {}
export function AuthProvider({
  children,
}: PropsWithChildren<IAuthProviderProps>) {
  const router = useRouter();

  const authService = useInterpret(authenticationMachine, {
    devTools: true,
    services: {
      checkIfLoggedIn: () => async (send) => {
        const { user } = await (await fetch("/api/profile")).json();
        if (user) {
          send({ type: "REPORT_IS_LOGGED_IN", auth: { user } });
        } else {
          send({ type: "REPORT_IS_LOGGED_OUT" });
        }
      },
    },
    actions: {
      navigateToAuthPage: () => {
        if (router.pathname.includes("/app")) router.push("/");
      },
    },
  });

  return (
    <AuthContext.Provider value={{ authService }}>
      {children}
    </AuthContext.Provider>
  );
}

export function NotAllowed() {
  return (
    <p className="flex justify-center flex-auto px-2 py-1 m-1 text-xs font-medium rounded-sm sm:text-sm ring-1">
      Forbiden
    </p>
  );
}

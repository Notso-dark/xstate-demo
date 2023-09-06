import { assign, createMachine, Sender } from "xstate";
import { Auth } from "./authentication.type";

export type AuthenticationMachineContext = {
  auth?: Auth;
};

export type AuthenticationMachineState =
  | { value: "checkingIfLoggedIn"; context: AuthenticationMachineContext }
  | { value: "loggedIn"; context: AuthenticationMachineContext }
  | { value: "loggedOut"; context: AuthenticationMachineContext };

export type AuthenticationMachineEvent =
  | { type: "REPORT_IS_LOGGED_IN"; auth: Auth }
  | { type: "REPORT_IS_LOGGED_OUT" }
  | { type: "LOG_OUT" }
  | { type: "LOG_IN"; auth: Auth };

export const authenticationMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAxADIDyA4gPo0CqAKgNoAMAuoqAA6lY+Mjj4gAHogAsAJgA0IAJ6IAHKoB0AZgDsAVgC+BxWiy4CxURsLZCAa3w4oASQBmVUlBgRnlMACd-Un8NfgAbEldggFsNU2w8IhJ8cmtbByc3Dy9IXwRHADdSSxScLm5y8UFhUXEpBFkANh0NTmlG1X1FFQa9AE4NRtlDYxB48ySrGzB7Rxd3T29fCgAlAFEABRoV1gZnAGUGWjo6NYARPYA5SqQQapFSusQmlraOruVELU4WgEZhowmDAJCzJVLTWaZBY5HyUdZbHZ7Q7HU4XFgcHhVIQPchPBrNVrtTp6brPTgDf4jIFmRIlVJhRaQGgYaj0K43ATY2q3eo6RqNDSyPrvEmfBB9aQaSlGUY4UgQODica0sFiW73bmgeoAWkapIQusBY2BEzpODSMwy82ySzVnJqjx5MgUYtkWj0UoBo2VoKsDJhvixDtxTvFQw0qj6nCGop6lMFVONNN9pQ0-u8zPQQZxdskiD0vy0Gj0Mf1ql+xZlBiAA */
    tsTypes: {} as import("./authentication.machine.typegen").Typegen0,
    schema: {
      context: {} as AuthenticationMachineContext,
      events: {} as AuthenticationMachineEvent,
      services: {} as { checkIfLoggedIn: { data: void } },
    },
    predictableActionArguments: true,
    id: "authentication",
    initial: "checkingIfLoggedIn",
    on: {
      LOG_OUT: {
        target: ".loggedOut",
      },
    },
    states: {
      checkingIfLoggedIn: {
        invoke: {
          src: "checkIfLoggedIn",
          onError: [{ target: "loggedOut" }],
        },
        on: {
          REPORT_IS_LOGGED_IN: {
            actions: "assignAuthToContext",
            target: "loggedIn",
          },
          REPORT_IS_LOGGED_OUT: {
            target: "loggedOut",
          },
        },
      },
      loggedIn: {},
      loggedOut: {
        entry: ["navigateToAuthPage", "clearAuthFromContext"],
        on: {
          LOG_IN: {
            actions: "assignAuthToContext",
            target: "loggedIn",
          },
        },
      },
    },
  },
  {
    services: {
      checkIfLoggedIn:
        () => async (send: Sender<AuthenticationMachineEvent>) => {
          throw new Error("not implemented");
          // implementation can perform async tasks like API calls and
          // should send({ type: 'REPORT_IS_LOGGED_IN', auth })
          // or send({ type: 'REPORT_IS_LOGGED_OUT' })
          // according to login status
        },
    },
    actions: {
      navigateToAuthPage: () => {
        throw new Error("not implemented");
      },
      assignAuthToContext: assign((context, event) => {
        return { auth: event.auth };
      }),
      clearAuthFromContext: assign({ auth: undefined }),
    },
  }
);

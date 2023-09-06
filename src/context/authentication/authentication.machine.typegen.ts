// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "error.platform.authentication.checkingIfLoggedIn:invocation[0]": {
      type: "error.platform.authentication.checkingIfLoggedIn:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    checkIfLoggedIn: "done.invoke.authentication.checkingIfLoggedIn:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignAuthToContext: "LOG_IN" | "REPORT_IS_LOGGED_IN";
    clearAuthFromContext:
      | "LOG_OUT"
      | "REPORT_IS_LOGGED_OUT"
      | "error.platform.authentication.checkingIfLoggedIn:invocation[0]";
    navigateToAuthPage:
      | "LOG_OUT"
      | "REPORT_IS_LOGGED_OUT"
      | "error.platform.authentication.checkingIfLoggedIn:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    checkIfLoggedIn: "xstate.init";
  };
  matchesStates: "checkingIfLoggedIn" | "loggedIn" | "loggedOut";
  tags: never;
}

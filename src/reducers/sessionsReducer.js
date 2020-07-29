export default function sessionsReducer(state = "NOT_LOGGED_IN", action) {
  switch (action.type) {
    case "LOGIN_USER":
      console.log("STATE ---", state);
      console.log("ACTION ---", action);
      return "LOGGED_IN";

    case "LOGOUT_USER":
      console.log("STATE ---", state);
      console.log("ACTION ---", action);
      return "NOT_LOGGED_IN";

    default:
      return state;
  }
}

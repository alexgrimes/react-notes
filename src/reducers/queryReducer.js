export default function queryReducer(state = "", action) {
  switch (action.type) {
    case "UPDATE_QUERY":
      console.log("STORE ---", state);
      console.log("ACTION ---", action);
      return action.query;

    default:
      return state;
  }
}

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case "LOGIN_USER":
      console.log("STATE:", state)
      console.log("ACTION:", action)
      return action.user; 
    
    case "LOGOUT_USER":
      console.log("STATE:", state)
      console.log("ACTION:", action)
      return {};

    default: 
      return state;
  }
}
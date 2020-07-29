import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import sessionsReducer from "./sessionsReducer";
import usersReducer from "./usersReducer";
import queryReducer from "./queryReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  loggedInStatus: sessionsReducer,
  user: usersReducer,
  query: queryReducer,
});

export default rootReducer;

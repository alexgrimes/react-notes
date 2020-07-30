import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import sessionsReducer from "./auth";
import usersReducer from "./usersReducer";
import queryReducer from "./queryReducer";
import auth from './auth'

const rootReducer = combineReducers({
  notes: notesReducer,
  loggedInStatus: sessionsReducer,
  user: usersReducer,
  query: queryReducer,
});

export default rootReducer;

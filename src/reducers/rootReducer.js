import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import usersReducer from "./usersReducer";
import queryReducer from "./queryReducer";
import authReducer from './authReducer'

const rootReducer = combineReducers({
  notes: notesReducer,
  loggedInStatus: authReducer,
  user: usersReducer,
  query: queryReducer,
});

export default rootReducer;

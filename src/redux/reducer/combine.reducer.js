import { combineReducers } from "redux";
import {taskReducer} from "./task.reducer";
import {userReducer} from "./user.reducer";

const rootReducer=combineReducers({
    user:userReducer,
    task:taskReducer
})

export default rootReducer
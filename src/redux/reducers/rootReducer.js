import {combineReducers} from "redux";
import {cardReducer} from "./cardReducer";
import {authReducer} from "./authReducer";

export const rootReducer = combineReducers({
    card: cardReducer,
    auth: authReducer
});
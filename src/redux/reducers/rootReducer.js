import {combineReducers} from "redux";
import {cardReducer} from "./cardReducer";
import {authReducer} from "./authReducer";
import {regionReducer} from "./regionReducer";
import {branchReducer} from "./branchReducer";
import {deliveryPriceReducer} from "./deliveryPriceReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    card: cardReducer,
    auth: authReducer,
    region: regionReducer,
    branch: branchReducer,
    price: deliveryPriceReducer,
    user: userReducer
});
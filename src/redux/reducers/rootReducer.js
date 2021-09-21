import {combineReducers} from "redux";
import {cardReducer} from "./cardReducer";
import {authReducer} from "./authReducer";
import {regionReducer} from "./regionReducer";
import {branchReducer} from "./branchReducer";
import {deliveryPriceReducer} from "./deliveryPriceReducer";
import {userReducer} from "./userReducer";
import {eposReducer} from "./eposReducer";
import {paymentReducer} from "./paymentReducer";

export const rootReducer = combineReducers({
    card: cardReducer,
    auth: authReducer,
    region: regionReducer,
    branch: branchReducer,
    price: deliveryPriceReducer,
    user: userReducer,
    epos: eposReducer,
    payment: paymentReducer
});
import {UPDATESTATE} from "../types/deliveryPriceType";

const initialState = {
    prices: [],
    isOpen: false,
    isOpenDelete: false,
    priceId: null,
    isLoading: false,
    selectedPrice: null
}

export const deliveryPriceReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
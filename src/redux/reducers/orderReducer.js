import {UPDATESTATE} from "../types/orderType";

const initialState = {
    orders: [],
    isLoading: false,
    page: 0,
    totalPages: 0,
    selectedOrder: null,
    selectedOrderChange: null,
    isOpen: false,
    orderInfo: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
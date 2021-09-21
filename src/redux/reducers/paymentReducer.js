import {UPDATESTATE} from "../types/paymentType";

const initialState = {
    payments: [],
    isLoading: false,
    page: 0,
    totalPages: 0,
    selectedPayment: null,
    isOpen: false
}

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
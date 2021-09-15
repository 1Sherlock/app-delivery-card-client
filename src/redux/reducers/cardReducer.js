import {UPDATESTATE} from "../types/cardType";

const initialState = {
    cards: [],
    isOpen: false,
    file: null,
    isOpenDelete: false
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
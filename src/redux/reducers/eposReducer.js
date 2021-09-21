import {UPDATESTATE} from "../types/eposType";

const initialState = {
    eposes: [],
    isOpen: false,
    isOpenDelete: false,
    eposId: null,
    isLoading: false,
    selectedEpos: null
}

export const eposReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
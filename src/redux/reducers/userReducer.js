import {UPDATESTATE} from "../types/userType";

const initialState = {
    users: [],
    isOpen: false,
    isOpenDelete: false,
    userId: null,
    isLoading: false,
    selectedUser: null,
    isOpenPassword: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
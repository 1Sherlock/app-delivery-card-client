import {UPDATESTATE} from "../types/branchType";

const initialState = {
    branches: [],
    isOpen: false,
    isOpenDelete: false,
    branchId: null,
    isLoading: false,
    selectedBranch: null
}

export const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
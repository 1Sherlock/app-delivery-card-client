import {UPDATESTATE} from "../types/regionType";

const initialState = {
    regions: [],
    isOpen: false,
    isOpenDelete: false,
    regionId: null,
    isLoading: false,
    selectedRegion: null
}

export const regionReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
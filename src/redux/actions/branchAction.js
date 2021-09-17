import {UPDATESTATE} from "../types/branchType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getBranches = () => (dispatch) => {
    axios.get(API_PATH + "reference/branches", CONFIG)
        .then(res => {
            console.log(res);
            dispatch(updateState({branches: res.data.branches}));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}


export const save = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))

    if (v.id) {
        axios.put(API_PATH + "api/branch/update", v, CONFIG)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.branches) {
                        dispatch(updateState({branches: res.data.branches, isOpen: false}));
                        toast.success("Изменено")
                    } else {
                        toast.error(res.data.message);
                    }
                }
            })
            .catch(err => {
                toast.error("Ошибка!")
            })
            .finally(() => {
                dispatch(updateState({isLoading: false}))
            })
    } else {

        axios.post(API_PATH + "api/branch/create", v, CONFIG)
            .then(res => {
                if (res.status === 200) {
                    dispatch(updateState({branches: res.data.branches, isOpen: false}));
                    toast.success("Сохранено")
                }
            })
            .catch(err => {
                toast.error("Ошибка!")
            })
            .finally(() => {
                dispatch(updateState({isLoading: false}))
            })
    }

}

export const deleteBranch = () => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.delete(API_PATH + "api/branch/delete?branchId=" + getState().branch.branchId, CONFIG)
        .then(res => {
            if (res.status === 200) {
                dispatch(updateState({branches: res.data.branches, isOpenDelete: false, branchId: null}));
                toast.success("Удалено")
            }
        })
        .catch(err => {
            toast.error("Ошибка!")
        })
        .finally(() => {
            dispatch(updateState({isLoading: false}))
        })
}
import {UPDATESTATE} from "../types/eposType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getEposes = () => (dispatch) => {
    axios.get(API_PATH + "api/eposes", CONFIG)
        .then(res => {
            console.log(res);
            dispatch(updateState({eposes: res.data.eposes}));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}


export const save = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))

    if (v.id){
        axios.put(API_PATH + "api/epos/update", {...v, processing: parseInt(v.processing), branch: getState().branch.branches.filter(item => item.id === v.branchId)[0]?.nameRus}, CONFIG)
            .then(res => {
                if (res.status === 200){
                    if (res.data.eposes) {
                        dispatch(updateState({isOpen: false, selectedEpos: null}));
                        toast.success("Изменено")
                    } else {
                        toast.error(res.data.message);
                    }
                    dispatch(getEposes());
                }
            })
            .catch(err => {
                toast.error("Ошибка!")
            })
            .finally(() => {
                dispatch(updateState({isLoading: false}))
            })
    } else {

        axios.post(API_PATH + "api/epos/create", {...v, processing: parseInt(v.processing), branch: getState().branch.branches.filter(item => item.id === v.branchId)[0]?.nameRus}, CONFIG)
            .then(res => {
                if (res.status === 200){
                    dispatch(updateState({isOpen: false}));
                    toast.success("Сохранено")
                    dispatch(getEposes());
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

export const deleteEpos = () => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.delete(API_PATH + "api/epos/delete?eposId=" + getState().epos.eposId, CONFIG)
        .then(res => {
            if (res.status === 200){
                dispatch(updateState({eposes: res.data.eposes, isOpenDelete: false, eposId: null}));
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
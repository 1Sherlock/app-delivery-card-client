import {UPDATESTATE} from "../types/userType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getUsers = () => (dispatch) => {
    axios.get(API_PATH + "api/users", CONFIG)
        .then(res => {
            console.log(res);
            dispatch(updateState({users: res.data.users}));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}


export const save = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))

    if (v.id){
        axios.put(API_PATH + "api/user/update", {...v, role: parseInt(v.role)}, CONFIG)
            .then(res => {
                if (res.status === 200){
                    if (res.data.users) {
                        dispatch(updateState({users: res.data.users, isOpen: false}));
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

        axios.post(API_PATH + "api/user/create", {...v, role: parseInt(v.role)}, CONFIG)
            .then(res => {
                if (res.status === 200){
                    dispatch(updateState({users: res.data.users, isOpen: false}));
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

export const deleteUser = () => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.delete(API_PATH + "api/user/delete?userId=" + getState().user.userId, CONFIG)
        .then(res => {
            if (res.status === 200){
                dispatch(updateState({users: res.data.users, isOpenDelete: false, userId: null}));
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

export const changePassword = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.put(API_PATH + "api/user/updatePassword?userId=" + getState().user.userId + "&password=" + v.password,{}, CONFIG)
        .then(res => {
            if (res.status === 200){
                dispatch(getUsers());
                dispatch(updateState({ isOpenPassword: false, userId: null}));
                toast.success("Изменено")
            }
        })
        .catch(err => {
            toast.error("Ошибка!")
        })
        .finally(() => {
            dispatch(updateState({isLoading: false}))
        })
}
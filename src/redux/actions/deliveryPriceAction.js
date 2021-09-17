import {UPDATESTATE} from "../types/deliveryPriceType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getPrices = () => (dispatch) => {
    axios.get(API_PATH + "api/deliveryPrices", CONFIG)
        .then(res => {
            console.log(res);
            dispatch(updateState({prices: res.data.deliveryPrices}));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}


export const save = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))

    if (v.id){
        axios.put(API_PATH + "api/deliveryPrice/update", v, CONFIG)
            .then(res => {
                if (res.status === 200){
                    if (res.data.deliveryPrices) {
                        dispatch(updateState({prices: res.data.deliveryPrices, isOpen: false, selectedPrice: null}));
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

        axios.post(API_PATH + "api/deliveryPrice/create", v, CONFIG)
            .then(res => {
                if (res.status === 200){
                    dispatch(updateState({prices: res.data.deliveryPrices, isOpen: false}));
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

export const deletePrice = () => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.delete(API_PATH + "api/deliveryPrice/delete?deliveryPriceId=" + getState().price.priceId, CONFIG)
        .then(res => {
            if (res.status === 200){
                dispatch(updateState({prices: res.data.deliveryPrices, isOpenDelete: false, priceId: null}));
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
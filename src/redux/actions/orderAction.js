import {UPDATESTATE} from "../types/orderType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getOrders = (page) => (dispatch) => {
    axios.get(API_PATH + "api/orders?pageNumber=" + (page + 1) , CONFIG)
        .then(res => {
            dispatch(updateState({
                orders: res.data.orders,
                page,
                totalPages: res.data.totalPages
            }));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}

export const changeStatus = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))

    axios.post(API_PATH + "api/order/changeStatus?orderId=" + getState().order.selectedOrderChange.id + "&status=" + v.status + "&courier=" + v.courier,{}, CONFIG)
        .then(res => {
            if (res.status === 200){
                if (res.data.code == 0){
                    dispatch(updateState({isOpenChange: false, selectedOrderChange: null}));
                    dispatch(getOrders(0));
                    toast.success("Изменено")
                } else if (res.data.code == -408){
                    toast.error(res.data.message)

                }

            }
        })
        .catch(err => {
            toast.error("Ошибка!")
        })
        .finally(() => {
            dispatch(updateState({isLoading: false}))
        })
}

export const getOrderInfo = (orderId) => (dispatch) => {
    axios.get(API_PATH + "api/order/info?orderId=" + orderId, CONFIG)
        .then(res => {
            dispatch(updateState({orderInfo: res.data}))
        })
}
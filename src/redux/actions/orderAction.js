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
    axios.get(API_PATH + "api/orders?pageNumber=" + page, CONFIG)
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

    axios.post(API_PATH + "api/order/changeStatus?orderId=" + getState().order.selectedOrderChange.id + "&status=" + v.status + "&courier=" + v.courier)
        .then(res => {
            if (res.status === 200){
                    dispatch(updateState({isOpenChange: false, selectedOrderChange: null}));
                    dispatch(getOrders(0));
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
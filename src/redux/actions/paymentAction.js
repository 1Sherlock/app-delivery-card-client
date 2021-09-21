import {UPDATESTATE} from "../types/paymentType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getPayments = (page) => (dispatch) => {
    axios.get(API_PATH + "api/payments?pageNumber=" + page, CONFIG)
        .then(res => {
            dispatch(updateState({
                payments: res.data.payments,
                page,
                totalPages: res.data.totalPages
            }));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}

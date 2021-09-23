

import {UPDATESTATE} from "../types/authType";
import axios from "axios";
import {API_PATH, REFRESH_TOKEN_NAME, TOKEN_NAME} from "../../tools/constants";
import {toast} from "react-toastify";


export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const login = (data, history) => (dispatch) => {
    axios.post(API_PATH + "token/auth", data)
        .then(res => {
            console.log(res);
            if (res.data.token){
                localStorage.setItem(TOKEN_NAME, "Bearer " + res.data.token);
                localStorage.setItem(REFRESH_TOKEN_NAME, res.data.refreshToken);

            }
        })
        .then(res => {
            window.location.href = "/admin/dashboard"
        })
        .catch((e) => {
            toast.error(e.response?.data);
        })
}

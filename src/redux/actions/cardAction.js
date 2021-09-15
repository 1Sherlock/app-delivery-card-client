import {UPDATESTATE} from "../types/cardType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";


export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getCards = () => (dispatch) => {
    axios.get(API_PATH + "reference/cards", CONFIG)
        .then(res => {
            console.log(res);
            dispatch(updateState({cards: res.data.cards}));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}

export const save = (e, v) => (dispatch, getState) => {
    axios.post(API_PATH + "api/card/create", {...v, photo: getState().card.file, type: parseInt(v.type)}, CONFIG)
        .then(res => {
            console.log(res);
            if (res.status === 200){
                dispatch(updateState({cards: res.data.cards, isOpen: false, file: null}));
                toast.success("Сохранено")
            }
        })
        .catch(err => {
            toast.error("Ошибка!");
        })
}
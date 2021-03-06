import {UPDATESTATE} from "../types/cardType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";
import {thead} from "../../variables/general";


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
    dispatch(updateState({isLoading: true}))

    if (v.id){
        axios.put(API_PATH + "api/card/update", {...v, photo: getState().card.file, type: parseInt(v.type)}, CONFIG)
            .then(res => {
                console.log(res);
                if (res.status === 200){
                    if (res.data.cards){
                        dispatch(updateState({cards: res.data.cards, isOpen: false, file: null}));
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
        axios.post(API_PATH + "api/card/create", {...v, photo: getState().card.file, type: parseInt(v.type)}, CONFIG)
            .then(res => {
                console.log(res);
                if (res.status === 200){
                    dispatch(updateState({cards: res.data.cards, isOpen: false, file: null}));
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

export const deleteCard = () => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.delete(API_PATH + "api/card/delete?cardId=" + getState().card.cardId, CONFIG)
        .then(res => {
            if (res.status === 200){
                dispatch(updateState({cards: res.data.cards, isOpenDelete: false, cardId: null}));
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
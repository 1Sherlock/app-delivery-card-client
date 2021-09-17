import {UPDATESTATE} from "../types/regionType";
import axios from "axios";
import {API_PATH, CONFIG} from "../../tools/constants";
import {toast} from "react-toastify";

export function updateState(state) {
    return {
        type: UPDATESTATE,
        payload: state
    }
}

export const getRegions = () => (dispatch) => {
    axios.get(API_PATH + "reference/regions", CONFIG)
        .then(res => {
            console.log(res);
            dispatch(updateState({regions: res.data.regions}));
        })
        .catch(e => {
            toast.error(e.response?.data);
        })
}


export const save = (e, v) => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))

    if (v.id){
        axios.put(API_PATH + "api/region/update", v, CONFIG)
            .then(res => {
                if (res.status === 200){
                    if (res.data.regions) {
                        dispatch(updateState({regions: res.data.regions, isOpen: false}));
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

      axios.post(API_PATH + "api/region/create", v, CONFIG)
          .then(res => {
              if (res.status === 200){
                  dispatch(updateState({regions: res.data.regions, isOpen: false}));
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

export const deleteRegion = () => (dispatch, getState) => {
    dispatch(updateState({isLoading: true}))
    axios.delete(API_PATH + "api/region/delete?regionId=" + getState().region.regionId, CONFIG)
        .then(res => {
            if (res.status === 200){
                dispatch(updateState({regions: res.data.regions, isOpenDelete: false, regionId: null}));
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
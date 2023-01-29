import {AppDispatch, BaseThunkType, RootState} from "../../bll/store";
import {fetching_API} from "../../bll/api";
import {setErrorAC, setItemsAC, setPerPageAC, setGettingDataAC, setTotalCountAC, setPageAC} from "./Actions";
import {Dispatch} from "redux";






//root loading of data from server
// export const firstAppLoadThunk: AppThunk = (dispatch, getState) => {
//     dispatch(setGettingDataAC(true))
//     if (getState().items.error){
//         dispatch(setErrorAC(null))
//     }
//     fetching_API.getData(5, 1)
//         .then(response => {
//             dispatch(setItemsAC(response.data))
//             dispatch(setTotalCountAC(response.total))
//             dispatch(setPerPageAC(5))
//         })
//         // errors handling for users
//         .catch(err => {
//             console.log(err)
//             dispatch(setErrorAC(err.message))
//         })
//         .finally( ()=>  dispatch(setGettingDataAC(false)))
// }

/*export const initialStateFetchingTC2 = (per_page: number, page: number): AppThunk => async (dispatch, getState) => {
    dispatch(setGettingDataAC(true))
    if (getState().items.error) {
        dispatch(setErrorAC(null))
    }
    fetching_API.getData(per_page, page)
        .then(response => {
            dispatch(setItemsAC(response.data))
            dispatch(setTotalCountAC(response.total))
            dispatch(setPerPageAC(per_page))
            dispatch(setPageAC(page))
        })
        // errors handling for users
        .catch(err => {
            console.log(err)
            dispatch(setErrorAC(err.message))
        })
        .finally(() => dispatch(setGettingDataAC(false)))
}*/


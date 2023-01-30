import * as actions from "./Actions";
import {BaseThunkType} from "../../bll/store";
import {
    setErrorAC, setFilteredItemAC,
    setGettingDataAC,
    setItemsAC,
    setPerPageAC,
    setSearchFieldValueAC,
    setTotalCountAC
} from "./Actions";
import {fetching_API} from "../../bll/api";

type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;
type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type initialStateType = {
    page: number
    per_page: number
    total: number
    data: DataType[]
    pantone_value?: string
    searchFieldValue: string
    filter: number | null
    filteredItem: DataType | null
    modalOpen: boolean
    rowToModal: DataType | null
    error: null | string
    gettingData: boolean
}
export type DataType = {
    id: number
    name: string
    year: number
    color: string
}

const initialState = {
    page: 1,
    per_page: 5,
    searchFieldValue: '',
    data: [] as DataType[],
    total: 0,
    filter: null,
    filteredItem: null,
    modalOpen: false,
    rowToModal: null,
} as initialStateType

export const enum ACTION_TYPES {
    SET_TOTAL = 'SET_TOTAL',
    SET_PER_PAGE = 'SET_PER_PAGE',
    SET_ITEMS = 'SET_ITEMS',
    SET_PAGE = 'SET_PAGE',
    SET_SEARCH_FIELD_VALUE = 'SET_SEARCH_FIELD_VALUE',
    SET_FILTER = 'SET_FILTER',
    SET_FILTERED_ITEM = 'SET_FILTERED_ITEM',
    OPEN_MODAL = 'OPEN_MODAL',
    SET_ROW_TO_MODAL = 'SET_ROW_TO_MODAL',
    SET_ERROR = 'SET_ERROR',
    SET_GETTING_DATA = 'SET_GETTING_DATA',
}


export const itemsReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_TOTAL:
            return {...state, total: action.payload.total};
        case ACTION_TYPES.SET_PER_PAGE:
            return {...state, per_page: action.payload.per_page};
        case ACTION_TYPES.SET_ITEMS:
            return {...state, data: action.payload.data};
        case ACTION_TYPES.SET_PAGE:
            return {...state, page: action.payload.page};
        case ACTION_TYPES.SET_SEARCH_FIELD_VALUE:
            return {...state, searchFieldValue: action.payload.value};
        case ACTION_TYPES.SET_FILTER:
            return {...state, filter: action.payload.filter};
        case ACTION_TYPES.SET_FILTERED_ITEM:
            return {...state, filteredItem: action.payload.filteredItem};
        case ACTION_TYPES.OPEN_MODAL:
            return {...state, modalOpen: action.payload.open};
        case ACTION_TYPES.SET_ROW_TO_MODAL:
            return {...state, rowToModal: action.payload.modalRow};
        case ACTION_TYPES.SET_ERROR:
            return {...state, error: action.payload.error};
        case ACTION_TYPES.SET_GETTING_DATA:
            return {...state, gettingData: action.payload.rootLoading};
        default:
            return state
    }
}

type ThunkType = BaseThunkType<ActionTypes>
export const initialStateFetchingTC = (per_page: number, page: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setGettingDataAC(true))
        let data;
        try {
            data = await fetching_API.getData(per_page, page)
            dispatch(setItemsAC(data.data))
            dispatch(setTotalCountAC(data.total))
            dispatch(setPerPageAC(per_page))
            // error type???
        } catch (err: any) {
            console.log(err)
        } finally {
            dispatch(setGettingDataAC(false))
        }
    }
}

export const setFilteredItemTC = (value: string,): ThunkType => {
    //let it return Promise, to avoid special type declaration
    return async (dispatch, getState) => {
        const itemNotFound = {id: 999, name: 'We have not this item', year: 999, color: '#ba0a1f'}
        const valueToNumber = Number(value)
        let data;
        if (Number.isNaN(valueToNumber)) {
            // this condition allow print in input only integers
            dispatch(setErrorAC('Accept only integers'))
        } else if (value.trim() === '') {
            //to prevent an unnecessary request to the server
            dispatch(setSearchFieldValueAC(''))
            dispatch(setFilteredItemAC(null))
            //it isn't call re-rendering, need this check?
            if (getState().items.error) {
                dispatch(setErrorAC(null))
            }
            return
        } else {
            //if all conditions true we are making asynchronous request
            dispatch(setErrorAC(null))
            dispatch(setSearchFieldValueAC(value))
            dispatch(setGettingDataAC(true))
            try {
                data = await fetching_API.getCurrentItem(valueToNumber)
                dispatch(setFilteredItemAC(data.data))
            } catch (err) {
                dispatch(setFilteredItemAC(itemNotFound))
                console.log(err)
            } finally {
                dispatch(setGettingDataAC(false))
                dispatch(setErrorAC(null))
            }
        }

    }
}


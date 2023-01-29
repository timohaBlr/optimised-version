import {ACTION_TYPES, DataType} from "./items-reducer";

export const setTotalCountAC = (total: number) => {
    return {
        type: ACTION_TYPES.SET_TOTAL,
        payload: {
            total,
        },
    } as const
}
export const setPerPageAC = (per_page: number) => {
    return {
        type: ACTION_TYPES.SET_PER_PAGE,
        payload: {
            per_page,
        },
    } as const
}
export const setItemsAC = (data: DataType[]) => {
    return {
        type: ACTION_TYPES.SET_ITEMS,
        payload: {
            data,
        },
    } as const
}
export const setPageAC = (page: number) => {
    return {
        type: ACTION_TYPES.SET_PAGE,
        payload: {
            page,
        },
    } as const
}
export const setSearchFieldValueAC = (value: string) => {
    return {
        type: ACTION_TYPES.SET_SEARCH_FIELD_VALUE,
        payload: {
            value,
        },
    } as const
}
export const setFilterAC = (filter: number | null) => {
    return {
        type: ACTION_TYPES.SET_FILTER,
        payload: {
            filter,
        },
    } as const
}
export const setFilteredItemAC = (filteredItem: DataType | null) => {
    return {
        type: ACTION_TYPES.SET_FILTERED_ITEM,
        payload: {
            filteredItem,
        },
    } as const
}
export const openModalAC = (open: boolean) => {
    return {
        type: ACTION_TYPES.OPEN_MODAL,
        payload: {
            open,
        },
    } as const
}
export const setRowToModalAC = (modalRow: DataType) => {
    return {
        type: ACTION_TYPES.SET_ROW_TO_MODAL,
        payload: {
            modalRow,
        },
    } as const
}
export const setGettingDataAC = (rootLoading: boolean) => {
    return {
        type: ACTION_TYPES.SET_GETTING_DATA,
        payload: {
            rootLoading,
        },
    } as const
}
export const setErrorAC = (error: null | string) => {
    return {
        type: ACTION_TYPES.SET_ERROR,
        payload: {
            error,
        },
    } as const
}





/*
type SetGettingDataActionType = ReturnType<typeof setGettingDataAC>
type SetRowToModalActionType = ReturnType<typeof setRowToModalAC>
type SetTotalCountActionType = ReturnType<typeof setTotalCountAC>
type SetErrorActionType = ReturnType<typeof setErrorAC>
type SetItemsActionType = ReturnType<typeof setItemsAC>
type SetPerPageActionType = ReturnType<typeof setPerPageAC>
type SetPageActionType = ReturnType<typeof setPageAC>
type SetSearchFieldValueActionType = ReturnType<typeof setSearchFieldValueAC>
type SetFilterActionType = ReturnType<typeof setFilterAC>
type SetFilteredItemActionType = ReturnType<typeof setFilteredItemAC>
type OpenModalActionType = ReturnType<typeof openModalAC>

export type ActionType = SetTotalCountActionType | SetPerPageActionType | SetItemsActionType
    | SetPageActionType | SetSearchFieldValueActionType
    | SetFilterActionType | SetFilteredItemActionType | OpenModalActionType
    | SetRowToModalActionType | SetErrorActionType | SetGettingDataActionType*/

import {Action, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { itemsReducer} from "../redux/reducers/items-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    items: itemsReducer,
})
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = legacy_createStore(rootReducer, composedEnhancer)

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppRootStateType = ReturnType<typeof rootReducer>
export type BaseThunkType<A extends Action, ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    A
    >
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store // for debugging
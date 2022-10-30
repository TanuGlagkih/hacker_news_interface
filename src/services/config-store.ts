import { AsyncThunkAction, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import mainStore from "./main-store";

//export type TRootState = ReturnType<typeof rootReducer>;
export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch | any>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

const rootReducer = combineReducers({
    mainStore
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
});


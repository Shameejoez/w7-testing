import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { useDispatch } from "react-redux";
import { slazy } from "./slice";


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [slazy.reducerPath]: slazy.reducer
        
    },
    middleware: (getDefaultMiddleware) =>  
        getDefaultMiddleware().concat(api.middleware),
})
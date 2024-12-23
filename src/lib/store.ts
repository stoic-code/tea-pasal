import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'
import settingReucer from './features/settings/settingSlice'
import toastReducer from './features/cart/toastSlice'
import { emptySplitApi } from './emptySplitApi'
import PopLoginReducer from './features/cart/popupLogin'

// const persistedUserReducer = userReducer

// const rootReducer = combineReducers({
//     user: persistedUserReducer,
//     [emptySplitApi.reducerPath]: emptySplitApi.reducer
// })

// Create the saga middleware
// export const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];
// https://redux-saga.js.org/

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            cart: cartReducer,
            setting: settingReucer,
            loginModal: PopLoginReducer,
            toast: toastReducer,
            [emptySplitApi.reducerPath]: emptySplitApi.reducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(emptySplitApi.middleware)
    })
}

// export const store = makeStore()

// Infer the type of makeStore

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

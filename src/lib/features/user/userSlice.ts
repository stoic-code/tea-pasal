import { emptyApi } from '@/lib/emptySplitApi'
import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
    value: {
        data: User
        token?: string | null
        isPopulating: boolean
    }
}

const initialState: InitialState = {
    value: {
        data: null,
        token: null,
        isPopulating: true
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value.data = action.payload
            state.value.isPopulating = false
        },
        initializeUser: (state, action) => {
            state.value.data = action.payload
            state.value.isPopulating = false
        },
        logout: state => {
            state.value.data = null
            state.value.token = null
            localStorage.clear()

            // TODO: invalidate all tags.
            /* featuredProduct for wishlist-update */
            /* cart  */
            /* shippingAddress */
        },
        setToken: (state, action) => {
            state.value.token = action.payload
            // debugger
        },
        simulateUserLoaded: state => {
            state.value.isPopulating = false
        }
    }
})

export const { setUser, initializeUser, logout, setToken, simulateUserLoaded } = userSlice.actions

// export const logout = () => {
//     const { logout: logoutUser } = userSlice.actions
//     // store.dispatch(emptySplitApi.util.resetApiState()) // invalidate all query caches.
//     // store.dispatch(logoutUser())
//     notify('Logout Successfully!')
// }

export default userSlice.reducer

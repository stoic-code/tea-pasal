'use client'
import React, { ComponentType, ReactNode, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { withStoreProvider } from '@/app/StoreProvider'
// import { useUserInfoQuery } from '@/lib/features/api/auth/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, setToken, simulateUserLoaded } from '@/lib/features/user/userSlice'
import { fetchApiData } from '@/utils/fetchApiData'
import LoginPopup from '@/app/login/LoginPopup'
import CustomToast from './customToast/CustomToast'
// import { setRtkBaseToken } from '@/lib/rtkBaseQuery'

function Layout({ children }: { children: ReactNode }) {
    // const { data, isLoading, refetch, isSuccess } = useUserInfoQuery()

    const userStore = useSelector((store: ReduxStore) => store.user.value)
    const token = userStore.token
    const poplogin = useSelector((store: ReduxStore) => store.loginModal.value.isOpen)
    const showCustomToast = useSelector((store: ReduxStore) => store.toast.value.isOpen)

    const dispatch = useDispatch()

    useEffect(() => {
        let token: string | null | undefined
        try {
            token = localStorage.getItem('token')
            token = token ? JSON.parse(token) : null
        } catch (err) {
            console.log('err', err)
        }

        if (token) {
            // setRtkBaseToken(token)
            dispatch(setToken(token))
            // debugger
        } else {
            dispatch(simulateUserLoaded())
        }
    }, [])

    useEffect(() => {
        if (token) {
            fetchUser()
        }
        async function fetchUser() {
            let userResponse = await fetchApiData({
                url: '/auth/users/me/',
                configObject: {
                    headers: {
                        Authorization: 'token ' + token
                    }
                }
            })

            if (userResponse) {
                // alert()
                dispatch(initializeUser(userResponse as User))
            } else {
                dispatch(simulateUserLoaded())
            }
        }
    }, [token])

    // useEffect(() => {
    //     if (data && isSuccess) {
    //         dispatch(
    //             initializeUser({
    //                 ...(data as User[])[0]
    //             })
    //         )
    //     } else {
    //         dispatch(initializeUser(null))
    //     }
    // }, [isSuccess, data, isLoading])

    return (
        <>
            <Header />
            {children}
            <Footer />
            {poplogin && <LoginPopup />}
            {showCustomToast && <CustomToast />}
        </>
    )
}

export default withStoreProvider(Layout as ComponentType)

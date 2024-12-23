'use client'

import { fetchApiData } from '@/utils/fetchApiData'
// import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '@/lib/features/user/userSlice'
import notify from '@/utils/notify'

export default function ValidateGoogle() {
    const dispatch = useDispatch()
    useEffect(() => {
        async function googleoAuthFunc(endpoint: string) {
            const res = await fetchApiData({
                url: '',
                fixedUrl: `/auth/o/google-oauth2/?${endpoint}`,
                configObject: {
                    method: 'POST',
                    credentials: 'include' // to send cookies druing post request.
                }
            })
            if (res) {
                setToken(res.auth_token)
                notify('Login Successful')
                localStorage.setItem('token', JSON.stringify(res.auth_token))
                dispatch(setToken(res.auth_token || null))
            }
        }

        const endpoint = window.location.href.split('?')

        if (endpoint[1]) {
            googleoAuthFunc(endpoint[1])
        }
    }, [])

    return null
}

import { API_URL } from '@/constants/domains'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RootState } from './store'

export const rtkBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
        let reduxToken = (getState() as RootState).user.value.token

        let ltoken: string | null = localStorage.getItem('token')
        ltoken = ltoken ? JSON.parse(ltoken) : null

        let token = reduxToken || ltoken

        /* /login api if sent token:401 */
        if (token && endpoint != 'login') {
            headers.set('Authorization', `token ${token}`)
        }

        return headers
    }
})

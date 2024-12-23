import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const userApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        userInfo: builder.query<object, void>({
            query: () => {
                return {
                    url: `auth/users/`
                }
            },
            providesTags: [RTK_TAGS.USER_INFO]
        }),
        login: builder.mutation({
            query: formData => {
                return {
                    url: `auth/token/login/`,
                    method: 'POST',
                    body: formData
                }
            }
            // invalidatesTags: [RTK_TAGS.ALL_LOGIN] // all login is not in any queries, so keeping it here is meaning Less   asdf   asdfa asdfasdf  adsfads
            // invalidatesTags: Object.values(RTK_TAGS)  // but this will not work. since after login, the api gets called immediately while, the token in localstorage/redux is still null though
        }),

        signUp: builder.mutation({
            query: formData => {
                return {
                    url: `auth/users/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.USER_SIGNUP]
        }),
        activateUser: builder.mutation({
            query: formData => {
                return {
                    url: `auth/users/activation/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.ACTIVATE_USER]
        }),
        reActivateUser: builder.mutation({
            query: formData => {
                return {
                    url: `auth/users/resend_activation/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.REACTIVATE_USER]
        }),

        userDetail: builder.query<object, void>({
            query: () => ({
                url: 'auth/users/me/'
            }),
            providesTags: [RTK_TAGS.GET_USER_DETAIL]
        }),
        updateFullname: builder.mutation({
            query: formdata => {
                return {
                    url: 'auth/users/me/',
                    method: 'PUT',
                    body: formdata
                }
            },
            invalidatesTags: [RTK_TAGS.GET_USER_DETAIL]
        }),
        updateEmail: builder.mutation({
            query: formdata => {
                return {
                    url: 'auth/users/reset_email/',
                    method: 'POST',
                    body: formdata
                }
            }
        }),
        changePassword: builder.mutation({
            query: formData => {
                return {
                    url: 'auth/users/set_password/',
                    method: 'POST',
                    body: formData
                }
            }
        }),
        getrestToken: builder.mutation({
            query: formData => {
                return {
                    url: `auth/users/reset_password/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.GET_RESETTOKEN]
        }),
        restPassword: builder.mutation({
            query: formData => {
                return {
                    url: `auth/users/reset_password_confirm/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.FORGETPASSWORD]
        }),
        restEmail: builder.mutation({
            query: formData => {
                return {
                    url: `auth/users/reset_email_confirm/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.RESETEMAIL]
        }),
        logout: builder.mutation<object, void>({
            query: () => {
                return {
                    url: `auth/token/logout/`,
                    method: 'POST'
                }
            },
            invalidatesTags: Object.values(RTK_TAGS) // even if logout: 401, this will be called.
        })
    })
})

export const {
    useUserInfoQuery,
    useLoginMutation,
    useUserDetailQuery,
    useUpdateFullnameMutation,
    useUpdateEmailMutation,
    useChangePasswordMutation,
    useRestEmailMutation,
    useSignUpMutation,
    useRestPasswordMutation,
    useGetrestTokenMutation,
    useLogoutMutation,
    useActivateUserMutation,
    useReActivateUserMutation
} = userApi

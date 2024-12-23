import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'
import { appendSearchParams } from '@/utils/modifySearchParams'

export const shippingaddressApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        Shippingaddress: builder.query<object, void>({
            // query: ({ page = 1, size = PAGE_SIZE }) => {
            query: () => {
                return {
                    // url: `shipping-address/?page=${page}&size=${size}`,
                    url: `shipping-address/`
                }
            },
            providesTags: [RTK_TAGS.ALL_SHIPPING]
        }),
        getShippingPrice: builder.mutation({
            query: formData => ({
                url: appendSearchParams('pre/order/preview/', { currency_id: formData.currency_id }),
                method: 'POST',
                body: formData
            })
        }),
        getSingleShippingAddress: builder.query({
            query: ({ id }) => {
                console.log(id)
                return {
                    url: `shipping-address/${id}/`,
                    method: 'GET'
                }
            }
        }),

        storeShippingaddress: builder.mutation({
            query: formData => {
                return {
                    url: `shipping-address/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_SHIPPING]
        }),
        updateGymattendance: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `shipping-address/${id}/`,
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_SHIPPING]
        }),
        removeGymattendance: builder.mutation({
            query: id => {
                return {
                    url: `shipping-address/${id}/`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_SHIPPING]
        })
    })
})

export const {
    useShippingaddressQuery,
    useStoreShippingaddressMutation,
    useGetShippingPriceMutation,
    useGetSingleShippingAddressQuery,
    useRemoveGymattendanceMutation,
    useUpdateGymattendanceMutation
} = shippingaddressApi
// export const { useGymattendanceQuery, useStoreGymattendanceMutation, useUpdateGymattendanceMutation, useRemoveGymattendanceMutation } = AttendanceApi

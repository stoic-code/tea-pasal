import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'
import { appendSearchParams } from '@/utils/modifySearchParams'

export const Cart = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllCart: builder.query({
            query: query => {
                return {
                    url: appendSearchParams('cart/items/', { currency_id: query.currency_id })
                }
            },
            providesTags: [RTK_TAGS.GET_ALLCART]
        }),
        updateCart: builder.mutation({
            query: query => {
                return {
                    url: `cart/items/${query.id}/`,
                    method: 'PUT',
                    body: query.formdata
                }
            },
            invalidatesTags: [RTK_TAGS.GET_ALLCART]
        }),
        deleteCart: builder.mutation({
            query: query => {
                return {
                    url: `cart/items/${query.id}/`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [RTK_TAGS.GET_ALLCART]
        })
    })
})

export const { useGetAllCartQuery, useUpdateCartMutation, useDeleteCartMutation } = Cart

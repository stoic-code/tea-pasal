import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'
import { appendSearchParams } from '@/utils/modifySearchParams'

export const orderApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        orders: builder.query({
            query: query => {
                return {
                    url: appendSearchParams('orders/', query)
                }
            },
            providesTags: [RTK_TAGS.ALL_ORDERS]
        }),
        getPaymentMethods: builder.query({
            query: orderId => {
                return {
                    url: `orders/${orderId}/payment_methods/`
                }
            },
            providesTags: [RTK_TAGS.PAYMENT_METHODS]
        }),
        singleOrder: builder.query({
            query: query => {
                return {
                    url: appendSearchParams(`orders/${query.id}/`, query)
                }
            },
            providesTags: [RTK_TAGS.SINGLE_ORDER],
            keepUnusedDataFor: 1
        }),
        confirmOrder: builder.mutation({
            query: (formData: any) => {
                return {
                    url: `orders/${formData.orderId}/payment_verification/`,
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: [
                RTK_TAGS.ALL_ORDERS,
                RTK_TAGS.GET_ALLCART,
                RTK_TAGS.ALL_CART_ITEMS,
                RTK_TAGS.PAYMENT_METHODS
            ]
        }),

        storeOrders: builder.mutation({
            query: ({ currencyId, formData }) => {
                let url = appendSearchParams('orders/', { currency_id: currencyId })
                return {
                    url,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [
                RTK_TAGS.ALL_ORDERS,
                RTK_TAGS.GET_ALLCART,
                RTK_TAGS.ALL_CART_ITEMS,
                RTK_TAGS.PAYMENT_METHODS
            ]
        }),
        /* all products in a single order */
        cancealOrder: builder.mutation({
            query: id => {
                return {
                    url: `orders/${id}/`,
                    method: 'PUT',
                    body: {}
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_ORDERS, RTK_TAGS.SINGLE_ORDER, RTK_TAGS.PAYMENT_METHODS]
        }),
        cancealSingleProductOrder: builder.mutation({
            query: ({ orderId, productOrderId }) => {
                return {
                    url: `orders/${orderId}/items/${productOrderId}/`,
                    method: 'PUT',
                    body: {}
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_ORDERS, RTK_TAGS.SINGLE_ORDER, RTK_TAGS.PAYMENT_METHODS]
        })
    })
})

export const {
    useOrdersQuery,
    useSingleOrderQuery,
    useConfirmOrderMutation,
    useGetPaymentMethodsQuery,
    useStoreOrdersMutation,
    useCancealOrderMutation,
    useCancealSingleProductOrderMutation
} = orderApi

import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const cartApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        allCartItems: builder.query<[], void>({
            query: () => {
                return {
                    url: `cart/items/` // FIXME: this is repeated in another section tooo.. make one
                }
            },
            providesTags: [RTK_TAGS.ALL_CART_ITEMS]
        }),
        addCartItem: builder.mutation({
            query: formdata => {
                return {
                    url: 'cart/items/',
                    method: 'POST',
                    body: formdata
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_CART_ITEMS, RTK_TAGS.GET_ALLCART]
        })
    })
})

export const { useAllCartItemsQuery, useAddCartItemMutation } = cartApi

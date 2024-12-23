//useless coz there is already another rtk query to get the products of the cart

// import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

// export const CartApi = emptySplitApi.injectEndpoints({
//     endpoints: builder => ({
//         cartList: builder.query<[], void>({
//             query: query => ({
//                 url: 'cart/items/'
//             }),
//             providesTags: [RTK_TAGS.GET_CARTITEMS]
//         })
//     })
// })

// export const { useCartListQuery } = CartApi

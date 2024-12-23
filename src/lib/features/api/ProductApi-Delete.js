/* import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const ProductApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        reducerPath: 'ProductApi',
        getAllProduct: builder.query({
            query: () => {
                return {
                    url: `products/`,
                    method: 'GET',
                }
            },
            providesTags: [RTK_TAGS.GET_ALL_PRODUCT],
        }),

    })
})


export const { useGetAllProductQuery } = ProductApi

 */
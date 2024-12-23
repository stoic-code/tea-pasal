import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const relatedProductApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        relatedProduct: builder.query({
            query: query => {
                console.log(query)
                return {
                    url: `/products/?category_slug=${query.category_slug}&page_size=5`,
                    method: 'GET'
                }
            },
            providesTags: [RTK_TAGS.GET_RELATED_PRODUCTS] //here we defined a tag with name allproductreview
        })
    })
})

export const { useRelatedProductQuery } = relatedProductApi

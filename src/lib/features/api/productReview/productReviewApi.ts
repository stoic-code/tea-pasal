import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const productreviewApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        productDetail: builder.query({
            query: query => {
                return {
                    url: `/products/${query.params}/`,
                    method: 'GET'
                }
            }
            //here we defined a tag with name allproductreview
        }),

        getProductReview: builder.query({
            query: query => {
                return {
                    url: `/products/${query.product_slug}/reviews/`,
                    method: 'GET'
                }
            },
            providesTags: [RTK_TAGS.ALL_PRODUCT_REVIEW]
        }),
        deleteProductReview: builder.mutation({
            query: query => {
                return {
                    url: `/products/${query.product_slug}/reviews/${query.id}/`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_PRODUCT_REVIEW]
        }),
        editProductReview: builder.mutation({
            query: query => {
                return {
                    url: `/products/${query.product_slug}/reviews/${query.id}/`,
                    method: 'PUT'
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_PRODUCT_REVIEW]
        }),
        Productreview: builder.mutation({
            query: query => {
                return {
                    url: `/products/${query.product_slug}/reviews/`,
                    method: 'POST',
                    body: query.formdata
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_PRODUCT_REVIEW] //so basically when we post a review or we fire this mutation we wanna triggere the above get review also so for that we use provide tags
        }) //here we invalidate the data of that query with the name given in this tag so that it refetch or retriggers
    })
})

export const {
    useProductreviewMutation,
    useProductDetailQuery,

    useEditProductReviewMutation,
    useDeleteProductReviewMutation,
    useGetProductReviewQuery
} = productreviewApi

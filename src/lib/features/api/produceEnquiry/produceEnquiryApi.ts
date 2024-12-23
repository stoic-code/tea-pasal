import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const produceenquiryApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        Productenquiry: builder.mutation({
            query: formData => {
                return {
                    url: `enquiry/`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.ALL_PRODUCT_ENQUIRY]
        })
    })
})

export const { useProductenquiryMutation } = produceenquiryApi

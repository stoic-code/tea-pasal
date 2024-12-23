import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const contactApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        contact: builder.mutation({
            query: formData => {
                return {
                    url: 'contact-us/',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: [RTK_TAGS.POST_CONTACT]
        })
    })
})

export const { useContactMutation } = contactApi

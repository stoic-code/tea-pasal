import { RTK_TAGS, emptySplitApi } from '@/lib/emptySplitApi'

export const categoryApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        categories: builder.query<object, void>({
            query: () => {
                return {
                    url: `categories/`,
                    method: 'GET'
                }
            },
            providesTags: [RTK_TAGS.GET_ALL_CATEGORY]
        })
    })
})

export const { useCategoriesQuery } = categoryApi

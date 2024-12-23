import { emptySplitApi } from '@/lib/emptySplitApi'

export const currencyApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        currencies: builder.query<object, void>({
            query: () => {
                return {
                    url: `currencies/`
                }
            }
        })
    })
})

export const { useCurrenciesQuery } = currencyApi

import { API_URL } from '@/constants/domains'

/**
 *  funciton to make api call and return response directly.
 *
 * @param url : URL
 * @param configObject: object    eg:{headers,body}
 * @param nestedPath: eg detail.data    ___  when response:{detail:{data}}
 * @param defaultValue: any
 * @returns api response
 */

export async function fetchApiData({
    url,
    fixedUrl, // make url as it is.. donot replace // to /
    nestedPath,
    defaultValue,
    configObject
}: {
    url: string
    fixedUrl?: string
    nestedPath?: string
    defaultValue?: any
    configObject?: object
}) {
    let data: any = null
    let count = 0
    const retryTimes = 3

    let fetchUrl: URL = new URL(`${API_URL}${url}`.toString().replace(/\/\//g, '/'))
    if (fixedUrl) {
        fetchUrl = new URL(`${API_URL}${fixedUrl}`.toString())
    }

    async function makeApiCall() {
        const date = new Date()
        console.log(count + ' make api call -- ' + fetchUrl + '  ' + date.toLocaleTimeString())
        try {
            configObject = configObject || {}
            /* by default it will cache */
            // configObject = { ...configObject, next: { revalidate: 5 * 60 } }
            // configObject = { ...configObject, cache: 'no-store' } // cache-store will make page dynamic instead of static
            configObject = { ...configObject }
            const res = await fetch(fetchUrl, configObject)

            if (!res.ok) {
                console.log('error while making api call', res.status, res.statusText)
                throw new Error('custom error')
            }
            data = await res.json()

            if (nestedPath) {
                // eg: nestedPath = detail.data
                const keys = nestedPath.trim().split('.')
                keys.forEach(key => {
                    data = data?.[key]
                })
            }
        } catch (err) {
            console.log('error in making api', fetchUrl, err)
            count++
            if (count < retryTimes) {
                await makeApiCall()
            }
        }
    }

    await makeApiCall()
    return data || defaultValue
}

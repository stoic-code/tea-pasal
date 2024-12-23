import { STATUSCODES } from '@/constants/statusCodes'
import notify from './notify'
import { API_URL } from '@/constants/domains'
import { useSelector } from 'react-redux'

/* this is for browser api call  */
export default async function callApi(url: URL, data: object, method: string, cb?: () => void) {
    // const user = useSelector((store) => store.user?.value);

    try {
        const response = await fetch(url, {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Authorization: `token ${user.token}`,
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            notify('Operation successfull')
            if (cb) {
                cb()
            }
        } else {
            notify(`${STATUSCODES[response.status.toString() as keyof typeof STATUSCODES]}, Please try again`, 'error')
        }
    } catch (err) {
        notify('An error occured. Please try again later.', 'error')
    }
}

/**
 *  funciton to make api call and return response directly.
 *
 * @param url : URL
 * @param headers: object
 * @returns api response
 */

export async function fetchApiDataOld({
    url,
    nestedPath,
    defaultValue,
    headers
}: {
    url: string
    nestedPath?: string
    defaultValue?: any
    headers?: object
}) {
    let data: any = null
    let count = 0
    let retryTimes = 3

    let fetchUrl: URL = new URL(`${API_URL}${url}`)

    async function makeApiCall() {
        console.log('make api call -- ' + fetchUrl)
        try {
            let res = await fetch(fetchUrl, headers)
            if (!res.ok) {
                throw new Error('custom error')
            }
            data = await res.json()

            if (nestedPath) {
                // eg: nestedPath = detail.data
                let keys = nestedPath.trim().split('.')
                keys.forEach(key => {
                    data = data?.[key]
                })
            }
        } catch (err) {
            count++
            if (count < retryTimes) {
                await makeApiCall()
            }
        }
    }

    await makeApiCall()
    return data || defaultValue
}

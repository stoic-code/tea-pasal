import { SERVER_URL, API_URL } from '@/constants/domains'

export const makeFullUrl = (suffixUrl: string) => {
    const url = SERVER_URL + '/' + (suffixUrl || '')
    const temp = url.split('://')

    const resultUrl = temp[0] + '://' + temp[1].replace(/(?!https:\/\/)(\/{2,3})/g, '/')

    return resultUrl
}

export const makeFullApiUrl = (suffixUrl: string) => {
    const url = API_URL + '/' + (suffixUrl || '') + '/'

    // Use a regular expression to replace consecutive slashes with a single slash, excluding the ones after "https://"
    //   let resultUrl = url.replace(/(?!http:\/\/)(\/{2,3})/g, '/');
    const temp = url.split('://')

    const resultUrl = temp[0] + '://' + temp[1].replace(/(?!https:\/\/)(\/{2,3})/g, '/')

    return resultUrl
}

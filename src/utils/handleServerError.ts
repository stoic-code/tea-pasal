import notify from './notify'

export interface SetErrorFunction {
    (name: string, config: { type: string; message: string }): void
}

const handleServerError = (err: any, setError?: SetErrorFunction) => {
    // Parameter 'err' implicitly has an 'any' type.ts
    console.log(err)
    let status = err.originalStatus || err?.status

    let error_message =
        err?.data?.message ||
        err?.data?.msg ||
        (typeof err?.data?.error == 'string' ? err?.data?.error : '') ||
        (typeof err?.data?.data == 'string' ? err?.data?.data : '') ||
        (typeof err?.data?.detail === 'string' ? err?.data?.detail : '') ||
        (typeof err?.data?.details === 'string' ? err?.data?.details : '')
    let http_message = err.message
    switch (status) {
        case 400:
            http_message = 'Bad Request'
            break
        case 401:
            http_message = 'Unauthenticated'
            break
        case 403:
            http_message = 'Forbidden'
            break
        case 404:
            http_message = 'Resource Not Found'
            break
        case 500:
            http_message = 'Server Error'
            break
        case 503:
            http_message = 'Service Unavailable'
            break
        default:
            http_message = 'Something went wrong. Try Again'
            break
    }

    /* todo if the token is expired.... logout user automatically  => in redux store using middleware */

    notify(error_message || http_message, 'error')

    console.log(err)
    if (err.status == 400 && setError && (err?.data?.error || err?.data)) {
        try {
            let err_obj: object = err?.data?.error || err?.data

            if (err_obj instanceof Object && !Array.isArray(err_obj)) {
                let temp = Object.entries(err_obj)

                temp.forEach(el => {
                    console.log({ el })
                    setError(el[0], { type: 'manual', message: el[1][0] })
                })
            }
        } catch (err) {
            //
        }
    }
}

export default handleServerError

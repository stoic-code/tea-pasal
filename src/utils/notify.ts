import { Bounce, toast, Theme } from 'react-toastify'

const notify = (message?: string, status?: string) => {
    let themeType: Theme = 'colored'
    const config = {
        transition: Bounce,
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: themeType
    }

    if (!message) {
        message = 'operation successful'
    }

    toast.dismiss()

    switch (status) {
        case 'error':
            toast.error(message, config)
            break
        case 'warn':
            toast.warn(message, config)
            break
        default:
            toast.success(message, config)
            break
    }
}

export default notify

// "use client"

import { useRouter } from 'next/navigation'
import { ComponentType } from 'react'
import { useSelector } from 'react-redux'
import Spinner from './common/Spinner'

export default function withProtectedRoute(Component: ComponentType) {
    const App = () => {
        const userStore = useSelector((store: ReduxStore) => store.user.value)
        let isPopulating = userStore.isPopulating
        let user = userStore.data

        const router = useRouter()

        if (!isPopulating && !user) {
            router.push('/login')
        }

        /* wait for user to re-populate state... */

        return (
            <>
                <div>
                    {isPopulating && <Spinner />}
                    {!isPopulating && user && <Component />}
                </div>
            </>
        )
    }

    return App
}

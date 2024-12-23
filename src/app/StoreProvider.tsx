'use client'
import React, { useRef, ComponentType, ReactElement, useState, useEffect } from 'react'
import { Provider } from 'react-redux'

import { makeStore, AppStore } from '@/lib/store'

export function withStoreProvider(Component: ComponentType) {
    const App = ({ ...rest }) => {
        const storeRef = useRef<AppStore | null>(null)

        useEffect(() => {
            // const userString = localStorage.getItem("user");
            // let user = userString ? JSON.parse(userString) : null;

            // const counterString = localStorage.getItem("counter");
            // let counter = counterString ? JSON.parse(counterString) : 0;

            if (storeRef.current) {
                // storeRef.current.dispatch(initializeUser(user));
                // storeRef.current.dispatch(initializeCount(counter));
            }
        }, [])

        if (!storeRef.current) {
            console.log('inside setup')
            storeRef.current = makeStore()
        } else {
            console.log('alerady setup')
        }

        return (
            <Provider store={storeRef.current}>
                <Component {...rest} />
            </Provider>
        )
    }
    return App
}

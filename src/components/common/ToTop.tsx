'use client'

import { useEffect, useRef, useState } from 'react'

function ToTop() {
    const [showButton, setShowButton] = useState(false)
    // console.log(,window.scrollX)
    // console.log('window ko y scroll hai', window.scrollY)
    useEffect(() => {
        const handleScroll = () => {
            //set the limit
            const limit = 1000
            setShowButton(window.scrollY > limit)
        }
        //set a scroll listener on the window so that every time user scrolls it calls that hadnleScroll
        window.addEventListener('scroll', handleScroll)

        //NOTE: we have to cleanup also we have to stop listenning to the scroll wants the user has crossed the limit and btn has showed ;up
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <>
            <span
                id='scroll_to_top'
                className={` ${showButton ? 'block' : 'hidden'}   fixed bottom-5 right-5 z-[50000] flex h-[42px] w-[42px] cursor-pointer  select-none items-center justify-center rounded-full border border-white bg-primary transition-all hover:bg-primary-light `}
                onClick={() => handleScrollToTop()}
            >
                <svg
                    width='24'
                    height='24'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    className=''
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeMiterlimit='2'
                    viewBox='0 0 24 24'
                    strokeLinejoin='round'
                >
                    <path d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z' />
                </svg>
            </span>
        </>
    )
}

export default ToTop

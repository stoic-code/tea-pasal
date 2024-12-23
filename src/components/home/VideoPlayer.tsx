'use client'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'

export default function VideoPlayer() {
    const [videoOpen, setVideoOpen] = useState(false)

    useEffect(() => {
        let body = document.getElementById('body')
        if (videoOpen) {
            if (body) {
                body.style.overflow = 'hidden'
            }
        } else {
            if (body) {
                body.style.overflow = 'auto'
            }
        }

        return () => {
            if (body) {
                body.style.overflow = 'auto'
            }
        }
    }, [videoOpen])

    return (
        <div
            className=' flex h-[450px] items-center justify-center  bg-center bg-no-repeat object-cover  object-center md:h-[550px] xl:h-[700px] 2xl:h-[850px]'
            style={{
                backgroundImage: `url('https://ooty-theme.myshopify.com/cdn/shop/files/video-sec-bg_1.jpg?v=1620132835')`
                // TODO: remove all ooty-theme
            }}
        >
            <AiOutlinePlayCircle
                className={`inline-block h-[140px] w-[140px] cursor-pointer text-white transition-all hover:scale-[1.175] hover:text-primary
                  ${classNames({ hidden: videoOpen })}`}
                onClick={() => {
                    setVideoOpen(prev => !prev)
                }}
            />
            <div
                onClick={() => {
                    setVideoOpen(false)
                }}
                className={`fixed bottom-0 left-0 right-0 top-0 z-[500001] flex items-center justify-center bg-[rgba(0,0,0,0.8)] ${classNames({ hidden: !videoOpen })}`}
            >
                {videoOpen && (
                    <div className='relative'>
                        <iframe
                            className={`aspect-video w-[80vw]`}
                            src='https://www.youtube.com/embed/g8y7ALHjryY?si=CMM1Jux3C0XVjtaB&autoplay=1'
                            title='YouTube video player'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    )
}

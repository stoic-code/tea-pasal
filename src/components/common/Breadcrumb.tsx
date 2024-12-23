'use client'
import Link from 'next/link'

import React from 'react'

type BreadCrubmbLink = {
    title: string
    link: string
}
export default function Breadcrumb({ links, title }: { links?: BreadCrubmbLink[]; title?: string }) {
    const lastElement = links?.slice(-1)

    return (
        <>
            <div
                style={{
                    backgroundImage:
                        "url('https://ooty-theme.myshopify.com/cdn/shop/files/breadcrumb_bg_image_1.jpg?v=1620193526')"
                }}
                className='grid items-center justify-center bg-cover bg-center bg-no-repeat py-[75px] align-middle text-white'
            >
                <div className='grid items-center justify-center text-center align-middle'>
                    <p className='breadcrumb-header'>{lastElement ? lastElement[0].title : title}</p>
                    <p className='breadcrumb-title text-center'>
                        <Link href={'/'} className='cursor-pointer hover:underline'>
                            Home
                        </Link>
                        {links?.map((el, index) => {
                            el.title = el.title.replaceAll('-', ' ').toLowerCase()
                            return (
                                <span className='' key={index}>
                                    <span>&nbsp;/&nbsp;</span>
                                    {index == links.length - 1 ? (
                                        <span className='capitalize'>{el.title}</span>
                                    ) : (
                                        <Link className='capitalize hover:underline' href={`${el.link.toLowerCase()}`}>
                                            {el.title}
                                        </Link>
                                    )}
                                </span>
                            )
                        })}
                    </p>
                </div>
            </div>
        </>
    )
}

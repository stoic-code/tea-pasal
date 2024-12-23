'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

const NewsDetailSocials = () => {
    const [currentUrl, setCurrentUrl] = useState('')
    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])
    return (
        <div className='flex flex-row justify-center  gap-x-3 gap-y-3 text-2xl xl:flex-col xl:items-end xl:justify-start'>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}>
                <span className='inline-block cursor-pointer rounded border-[1px] border-[#999] p-[4px] hover:border-primary hover:text-primary'>
                    <FaFacebook className={''} />
                </span>
            </Link>

            <Link href={`https://twitter.com/intent/tweet?url=${currentUrl}`}>
                <span className='inline-block  cursor-pointer rounded border-[1px] border-[#999] p-[4px] hover:border-primary hover:text-primary'>
                    <FaXTwitter className={''} />
                </span>
            </Link>
            {/* <span className='inline-block  cursor-pointer rounded border-[1px] border-[#999] p-[4px]   hover:border-primary hover:text-primary'>
                <FaLinkedin className={''} />
            </span> */}
        </div>
    )
}

export default NewsDetailSocials

'use client'

import Link from 'next/link'
import { IoLogoFacebook, IoLogoInstagram } from 'react-icons/io'
import { CgFacebook } from 'react-icons/cg'
import { RiTwitterXFill } from 'react-icons/ri'
import { useEffect } from 'react'
export default function ProductShare() {
    let current_url = ''

    useEffect(() => {
        current_url = window.location.href
    }, [])

    return (
        <section className='justify-cente flex items-center gap-4 text-center text-lg font-bold'>
            <h3 className='header-2xs'>Share with us:</h3>
            <ul className='flex justify-center gap-3'>
                <li>
                    <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${current_url}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <CgFacebook className='text-[26px] transition-all duration-200 hover:scale-[1.2] hover:text-primary' />
                    </Link>
                </li>

                <li>
                    <Link href={`https://twitter.com/intent/tweet?url=${current_url}`} target='_blank' rel='noreferrer'>
                        <RiTwitterXFill className='text-[24px] transition-all duration-500 hover:scale-[1.2] hover:text-primary' />
                    </Link>
                </li>
            </ul>
        </section>
    )
}

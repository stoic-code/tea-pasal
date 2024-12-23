import Link from 'next/link'
import React from 'react'
import { SlCalender } from 'react-icons/sl'
import SingleBlog from './SingleBlog'

export default function Blogs({ blogs: latestBlogs }: { blogs: News[] }) {
    return (
        <section className='container py-[100px]'>
            <h2 className={`header md:[w-80%] leading-xl mx-auto mb-[50px] text-center xl:w-[60%] ${'playfair'}`}>
                Tea sorts presentation and products degustation
            </h2>
            <ul className='grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3 md:gap-7'>
                {latestBlogs?.map((el, index) => {
                    return <SingleBlog key={el.id} blog={el} />
                })}
            </ul>
        </section>
    )
}

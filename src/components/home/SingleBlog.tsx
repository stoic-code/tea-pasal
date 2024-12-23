import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SlCalender } from 'react-icons/sl'

export default function SingleBlog({ blog: el }: { blog: any }) {
    return (
        <li className=''>
            <div className='mb-[30px] flex  h-[120px] w-full items-center justify-center overflow-hidden border  sm:h-[144px] md:h-[168px] lg:h-[200px] xl:h-[240px]'>
                <Link href={`/news/${el.slug || el.id}`} className='inline-block h-full w-full'>
                    <div className='product-container h-full w-full '>
                        <Image
                            src={el.image}
                            alt={`${el.title}`}
                            className='h-full w-full object-cover'
                            height={500}
                            width={500}
                        />
                    </div>
                </Link>
            </div>

            <div className='sub-title mb-3'>
                <span>
                    <SlCalender className='-mt-1 inline-block ' />
                    &nbsp;{el.date}
                </span>
            </div>
            <h3 className={`sub-header mb-5 ${'playfair'} `}>{el.title}</h3>

            <div className='relative mb-3'>
                <div className='short-description invisible opacity-50 '>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                </div>
                {el.short_description && (
                    <div
                        className=' short-description absolute left-0 right-0 top-0  line-clamp-3  '
                        dangerouslySetInnerHTML={{ __html: el.short_description }}
                    />
                )}
            </div>

            <div className='flex justify-center md:justify-start'>
                <Link href={`/news/${el.slug || el.id}`} className='btn inline-block'>
                    Read More
                </Link>
            </div>
        </li>
    )
}

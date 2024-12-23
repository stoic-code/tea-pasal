import Image from 'next/image'
import React from 'react'
type Feature = {
    id: number
    icon: string
    title: string
    description: string
}

export default function Features({ features }: { features: Feature[] }) {
    return (
        <section className='bg-page-section-background-color'>
            <ul className='container  grid grid-cols-1 gap-7 py-12 sm:grid-cols-2 xl:grid-cols-4 '>
                {features?.map(el => {
                    return (
                        <li key={el.title} className='flex items-center gap-3'>
                            <Image
                                height={100}
                                width={100}
                                src={`${el.icon}`}
                                className='mx-auto] mb-5 h-[46px] w-[68px]'
                                alt={el.title}
                            />
                            <div>
                                <h2 className={`sub-section-header playfair mb-1`}>{el.title}</h2>
                                <p className='description'>{el.description}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

import { Schema } from 'inspector'
import React from 'react'
type Schema = {
    id: number
    icon: string
    title: string
    description: string
}
export default function Scheme({ schemas }: { schemas: Schema[] }) {
    return (
        <section className='container py-[80px] text-center'>
            <h2 className={`header mb-[50px] ${'playfair'}`}>01 - Year Trial, Free Returns</h2>
            <ul className='grid grid-cols-1 gap-7   sm:grid-cols-2 xl:grid-cols-4 xl:gap-8 '>
                {schemas.map((el, index) => {
                    return (
                        <li key={index}>
                            <img src={el.icon} alt='' className='mx-auto mb-5 h-[46px] w-[68px] object-contain' />
                            <h3 className={`header-base mb-[5px] ${'playfair'}`}>{el.title}</h3>
                            <p className='short-description'>{el.description}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

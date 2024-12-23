import Breadcrumb from '@/components/common/Breadcrumb'
import React from 'react'
import { IoIosPeople, IoIosTrophy } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FaGlobeAsia } from 'react-icons/fa'

export default function page() {
    const drinks = [
        {
            title: 'Dip Tea Bags',
            description: 'Fusce ullamcorper pulvi enim, ac elementum',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/serv-new-1_2048x.jpg?v=1620366524'
        },
        {
            title: 'Loose Leaf Tea',
            description: 'Aliquam quam diameter, ornare at luctus quis.',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/serv-new-1_2048x.jpg?v=1620366524'
        },
        {
            title: 'Tea Sachets',
            description: 'Phasellus imperdiet eget tellus in ullamcorper.',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/serv-new-1_2048x.jpg?v=1620366524'
        },
        {
            title: 'Tea Powder',
            description: 'Pellentesque habitant morbi tristique senectus.',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/serv-new-1_2048x.jpg?v=1620366524'
        }
    ]

    const successJourney = [
        {
            title: 'Customers',
            logo: <IoIosPeople />,
            amount: '50K',
            description: 'Fusce ullamcorper pulvi enim'
        },
        {
            title: 'Subscribers',
            logo: <MdEmail />,
            amount: '20K',
            description: 'Aliquam quam diameter ornare'
        },
        {
            title: 'Branch',
            logo: <FaGlobeAsia />,
            amount: '30K',
            description: 'Phasellus imperdiet eget tellus'
        },
        {
            title: 'Awards',
            logo: <IoIosTrophy />,
            amount: '8K',
            description: 'Pellentesque habitant morbi'
        }
    ]
    return (
        <>
            <Breadcrumb title='services' />

            <section className='container py-[100px] '>
                <h2 className='header md:[w-80%] mx-auto mb-[10px] text-center xl:w-[60%]'>Services We Provide</h2>
                <p className='mb-[50px]  line-clamp-4 text-center'>
                    Donec sed lorem dapibus posuere dui eget, molestie vivamus
                </p>
                <ul className='grid grid-cols-1 justify-center gap-3 text-center align-middle sm:grid-cols-2'>
                    {drinks.map((el, index) => {
                        return (
                            <li key={index}>
                                <div className='flex w-full justify-center'>
                                    <img src={el.image} alt={el.title} className='h-[700px] w-[500px] object-cover' />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section className='container py-[40px] '>
                <h2 className='header md:[w-80%] mx-auto mb-[10px] text-center xl:w-[60%]'>The Finest Tea Tradition</h2>
                <p className='mb-[50px]  line-clamp-4 text-center'>Quisque ut nisi at mi venenatis blandit.</p>
                <div className='grid grid-cols-1 items-center justify-center gap-3 text-center align-middle sm:grid-cols-3 '>
                    <div className='flex flex-col gap-4 text-left '>
                        <h2 className='header h-fit w-fit text-3xl'>Hot Drinks</h2>
                        <p className='line-clamp-none  '>
                            Sed vestibulum nulla elementum auctor tincidunt. Aliquam sit amet cursus mauris. Sed vitae
                            mattis ipsum. Vestibulum enim nulla, sollicitudin ac hendrerit nec, tempor quis nisl
                        </p>
                    </div>
                    <div>
                        <img
                            src='https://ooty-theme.myshopify.com/cdn/shop/files/serv-new-5_800x.jpg?v=1620368029'
                            alt='staticImage of women'
                            className='h-[300px] w-[400px] object-cover'
                        />
                    </div>
                    <ul className='ml-7 grid gap-4 text-left'>
                        {['TANDOOR TEA', 'COLD BREW TEA', 'MASALA CHAI', 'CLASSIC BLACK TEA'].map((data, index) => (
                            <>
                                <li key={index}>- {data}</li>
                            </>
                        ))}
                    </ul>
                </div>
            </section>

            <section className='container py-[100px] '>
                <h2 className='header md:[w-80%] mx-auto mb-[10px] text-center xl:w-[60%]'>Our Success Journey</h2>
                <p className='mb-[50px]  line-clamp-4 text-center'>
                    Fusce neque ligula, fringilla sed turpis sit amet.
                </p>
                <ul className='grid grid-cols-1 items-center justify-center gap-6 text-center align-middle sm:grid-cols-4 '>
                    {successJourney.map((el, index) => (
                        <li
                            key={index}
                            className='flex flex-col items-center justify-center gap-6 border border-primary p-6 '
                        >
                            <div className='grid w-fit rounded-full bg-primary p-4 text-3xl text-white'>{el.logo}</div>
                            <div className='header text-3xl'>{el.amount}</div>
                            <h3 className='header text-xl'>{el.title}</h3>
                            <p className='line-clamp-4'>{el.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

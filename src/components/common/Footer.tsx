import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from 'react-icons/fa'

export default function Footer() {
    let footerComponents = [
        {
            header: 'Privacy',
            childs: [
                { title: 'Search', link: '#' },
                { title: 'About', link: '#' },
                { title: 'News', link: '#' },
                { title: 'Contacts', link: '#' },
                { title: 'Wishlist', link: '#' }
            ]
        },
        {
            header: 'Information',
            childs: [
                { title: 'Shipping', link: '#' },
                { title: 'Delivery', link: '#' },
                { title: 'Returns', link: '#' },
                { title: 'Policy', link: '#' },
                { title: 'Wishlist', link: '#' }
            ]
        },
        {
            header: 'Links',
            childs: [
                { title: 'Features', link: '#' },
                { title: 'Chat', link: '#' },
                { title: 'Mail Support', link: '#' },
                { title: '24X7 Delivery', link: '#' },
                { title: 'Query', link: '#' }
            ]
        }
        // {
        //   header: "NewsLetter",
        //   childs: [
        //     { title: "Sign up to get exclusive offers & more. You can unsubscribe at any time"},
        //     { title: (<><button title='hello'/> Hi click me</>), link: "#" }
        //   ]
        // },
    ]
    let currentDate = new Date()
    let year = currentDate.getFullYear()
    return (
        <div className='bg-black-light text-white '>
            <div className='container grid justify-items-center gap-0 py-14 text-center md:grid-cols-7 md:justify-items-start md:gap-4 md:text-left'>
                <div className='grid justify-between gap-[50px] sm:grid-cols-3 md:col-span-4 md:w-full md:gap-4'>
                    {footerComponents.map(data => (
                        <>
                            <div className='' key={data.header}>
                                <h2 className='mb-[20px] break-words font-serif text-[22px] font-bold md:mb-[40px] '>
                                    {data.header}
                                </h2>
                                <ul className='text-[18px] leading-[27px]'>
                                    {data?.childs.map((child: any, index) => (
                                        <li key={index} className='mb-[10px]'>
                                            {' '}
                                            <h3>
                                                <Link
                                                    href={child.link}
                                                    className='transition-all duration-500 hover:text-primary '
                                                >
                                                    {child.title}
                                                </Link>
                                            </h3>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ))}
                </div>
                <div className='md:col-span-3'>
                    <p className='mb-[20px] mt-[50px] font-serif text-[22px] font-bold md:mb-[40px] md:mt-0'>Socials</p>
                    <ul className='text-[18px] leading-[27px]'>
                        {/* <li>Sign up to get exclusive offers & more. You can unsubscribe at any time</li>
                        <li className='my-[20px] flex flex-col gap-2 lg:flex-row'>
                            <input placeholder='Your Email Address' className='btn bg-white text-body hover:bg-white' />
                            <button className='btn'>Sign Up</button>
                        </li> */}
                        <li>
                            <ul className='mt-[30px] flex justify-center gap-[20px] md:justify-start lg:gap-[40px]'>
                                {[1, 2, 3, 4, 5].map((el, index) => {
                                    return (
                                        <li key={index}>
                                            <FaFacebookF />
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between  gap-3 bg-black  px-9 py-[9px]  text-[12px] md:flex-row'>
                <p>&copy; {year} MindRisers | Powered by MindRisers</p>
                <div className='flex h-5 items-center  gap-3 '>
                    <Image
                        src={'/assets/cards/esewa.png'}
                        height={500}
                        width={500}
                        alt='esewa logo'
                        className='object-fit h-full w-auto '
                    />
                    <Image
                        src={'/assets/cards/khalti.png'}
                        height={500}
                        width={500}
                        alt='khalti logo'
                        className='h-full w-auto object-contain'
                    />
                    <Image
                        src={'/assets/cards/visa.png'}
                        height={500}
                        width={500}
                        alt='visa logo'
                        className='object-fit h-full w-auto'
                    />
                    <Image
                        src={'/assets/cards/masterCard.png'}
                        height={500}
                        width={500}
                        alt='master card logo'
                        className='object-fit h-full w-auto'
                    />
                </div>
            </div>
        </div>
    )
}

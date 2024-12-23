import Breadcrumb from '@/components/common/Breadcrumb'
import React from 'react'
import { FaFacebookF, FaLeaf, FaTree, FaTrophy } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa6'
import { SiCoffeescript } from 'react-icons/si'
import { GiTeapot, GiCoffeeCup } from 'react-icons/gi'

export default function page() {
    const images = [
        {
            type: 'Leaf Harvesting',
            title: 'Automatic',
            description: 'Donec sed lorem dapibus, posuere dui eget, molestie. Vivamus aliquam gravida.',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        },
        {
            type: 'Plucking Tea',
            title: 'Manual',
            description: 'Curabitur vitae molestie urna. Duis accumsan neque ac orci maximus sollicitudin.',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        },
        {
            type: 'Processing Tea',
            title: 'Natural',
            description: 'Fusce ullamcorper pulvinar enim, ac elementum justo vulputate non pellentesque.',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        }
    ]

    const latestBlogs = [
        {
            title: 'Natural Leaves',
            description:
                'Quis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac. Fames ac turpis egestas integer eget aliquet imperdiet massa tincidunt',
            icon: <FaLeaf />
        },
        {
            title: 'Affordable Price',
            description:
                'Fusce feugiat sem dui, non accumsan elit ornare eu. Quisque posuere ac libero at efficitur. Integer tempor suscipit velit nec porttitor. Vestibulum velit arcu, interdum.',
            icon: <FaTag />
        },
        {
            title: 'Highly Fresh',
            description:
                'Etiam sit amet lacus et eros pellentesque congue in eu tellus. Fusce facilisis egestas dapibus. Duis volutpat est odio, ac nulla elementum vitae. Vestibulum tincidunt ipsum.',
            icon: <FaTree />
        },
        {
            title: 'Awardable Taste',
            description:
                'Nullam commodo et lectus in elementum. Fusce neque ligula, fringilla sed turpis sit amet, maximus consectetur arcu. Lorem ipsum dolor sit amet. consectetur adipiscing elit',
            icon: <FaTrophy />
        }
    ]

    const drinks = [
        {
            title: 'Dip Tea Bags',
            description: 'Fusce ullamcorper pulvi enim, ac elementum',
            icon: <SiCoffeescript />
        },
        {
            title: 'Loose Leaf Tea',
            description: 'Aliquam quam diameter, ornare at luctus quis.',
            icon: <FaLeaf />
        },
        {
            title: 'Tea Sachets',
            description: 'Phasellus imperdiet eget tellus in ullamcorper.',
            icon: <GiTeapot />
        },
        {
            title: 'Tea Powder',
            description: 'Pellentesque habitant morbi tristique senectus.',
            icon: <GiCoffeeCup />
        },
        {
            title: 'Tea Powder',
            description: 'Pellentesque habitant morbi tristique senectus.',
            icon: <FaTag />
        }
    ]

    const teams = [
        {
            name: 'Bill Burgess',
            role: 'AREA SALES MANAGER',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        },
        {
            name: 'Freda Casey',
            role: 'SALES OFFICER',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        },
        {
            name: 'Andy Harris',
            role: 'ASSISTANT MANAGER',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        },
        {
            name: 'Melvin Powell',
            role: 'PRODUCTION OFFICER',
            image: 'https://ooty-theme.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1597123661'
        }
    ]

    const brands = []
    let partners = [
        {
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/client-1_1.png?v=1620112708',
            url: 'https://www.google.com'
        },
        {
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/client-1_1.png?v=1620112708',
            url: 'https://www.google.com'
        },
        {
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/client-1_1.png?v=1620112708',
            url: 'https://www.google.com'
        },
        {
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/client-1_1.png?v=1620112708',
            url: 'https://www.google.com'
        },
        {
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/client-1_1.png?v=1620112708',
            url: 'https://www.google.com'
        },
        {
            image: 'https://ooty-theme.myshopify.com/cdn/shop/files/client-1_1.png?v=1620112708',
            url: 'https://www.google.com'
        }
    ]

    return (
        <>
            <Breadcrumb title='About' />
            <div className='container py-[100px] pb-[80px]'>
                <ul className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3'>
                    {images.map((el, index) => {
                        return (
                            <li key={index}>
                                <div className='group relative overflow-hidden'>
                                    <div className='h-[400px] transition duration-500 ease-in-out group-hover:scale-110 md:h-[500px]'>
                                        <img
                                            src={el.image}
                                            alt={el.title}
                                            className='mb-[30px] h-[500px]  max-w-full object-cover'
                                        />
                                    </div>
                                    <div
                                        className='absolute bottom-0 left-0 right-0 top-0 flex h-full scale-110 flex-col items-center justify-center bg-[rgba(0,0,0,0.7)]  
                    px-6 text-center text-white opacity-0  transition duration-500 group-hover:scale-100 group-hover:opacity-100'
                                    >
                                        <p className='serif mb-[10px] text-[16px] font-bold leading-[27px]'>
                                            {el.title}
                                        </p>
                                        <p
                                            className='sub-header after:content-[" "] relative mb-[20px] 
                    pb-[20px] text-white after:absolute after:bottom-0 after:left-0  after:right-0 after:mx-auto after:h-[2px] after:w-[40px] after:bg-primary  
                    '
                                        >
                                            {el.type}
                                        </p>
                                        <p className='short-description'>{el.description}</p>
                                    </div>
                                </div>
                                <div className='mb-3'></div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <section className='container py-[40px] pt-0'>
                <h2 className='header md:[w-80%] mx-auto mb-[50px] text-center xl:w-[60%]'>Our Best Qualities</h2>
                <ul className='grid grid-cols-1 gap-7 sm:grid-cols-2'>
                    {latestBlogs.map((el, index) => {
                        return (
                            <li key={index}>
                                <div className='flex gap-6'>
                                    <div className='h-fit bg-primary p-4 text-4xl text-white'>{el.icon}</div>

                                    <div>
                                        <h2 className='section-header mb-[15px]'>{el.title}</h2>
                                        <p className='short-description mb-5 line-clamp-4'>{el.description}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section className='container py-[40px] '>
                <h2 className='header md:[w-80%] mx-auto mb-[50px] text-center xl:w-[60%]'>Hot Drinks</h2>
                <ul className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                    {drinks.map((el, index) => {
                        return (
                            <li key={index}>
                                <div className='grid items-center justify-center gap-6 text-center align-middle'>
                                    <div className='flex w-full justify-center'>
                                        <div className='h-fit w-fit rounded-full bg-primary  p-14 text-6xl text-white'>
                                            {el.icon}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className='section-header mb-5 grid justify-center align-middle'>
                                            {el.title}
                                        </h2>
                                        <p className='mb-5 line-clamp-4 grid items-center justify-center align-middle'>
                                            {el.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section className='bg-primary'>
                <div className='container grid items-center justify-center gap-8 py-[80px] align-middle md:flex'>
                    <div className='grid gap-8'>
                        <h2 className='section-header text-4xl  text-black'>Join Us:</h2>
                        <h2 className='section-header  text-4xl text-white'>FROM THE TEA GARDEN TO YOUR CUP</h2>
                        <p className='text-white'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio! Lorem ipsum dolor sit
                            amet Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className='btn w-[2 h-fit cursor-pointer whitespace-nowrap bg-white text-center text-primary hover:bg-black hover:text-white'>
                        View Help Videos
                    </div>
                </div>
            </section>

            <section className='container py-[40px] '>
                <h2 className='header md:[w-80%] mx-auto mb-[50px] text-center xl:w-[60%]'>Our Team</h2>
                <ul className='grid grid-cols-1 justify-center gap-7 sm:grid-cols-4'>
                    {teams.map((el, index) => {
                        return (
                            <li key={index}>
                                <div className='  grid items-center justify-center gap-6 text-center align-middle'>
                                    <div className='group relative w-full overflow-hidden rounded-2xl'>
                                        <img
                                            src={`https://ooty-theme.myshopify.com/cdn/shop/files/tea-4_1_800x.jpg?v=1620200482`}
                                            alt='teams'
                                            className='aspect-square w-[245px] max-w-full
                    object-cover '
                                        />
                                        <div className=' hiden layer absolute bottom-0 left-0 top-0 w-1/2  -translate-x-full bg-primary-light-30  opacity-50 transition duration-500 group-hover:translate-x-0 '></div>
                                        <div className=' hiden layer absolute bottom-0 right-0 top-0 w-1/2 translate-x-full bg-primary-light-30 opacity-50 transition duration-500 group-hover:translate-x-0 '></div>
                                        <ul className='absolute bottom-4 left-0 right-0 flex justify-between gap-4 px-6'>
                                            {[1, 2, 3, 4].map(el => {
                                                return (
                                                    <>
                                                        <li
                                                            className='flex aspect-square flex-grow translate-y-full items-center justify-center rounded bg-black opacity-0 transition duration-500  group-hover:translate-y-0  group-hover:opacity-100'
                                                            // style={{
                                                            //   transitionProperty:"transform opacity"
                                                            // }}
                                                        >
                                                            <FaFacebookF className='text-white' />
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className='mt-[30px]'>
                                        <h2 className='sub-header mb-[10px] grid justify-center align-middle'>
                                            {el.name}
                                        </h2>
                                        <p className='line-clamp-4 grid items-center justify-center align-middle text-[14px] font-bold tracking-[3px] '>
                                            {el.role}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>

            {/* <section className='container pb-[100px] pt-[20px] '>
                <h2 className='header md:[w-80%] mx-auto mb-[50px] text-center xl:w-[60%]'>
                    Brands
                </h2>
                <ul className='grid grid-cols-2 justify-center sm:grid-cols-3 md:grid-cols-6'>
                    {partners.map((el, index) => {
                        return (
                            <li key={index}>
                                <img
                                    src={el.image}
                                    className='mx-auto'
                                />
                            </li>
                        )
                    })}
                </ul>
            </section> */}
        </>
    )
}

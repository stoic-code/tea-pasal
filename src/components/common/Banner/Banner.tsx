'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
// import Banner from "@/assets/images/banner.jpg"

// import Swiper JS
// import Swiper from 'swiper';
// // import Swiper styles
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// // import Swiper and modules styles
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <>
            <span
                onClick={onClick}
                // style={{ ...style }}
                className={` absolute right-4 top-[50%] z-10 flex  aspect-square h-[40px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full  bg-primary text-white opacity-40 hover:bg-primary-light hover:opacity-100 focus:opacity-100  md:opacity-100`}
            >
                <FaChevronRight className='inline' />
            </span>
        </>
    )
}
const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <>
            <span
                onClick={onClick}
                // style={{ ...style }}
                className={` absolute left-4 top-[50%] z-10 flex  aspect-square h-[40px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full  bg-primary text-white  opacity-40 hover:bg-primary-light hover:opacity-100 focus:opacity-100  md:opacity-100`}
            >
                <FaChevronLeft className='inline' />
            </span>
        </>
    )
}

/**
 * Home page carousel banners.
 * @returns
 *
 */
export default function Banner({ banners }: { banners: Banner[] }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    return (
        <>
            <section className=' '>
                <h2 className='hidden'>Banners</h2>
                <Slider {...settings}>
                    {banners?.map((el, index) => {
                        let position = 'items-center'

                        let positionNum = index % 3

                        switch (positionNum) {
                            case 0:
                                position = 'items-center text-center'
                                break
                            case 1:
                                position = 'items-left text-left'
                                break
                            default:
                                position = 'items-end text-right'

                                break
                        }

                        return (
                            <div key={el.id}>
                                <div
                                    style={{
                                        backgroundImage: `url(${el.image})`
                                    }}
                                    className={` flex h-[450px] w-full  cursor-grab bg-cover bg-center md:h-[550px] xl:h-[700px]  2xl:h-[850px] ${position} flex-col justify-center   `}
                                >
                                    <div className={`container text-white  `}>
                                        {el.sub_title && <p className='banner-subtitle'>{el.sub_title}</p>}
                                        <h3 className='banner-header  '>{el.title}</h3>
                                        <div></div>
                                        <p
                                            className={`banner-description my-[10px] max-w-[600px] ${positionNum == 0 ? 'mx-auto' : positionNum == 1 ? 'mr-auto' : 'ml-auto'} `}
                                        >
                                            {el.description}
                                        </p>
                                        {el.link && (
                                            <Link className='btn mt-[30px] inline-block' href={el.link}>
                                                Read More
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </section>
        </>
    )
}

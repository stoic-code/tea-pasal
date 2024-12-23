'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
export type Testimonail = {
    id: number
    profile: string
    full_name: string
    designation: string
    description: string
}

let commonClass = `cursor-pointer text-white absolute top-[50%] --translate-y-1/2   z-10   w-[50px] h-[50px] md:w-[100px] md:h-[100px] opacity-40 hover:opacity-100 
transition-opacity duration-300`

const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props

    return (
        <>
            <SlArrowRight
                onClick={onClick}
                className={`${commonClass} right-0 sm:-right-24 md:-right-0 lg:-right-24 `}
            />
        </>
    )
}

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props
    return (
        <>
            <SlArrowLeft onClick={onClick} className={`${commonClass}  left-0 sm:-left-24 md:-left-0 lg:-left-24 `} />
        </>
    )
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
}

export default function Testimonials({ testimonials }: { testimonials: Testimonail[] }) {
    return (
        <section
            style={{
                backgroundImage:
                    "url('https://ooty-theme.myshopify.com/cdn/shop/files/herbal-tea-bg_1.jpg?v=1620046568')"
            }}
            className='border--4 border-red-500- min-h-[450px] bg-cover bg-center py-[100px] text-white md:min-h-[550px] xl:min-h-[700px] 2xl:min-h-[850px]  '
        >
            <div className=''>
                <h2 className={`header text-center text-white ${'playfair'}`}>Testimonials</h2>
                <div className='mx-auto   max-w-full sm:w-[325px] md:w-[690px]'>
                    <Slider {...settings} className=''>
                        {testimonials?.map((el, index) => {
                            return (
                                <div className='cursor-grab px-4' key={index}>
                                    <div className='relative mt-[105px] max-w-[100%] rounded-lg bg-[#252c30] px-[30px] sm:w-[325px] md:w-[690px]'>
                                        <img
                                            src={el.profile}
                                            alt={el.full_name}
                                            className='absolute left-0 right-0 top-0 mx-auto aspect-square w-[100px] -translate-y-1/2 rounded-full object-cover'
                                        />
                                        <div className='pb-[50px] pt-[85px] text-center'>
                                            <p
                                                className='description-xl relative px-4 
                                            before:absolute before:-left-4 before:top-0 before:text-[50px]  before:leading-[20px] before:content-[open-quote]  
                                            after:absolute after:-right-4 after:top-0 after:text-[50px]  after:leading-[20px] after:content-[close-quote]  
                                            '
                                            >
                                                {el.description}
                                            </p>
                                            <div className='mx-auto my-6 h-[1px] w-[80%] bg-white'></div>
                                            <h3 className='sub-header text-center capitalize text-white'>
                                                {el.full_name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

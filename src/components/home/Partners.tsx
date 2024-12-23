'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// const maxDotsToShow = 3
const settings = {
    dots: false, // the package doesnot limit dots by default and doesnot provide an props for that. use swiper/react instead. ref:project-mr
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // dotsClass: "slick-dots custom-dots",
    // appendDots: (dots: any) => {
    //     console.log(dots)
    //     return <div
    //         style={{
    //             backgroundColor: "#ddd",
    //             borderRadius: "10px",
    //             padding: "10px"
    //         }}
    //     >
    //         <ul style={{ margin: "0px" }}> dots {dots} </ul>
    //     </div>
    // },
    // customPaging: (i: any) => { // .slick-active
    //     if( i<maxDotsToShow){
    //         return <div>{i < maxDotsToShow ? i + 1 : ''}</div>

    //     }
    //     return <div className="hidden"></div>
    //     return <button>{i < maxDotsToShow ? i + 1 : '...'}</button>
    //     return <div
    //         className="pt-3"
    //     >
    //         <div className="dot bg-[#ddd] rounded-full h-[10px] w-[10px]">
    //         </div>
    //         {/* {i + 1} */}
    //     </div>
    // },

    responsive: [
        {
            breakpoint: 1024, // below 1024  max width
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2
            }
        }
    ]
}

export default function Partners() {
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
            <section className='bg-page-section-background-color py-[30px]'>
                <ul className=' container'>
                    <Slider {...settings} className=''>
                        {partners.map((el, index) => {
                            return (
                                <li key={index} className='  px-2 md:px-3 lg:px-4'>
                                    <img src={el.image} alt={el.url} />
                                </li>
                            )
                        })}
                    </Slider>
                </ul>
            </section>
        </>
    )
}

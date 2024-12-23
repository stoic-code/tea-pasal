'use client'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import {
    AiOutlineHeart,
    AiOutlineClose,
    AiOutlineDown,
    AiOutlineLeft,
    AiOutlineMenu,
    AiOutlineRight,
    AiOutlineSearch
} from 'react-icons/ai'

import { BsBox2 } from 'react-icons/bs'
import { RxAvatar } from 'react-icons/rx'
import { MdFavoriteBorder } from 'react-icons/md'
import { SlLogout } from 'react-icons/sl'
import { FaRegUser } from 'react-icons/fa6'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import CartSidebar from './CartSidebar'
import { logout } from '@/lib/features/user/userSlice'
import { useCategoriesQuery } from '@/lib/features/api/product/categoryApi'
import { toggleCart } from '@/lib/features/cart/cartSlice'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLogoutMutation } from '@/lib/features/api/auth/userApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import HeaderSearchForm from './HeaderSearchForm'
import { setCurrency } from '@/lib/features/settings/settingSlice'
import { useCurrenciesQuery } from '@/lib/features/api/currency/currencyApi'
import { useAllCartItemsQuery } from '@/lib/features/api/cart/cartApi'
import Image from 'next/image'

interface Category {
    id: number
    slug: string
    name: string
    title?: string
    categories: Category[]
    menus?: Menu[]
}

interface SubMenu {
    title: string
    name?: string
    slug?: string
    url: string
    menus: Menu[]
    categories?: Category[]
}

export interface Menu {
    id?: number
    name?: string
    title?: string
    url?: string
    fullWidth?: boolean
    subMenus?: SubMenu[] | Category[]
    categories?: Category[]
}

export default function Header() {
    /* TODO: instead of using query here . can we make it Server component and make sub-client-components where states are required.  */
    const dispatch = useDispatch()

    const path = usePathname()

    // let searchTerm = ""

    const { data } = useCategoriesQuery()
    const categories: Category[] = data as Category[]

    const user = useSelector((store: ReduxStore) => store.user.value.data)
    const cartToggle = useSelector((store: ReduxStore) => store.cart.value.isOpen)
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const { data: currencies, isSuccess: isCurrenciesLoaded } = useCurrenciesQuery()

    useEffect(() => {
        if (isCurrenciesLoaded) {
            dispatch(setCurrency((currencies as Currency[])[0]))
        }
        /* TODO: set currency in local storage. */
    }, [isCurrenciesLoaded])

    const [logoutApi] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            /* to reset state */
            dispatch(logout())

            /* to invalidate all other previous tags. */
            await logoutApi().unwrap()
        } catch (err) {
            notify('Logged out')
            /* logoutApi weill throw Authentication credentials were not provided cause, we have already remove token  */
            // handleServerError(err)
        }
    }

    const [openedSubMenu, setOpenedSubMenu] = useState('') // FIXME: change to Number | null
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const handleSearchToggle = () => {
        setSearchOpen(!searchOpen)
    }

    const handleSearchCancel = () => {
        setSearchOpen(false)
        // setSearchQuery('')
    }

    // side add to card menu
    // const [isToggled, setIsToggled] = useState(false)
    const sidepageRef = useRef<HTMLDivElement | null>(null)

    // useEffect(() => {
    //     const handleClickOutside = (event: React.MouseEvent) => {
    //         if (
    //             sidepageRef.current &&
    //             !sidepageRef.current.contains(event.target as Node)
    //         ) {
    //             dispatch(toggleCart())
    //         }
    //     }

    //     window.addEventListener(
    //         'mousedown',
    //         handleClickOutside as unknown as EventListener
    //     ) // No overload matches this call.

    //     return () => {
    //         window.removeEventListener(
    //             'mousedown',
    //             handleClickOutside as unknown as EventListener
    //         )
    //     }
    // }, [])

    const handleToggle = () => {
        dispatch(toggleCart())
    }

    const profileLinks = [
        { icon: <RxAvatar />, title: 'Manage My Account', url: '/profile' },
        { icon: <BsBox2 />, title: 'My Order', url: '/orders' },
        { icon: <MdFavoriteBorder />, title: 'Wishlist', url: '/wishlist' }
    ]

    const navLinks: Menu[] = [
        { title: 'Home', url: '/' },

        {
            title: 'All Tea',
            url: '/collections',
            fullWidth: true,
            subMenus: categories
        },
        { title: 'News', url: '/news' },
        {
            title: 'Pages',
            url: '#',
            fullWidth: false,
            subMenus: [
                {
                    title: 'About',
                    url: '/about',
                    menus: []
                },
                {
                    title: 'Services',
                    url: '/services',
                    menus: []
                },
                {
                    title: 'Contact',
                    url: '/contact',
                    menus: []
                }
            ]
        }
    ]

    useEffect(() => {
        let body = document.getElementById('body')
        if (menuOpen) {
            if (body) {
                body.style.overflow = 'hidden'
            }
        } else {
            if (body) {
                body.style.overflow = 'auto'
            }
        }

        return () => {
            if (body) {
                body.style.overflow = 'auto'
            }
        }
    }, [menuOpen])

    useEffect(() => {
        setMenuOpen(false)
    }, [path])

    let { data: carts, refetch: refetchCartItems, isError } = useAllCartItemsQuery()
    let total = 0

    if (isError) {
        carts = []
    }
    if (carts) {
        total = carts.reduce((accu, currentItem: any) => {
            return accu + currentItem.quantity
        }, 0)
    }

    useEffect(() => {
        /* login - logout */
        refetchCartItems()
    }, [JSON.stringify(user)])

    return (
        <>
            <header className='container flex flex-wrap  items-center justify-end py-3 xl:justify-between'>
                <div className='flex flex-grow items-center gap-0 xl:flex-grow-0 '>
                    {/* <div className='max-h-100 h-20 w-4 bg-black'>this</div> */}
                    <Link className='flex items-center' href={'/'}>
                        <img className='h-12 object-cover' src={'/assets/images/logo.png'} alt='company logo' />
                        <p className='text-header-color] text-lg font-medium'>Himalayan Tea</p>
                    </Link>
                </div>
                <div
                    className='group flex cursor-pointer items-center xl:hidden '
                    onClick={() => {
                        setMenuOpen(prev => !prev)
                    }}
                >
                    <AiOutlineMenu className=' inline h-6 w-6 transition-all group-hover:scale-125 group-hover:text-primary sm:h-5 sm:w-5  ' />
                    &nbsp;&nbsp;
                    <span className='hidden group-hover:text-primary sm:inline'>Menu</span>
                </div>
                <ul
                    className={` fixed bottom-0 right-0 top-0 z-20 translate-x-full   bg-white  ${classNames({ 'transform-none': menuOpen })}  flex   w-full max-w-[260px]  flex-grow flex-col items-start transition-all xl:static xl:w-auto xl:max-w-full xl:transform-none   xl:flex-row  xl:justify-center   `}
                >
                    <li className=' top-0 z-30 flex w-full  justify-between border bg-white px-6  py-4 xl:hidden xl:border-none xl:py-0  '>
                        <button
                            type='button'
                            aria-label='text-for link'
                            className={classNames({
                                invisible: !openedSubMenu
                            })}
                            onClick={() => {
                                setOpenedSubMenu('')
                            }}
                        >
                            <AiOutlineLeft />
                        </button>
                        <button
                            type='button'
                            className=''
                            onClick={() => {
                                setMenuOpen(false)
                            }}
                            aria-label='text-for link'
                        >
                            <AiOutlineClose />
                        </button>
                    </li>

                    {navLinks?.map(el => {
                        // category.map(el => {
                        return (
                            <li
                                className='group  flex  w-full  items-center justify-between  border   px-6  py-4 text-header-color xl:block  xl:w-auto xl:justify-center  xl:border-none xl:py-0 '
                                key={el.title}
                                onClick={() => {
                                    if (el.subMenus && el.subMenus.length > 0) {
                                        // if (el.categories && el.categories.length > 0) {
                                        // menu open
                                        setOpenedSubMenu(`${el.title}`)
                                        // setOpenedSubMenu(el.name)
                                        // FIXMKE: by id
                                    } else {
                                        // router.push("/")
                                    }
                                }}
                            >
                                <Link href={el.url ? el.url : '/'} className='group-hover:text-primary'>
                                    {el.title}
                                </Link>
                                {/* <Link href={el.url} className='group-hover:text-primary'>{el.name}</Link> */}
                                {el.subMenus && el.subMenus.length > 0 && (
                                    // el.categories && (el.categories.length > 0)
                                    <>
                                        <button type='button' className='' aria-label='text'>
                                            <AiOutlineRight className='group-hover:text-primary xl:hidden' />
                                            <AiOutlineDown className='hidden scale-[60%] group-hover:text-primary xl:inline-block ' />
                                        </button>
                                        <ul
                                            className={classNames(
                                                `  w-full max-w-[260px] 
                                                ${openedSubMenu !== el.title ? 'translate-x-full xl:translate-x-0' : 'transform-none'}
                                                fixed
                                                right-0
                                                top-0  max-h-screen overflow-y-auto bg-white
                                                capitalize
                                                transition-all
                                                xl:container xl:left-0 xl:top-auto   xl:hidden  xl:w-[99999px] xl:rounded xl:border xl:p-4
                                                
                                                xl:group-hover:flex xl:group-hover:flex-col 
                                                
                                                `
                                            )}
                                        >
                                            <li>
                                                <ul
                                                    className={classNames(
                                                        `  w-full max-w-[260px] 
                                                ${openedSubMenu !== el.title ? 'translate-x-full xl:translate-x-0' : 'transform-none'}
                                                
                                                right-0
                                                top-0  
                                                bg-transparent
                                                capitalize     transition-all  xl:container xl:left-0 xl:top-auto xl:group-hover:flex `
                                                    )}
                                                >
                                                    <li className='flex w-full  justify-center border px-6  py-4 xl:hidden'>
                                                        <span
                                                            onClick={() => {
                                                                setOpenedSubMenu('') // FIXME:: why is this not working
                                                            }}
                                                        >
                                                            <AiOutlineLeft className='invisible' />
                                                        </span>
                                                    </li>
                                                    <li
                                                        className='flex w-full  border bg-[rgba(0,0,0,0.05)] px-6 py-2  xl:hidden  '
                                                        onClick={() => {
                                                            setOpenedSubMenu('')
                                                        }}
                                                        // >{el.name}</li>
                                                    >
                                                        {el.title}
                                                    </li>
                                                    {el?.subMenus?.slice(0, 4).map((menu, index) => {
                                                        return (
                                                            <>
                                                                <li
                                                                    className='borde w-full  px-6 py-4 xl:w-auto xl:flex-grow'
                                                                    key={index}
                                                                >
                                                                    <Link
                                                                        href={
                                                                            'url' in menu
                                                                                ? menu.url
                                                                                : `/collections/?category_slug=${menu.slug}`
                                                                        }
                                                                        aria-label='text-for link'
                                                                        className='mb-2 inline-block border-b border-border pb-3 font-serif font-bold text-header-color hover:text-primary  '
                                                                    >
                                                                        {' '}
                                                                        {menu.title ? menu.title : menu.name}
                                                                    </Link>
                                                                    <ul className=' '>
                                                                        {menu.categories &&
                                                                            menu.categories.slice(0, 4).map(el => {
                                                                                return (
                                                                                    <li
                                                                                        className='flex w-full py-1 hover:text-primary '
                                                                                        key={el.title || el.name}
                                                                                    >
                                                                                        <Link
                                                                                            href={`/collections/?category_slug=${el.slug}`}
                                                                                            aria-label='text-for link'
                                                                                        >
                                                                                            {el.title || el.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                )
                                                                            })}

                                                                        {/* this one is when there is more than 4 elements in a column */}
                                                                        {menu.categories &&
                                                                            menu.categories.length > 4 && (
                                                                                <Link
                                                                                    href={`/collections/${menu?.slug}`}
                                                                                    aria-label='text-for link'
                                                                                    className=' cursor-pointer text-sm text-primary hover:underline'
                                                                                >
                                                                                    View more
                                                                                </Link>
                                                                            )}
                                                                    </ul>
                                                                </li>
                                                            </>
                                                        )
                                                    })}
                                                    {/* this one is when there is more than 4 columns in a submenu */}
                                                </ul>
                                            </li>
                                            {el.subMenus.length > 4 && (
                                                <li className='w-full  border-t border-border  px-6 pt-4  text-center capitalize xl:w-auto xl:flex-grow'>
                                                    <Link
                                                        href={`/collections`}
                                                        className=' inline-block  font-serif font-bold text-header-color hover:text-primary  '
                                                        // className=' flex items-center text-center text-sm text-primary hover:underline'
                                                    >
                                                        View more
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ul>

                {/* this one is when there is more than 4 columns in a submenu */}
                {/* {categories?.length > 4 && (
                    <li className='borde w-full px-6  py-4 capitalize xl:w-auto xl:flex-grow'>
                        <Link
                            href={`/collections`}
                            className='mb-2 inline-block border-b border-border pb-3 font-serif font-bold text-header-color hover:text-primary  '
                            // className=' flex items-center text-center text-sm text-primary hover:underline'
                        >
                            View more
                        </Link>
                    </li>
                )} */}

                <ul className=' flex w-full items-center justify-center gap-3 p-3 sm:w-auto '>
                    <li className='flex items-center'>
                        <button onClick={handleSearchToggle} className='inline-block  ' aria-label='search'>
                            <AiOutlineSearch className=' h-5 w-5 text-body transition-all hover:scale-125 hover:text-primary ' />
                        </button>
                    </li>
                    <li className='flex items-center'>
                        <Link href={'/wishlist'} className='inline-block' aria-label='wishlist'>
                            {' '}
                            <AiOutlineHeart className='h-5 w-5 text-body  transition-all hover:scale-125 hover:text-primary' />
                        </Link>
                    </li>
                    <li className=' flex cursor-pointer items-center'>
                        <button
                            type='button'
                            className=' inlinbe-block relative cursor-pointer'
                            aria-label='shoping cart'
                            onClick={() => handleToggle()}
                        >
                            <AiOutlineShoppingCart className=' h-5 w-5 text-body  transition-all  hover:z-10 hover:scale-125 hover:text-primary' />
                            <span className='absolute -top-4 right-2 block  min-h-[18px] min-w-[18px]  translate-x-full rounded-full border-2 border-white bg-primary  text-sm  text-white transition-all'>
                                {total}
                            </span>
                        </button>
                    </li>

                    {isCurrenciesLoaded && (
                        <li className='group relative flex cursor-pointer items-center  '>
                            <p className='flex h-5 items-center text-body transition-all hover:scale-125 hover:text-primary'>
                                {currency && currency.icon && (
                                    <span className='h-5'>
                                        <Image
                                            src={currency.icon}
                                            alt='currency icon'
                                            width={200}
                                            height={200}
                                            className='relative left-[3px] top-[2px] h-[20px] w-[20px]'
                                        />
                                    </span>
                                )}

                                <span className='hidden h-5 sm:inline-block'>&nbsp;{currency?.code} </span>
                                <AiOutlineDown className=' inline-block scale-[60%] ' />
                            </p>
                            <div className='absolute bottom-0 z-20 hidden min-w-max translate-y-full  border bg-white p-3 group-hover:block'>
                                <div className='flex select-none flex-col gap-4'>
                                    <div>
                                        <p className='font-bold'>Choose Currency</p>
                                        <ul className=''>
                                            {(currencies as [])?.map((el: any) => {
                                                return (
                                                    <li key={el.id} className='flex gap-2'>
                                                        <input
                                                            id={el.code}
                                                            type='radio'
                                                            name='currency'
                                                            value={el.id}
                                                            onClick={() => dispatch(setCurrency(el))}
                                                            checked={currency?.id === el.id}
                                                        />
                                                        <label
                                                            htmlFor={el.code}
                                                            className='cursor-pointer hover:text-primary'
                                                        >
                                                            {el.country}
                                                        </label>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )}
                    {user ? (
                        <>
                            <li className='group relative flex cursor-pointer items-center '>
                                <div
                                    className='flex h-5 items-center text-body transition-all hover:scale-125 hover:text-primary '
                                    aria-label='text-for link'
                                >
                                    <FaRegUser className='h-4 w-4 ' title={user.email} />
                                    <AiOutlineDown className=' inline-block scale-[60%] ' />
                                    {/* <p className=''>{user.email}</p> */}
                                </div>
                                <div className='absolute bottom-0 right-0 z-20 hidden min-w-max translate-y-full  border bg-white p-3 group-hover:block'>
                                    <div className='flex flex-col gap-2'>
                                        <ul className='space-y-3'>
                                            {profileLinks.map((el: any, index) => {
                                                return (
                                                    <li key={index} className=' hover:text-primary'>
                                                        <Link className='flex items-center gap-x-3' href={el.url}>
                                                            {el.icon}
                                                            {el.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                            <li>
                                                <span
                                                    className='flex
                                                    cursor-pointer
                                                    items-center 
                                                    gap-x-3 capitalize  transition-all
                                                    hover:text-primary'
                                                    onClick={handleLogout}
                                                >
                                                    <SlLogout /> logout
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* <li>
                                <Link
                                    className='inline-block capitalize  transition-all  hover:text-primary'
                                    href={'/login'}
                                >
                                    <FaRegUser className='h-4 w-4 ' />
                                </Link>
                                &nbsp;
                            </li> */}
                            <li className='flex items-center'>
                                <Link href={'/login'} className='inline-block' aria-label='login'>
                                    {' '}
                                    <FaRegUser className='h-4 w-4 text-body  transition-all hover:scale-125 hover:text-primary' />
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                <CartSidebar handleClose={handleToggle} sidepageRef={sidepageRef} />

                {searchOpen && (
                    <>
                        <div className='fixed left-0 right-0 top-0 z-[51] w-full  bg-white p-3'>
                            <div className='flex lg:px-40 '>
                                <HeaderSearchForm setSearchOpen={setSearchOpen} />
                                &nbsp;
                                <button
                                    title='close search bar'
                                    onClick={() => handleSearchCancel()}
                                    aria-label='cross'
                                >
                                    <AiOutlineClose className='h-5 w-5 text-body transition-all hover:scale-125 hover:text-primary' />
                                </button>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setSearchOpen(false)
                            }}
                            className='fixed inset-0 z-50 block h-screen w-full  bg-gray-600 bg-opacity-75 transition-opacity  '
                        ></div>
                    </>
                )}
                {menuOpen && (
                    <div
                        onClick={() => {
                            setMenuOpen(false)
                            setOpenedSubMenu('')
                        }}
                        className='fixed bottom-0 left-0 right-0 top-0 z-10 h-screen w-full cursor-pointer bg-black opacity-50'
                    ></div>
                )}
            </header>
        </>
    )
}

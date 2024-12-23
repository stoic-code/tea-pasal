'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import notify from '@/utils/notify'
import handleServerError, { SetErrorFunction } from '@/utils/handleServerError'
import { useLoginMutation } from '@/lib/features/api/auth/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '@/lib/features/user/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { toggleLogin } from '@/lib/features/cart/popupLogin'
import { useEffect } from 'react'

type Fomfield = {
    email: string
    password: string
}

export default function LoginPopup() {
    const router = useRouter()

    const [login, { isLoading }] = useLoginMutation()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<Fomfield>({
        mode: 'all',
        defaultValues: {
            email: 'buyer123@gmail.com',
            password: 'password123@'
        }
    })

    const dispatch = useDispatch()

    const onSubmit = async (data: object) => {
        try {
            const res = await login(data).unwrap()
            dispatch(setToken(res.auth_token))
            localStorage.setItem('token', JSON.stringify(res.auth_token))
            dispatch(toggleLogin())
            notify()
            router.push('/')
        } catch (err) {
            let msg = `${(err as any)?.data?.errors[0]}`.toLowerCase()
            notify(msg, 'error')
            if (msg.includes('act')) {
                router.push('/activate')
            }
        }
    }
    const isActive = useSelector((store: ReduxStore) => store.loginModal.value.isOpen)

    useEffect(() => {
        let body = document?.getElementById('body')
        if (isActive) {
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
    }, [isActive])

    return (
        <div
            className='fixed left-0 top-0  z-50 h-full w-full bg-gray-600 bg-opacity-60 '
            onClick={e => {
                dispatch(toggleLogin())
            }}
        >
            <section className='  h-full dark:bg-gray-900 '>
                <div className='mx-auto  flex h-full flex-col items-center justify-center   px-6 py-8 lg:py-0'>
                    <div
                        onClick={e => e.stopPropagation()}
                        className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'
                    >
                        <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
                            <h1 className='text-center text-xl  font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
                                Sign in to your account
                            </h1>
                            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className=' required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        className='form-control'
                                        placeholder='email'
                                        {...register('email', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                    {errors.email && <small className='text-red-600'>{errors.email.message}</small>}
                                </div>
                                <div>
                                    <label
                                        htmlFor='password'
                                        className='required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        id='password'
                                        placeholder='••••••••'
                                        className='form-control'
                                        {...register('password', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                    {errors.password && (
                                        <small className='text-red-600'>{errors.password.message}</small>
                                    )}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-start'></div>
                                    <Link
                                        href='/forget-password'
                                        className='text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline'
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button disabled={isLoading} className='btn w-full  rounded-lg'>
                                    {isLoading ? 'Loading..' : 'Sign In'}
                                </button>
                                <div className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                    Don’t have an account yet?{' '}
                                    <Link
                                        href='/signup'
                                        className='text-primary-600 dark:text-primary-500 font-medium hover:text-primary hover:underline'
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

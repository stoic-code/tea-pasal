'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import notify from '@/utils/notify'
import handleServerError, { SetErrorFunction } from '@/utils/handleServerError'
import { useLoginMutation } from '@/lib/features/api/auth/userApi'
import { useDispatch } from 'react-redux'
import { setToken } from '@/lib/features/user/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { RxEyeOpen } from 'react-icons/rx'
import { RxEyeClosed } from 'react-icons/rx'
import { fetchApiData } from '@/utils/fetchApiData'
import { FcGoogle } from 'react-icons/fc'
type Fomfield = {
    email: string
    password: string
}
export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const [login, { isLoading }] = useLoginMutation()

    const [oAuthUrl, setOAuthUrl] = useState({
        facebook: '',
        google: ''
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

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

    useEffect(() => {
        async function fetchOathUrls() {
            const baseUrl =
                window.location.protocol +
                '//' +
                window.location.hostname +
                (window.location.port ? ':' + window.location.port : '')

            let googleUrl = await fetchApiData({
                url: '',
                fixedUrl: '/auth/o/google-oauth2/?redirect_uri=' + baseUrl,
                nestedPath: 'authorization_url',
                configObject: {
                    credentials: 'include'
                }
            })

            let facebookUrl = await fetchApiData({
                url: '',
                fixedUrl: '/auth/o/facebook/?redirect_uri=' + baseUrl,
                nestedPath: 'authorization_url',
                configObject: {
                    credentials: 'include'
                }
            })

            // debugger
            setOAuthUrl(prev => ({
                facebook: facebookUrl,
                google: googleUrl
            }))
        }

        fetchOathUrls()
    }, [])

    return (
        <div>
            <section className='bg-gray-50 py-[40px] dark:bg-gray-900 sm:py-[48px] md:py-[56px] lg:py-[64px] xl:py-[80px] 2xl:py-[100px]'>
                <div className='mx-auto  flex flex-col items-center justify-center px-6  py-8 lg:py-0'>
                    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
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
                                    <div className='relative flex justify-between '>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id='password'
                                            placeholder='••••••••'
                                            className='form-control w-full'
                                            {...register('password', {
                                                required: {
                                                    message: 'required field',
                                                    value: true
                                                }
                                            })}
                                        />

                                        <button
                                            type='button'
                                            className='absolute right-3 top-1/2 -translate-y-1/2'
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
                                        </button>
                                    </div>
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
                                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>Or, sign in with</p>
                                <div className='flex justify-start'>
                                    <a
                                        className=' flex h-14 w-56 cursor-pointer items-center justify-center gap-3 rounded-full 
                                         border'
                                        href={oAuthUrl.google}
                                    >
                                        <FcGoogle size={30} />
                                        Sign up with google
                                    </a>
                                    {/* <a className='border p-1' href={oAuthUrl.facebook}>
                                        facebook
                                    </a> */}
                                </div>

                                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                    Don’t have an account yet?{' '}
                                    <Link
                                        href='/signup'
                                        className='text-primary-600 dark:text-primary-500 font-medium hover:text-primary hover:underline'
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

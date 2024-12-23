'use client'

import { useGetrestTokenMutation } from '@/lib/features/api/auth/userApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError // can we extract the type of this setError
    } = useForm()

    const [getrestToken, { isLoading }] = useGetrestTokenMutation()

    const submmit = async (data: object) => {
        try {
            await getrestToken(data).unwrap()
            notify('Please Check You Email')
        } catch (err) {
            handleServerError(err, setError)
        }
    }
    return (
        <>
            <div>
                <section className='bg-gray-50 p-10 dark:bg-gray-900'>
                    <div className='m-[10px] mx-auto flex flex-col items-center justify-center px-6  py-8 lg:py-0'>
                        <p className='mb-6 flex  items-center text-2xl font-semibold capitalize text-gray-900 dark:text-white'>
                            Forgot password?
                        </p>
                        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
                            <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
                                <div className='text-center text-xl  leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
                                    Enter your email address below and we’ll send you a link to reset your password
                                </div>
                                <div className='space-y-4 md:space-y-6'>
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
                                            className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                                            placeholder='email'
                                            {...register('email', {
                                                required: {
                                                    message: 'required field',
                                                    value: true
                                                }
                                            })}
                                        />

                                        {errors.email?.message && (
                                            <small className='text-red-600'>{`${errors.email.message}`}</small>
                                        )}
                                    </div>

                                    <div className='flex items-center'>
                                        <button
                                            disabled={isLoading}
                                            type='button'
                                            className='
                                            btn w-full rounded-lg'
                                            onClick={handleSubmit(submmit)}
                                        >
                                            {isLoading ? 'loading' : ' Continue'}
                                        </button>
                                    </div>
                                    <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                        <Link
                                            href='/login'
                                            className='text-primary-600 dark:text-primary-500 font-medium hover:text-primary hover:underline'
                                        >
                                            Go back
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Page

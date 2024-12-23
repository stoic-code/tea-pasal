'use client'
import { useRestPasswordMutation } from '@/lib/features/api/auth/userApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

function Page({ searchParams }: { searchParams: SearchParams }) {
    const router = useRouter()
    const {
        register,
        watch,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const [restPassword, { isLoading }] = useRestPasswordMutation()

    const submit = async (data: any) => {
        const payload = {
            ...searchParams,
            new_password: data.password
        }

        try {
            await restPassword(payload).unwrap()
            notify()
            router.push('/login')
        } catch (err) {
            handleServerError(err)
        }
    }

    return (
        <>
            <div>
                <section className='bg-gray-50 p-10 dark:bg-gray-900'>
                    <div className='m-[10px] mx-auto flex flex-col items-center justify-center px-6  py-8 lg:py-0'>
                        <Link
                            href='#'
                            className='mb-6 flex  items-center text-2xl font-semibold capitalize text-gray-900 dark:text-white'
                        >
                            Reset Password
                        </Link>
                        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
                            <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
                                <div className='text-center text-xl  leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'></div>
                                <div className='space-y-4 md:space-y-6'>
                                    <div>
                                        <label className=' mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                                            Please enter the new password
                                        </label>
                                        <input
                                            type='password'
                                            placeholder='new password'
                                            id='password'
                                            className='focus:ring-primary-600
                                             focus:border-primary-600 mb-2
                                              block w-full 
                                              rounded-lg border
                                               border-gray-300
                                                bg-gray-50 p-2.5
                                                 text-gray-900
                                                  dark:border-gray-600
                                                   dark:bg-gray-700 
                                                   dark:text-white
                                                    dark:placeholder-gray-400 
                                                    dark:focus:border-blue-500
                                                     dark:focus:ring-blue-500 
                                                     sm:text-sm'
                                            {...register('password', {
                                                required: {
                                                    message: 'required field',
                                                    value: true
                                                }
                                            })}
                                        />
                                        {errors.password?.message && (
                                            <small className='text-red-600'>{`${errors.password?.message}`}</small>
                                        )}
                                        <input
                                            type='password'
                                            className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                                            placeholder='confirm passwrod '
                                            {...register('re_password', {
                                                required: {
                                                    message: 'required field',
                                                    value: true
                                                },
                                                validate: value => {
                                                    return value === watch('password') || "Passwords don't match."
                                                }
                                            })}
                                        />

                                        {errors.re_password && (
                                            <small className='text-red-600'>{`${errors.re_password.message}`}</small>
                                        )}
                                    </div>

                                    <div className='flex items-center'>
                                        <button
                                            type='button'
                                            className='
                                            btn w-full rounded-lg'
                                            onClick={handleSubmit(submit)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Loading' : 'Submit'}
                                        </button>
                                    </div>
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

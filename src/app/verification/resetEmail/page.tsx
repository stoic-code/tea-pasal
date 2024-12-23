'use client'
import { useRestEmailMutation } from '@/lib/features/api/auth/userApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

function Page() {
    const {
        register,
        watch,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const [restEmail, { isLoading }] = useRestEmailMutation()
    const submit = async (data: object) => {
        console.log(data)
        try {
            const res = await restEmail(data).unwrap()
            notify('Operation sucess')
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
                            Reset Email
                        </Link>
                        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
                            <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
                                <div className='text-center text-xl  leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'></div>
                                <div className='space-y-4 md:space-y-6'>
                                    <div>
                                        <label className=' mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                                            Please enter the new email
                                        </label>
                                        <input
                                            type='email'
                                            placeholder='new email'
                                            id='email'
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
                                            {...register('new_email', {
                                                required: {
                                                    message: 'required field',
                                                    value: true
                                                }
                                            })}
                                        />
                                        {errors.new_email?.message && (
                                            <small className='text-red-600'>{`${errors.new_email.message}`}</small>
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
                                            {isLoading ? 'Loading' : 'Submmit'}
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

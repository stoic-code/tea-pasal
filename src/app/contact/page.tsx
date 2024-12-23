'use client'
import Breadcrumb from '@/components/common/Breadcrumb'
import React, { useRef, useState } from 'react'
// import { IoIosPeople, IoIosTrophy } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FaGlobeAsia, FaPhoneAlt } from 'react-icons/fa'
import { FaLocationArrow } from 'react-icons/fa6'
import Map from '@/components/common/Maps'
import { useForm, Controller } from 'react-hook-form'
import { useContactMutation } from '@/lib/features/api/contact/contactApi'
import notify from '@/utils/notify'
import handleServerError, { SetErrorFunction } from '@/utils/handleServerError'
import { IoMdInformationCircle } from 'react-icons/io'
import ReCAPTCHA from 'react-google-recaptcha'
export type Fomfield = {
    name: string
    email: string
    phone_number: string
    message: string
    'g-recaptcha-response': string
}

function Page() {
    const recaptchaRef = useRef(null)

    const [contact, { isLoading }] = useContactMutation()

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setError
    } = useForm<Fomfield>()

    const Submit = async (data: Fomfield) => {
        try {
            await contact(data).unwrap()
            notify()
            reset()
        } catch (err) {
            handleServerError(err, setError as SetErrorFunction)
        }
    }
    return (
        <>
            <Breadcrumb title='contact' />
            <section className='container py-[40px] pt-[100px] '>
                <ul className='grid grid-cols-1 items-center justify-start gap-6 text-left align-middle sm:grid-cols-3'>
                    <li className='flex flex-col gap-6 rounded border p-6 hover:border-primary '>
                        <div className='grid w-fit rounded-full bg-primary p-4 text-3xl text-white'>
                            <FaPhoneAlt />
                        </div>
                        <h3 className='header text-xl'>Phone</h3>
                        <p className='line-clamp-4'>
                            <span>Toll-Free:</span> 0803 - 080 - 3081 <span>Fax:</span> 0803 - 080 - 3082
                        </p>
                    </li>
                    <li className='flex flex-col gap-6 rounded border p-6 hover:border-primary '>
                        <div className='grid w-fit rounded-full bg-primary p-4 text-3xl text-white'>
                            <MdEmail />
                        </div>
                        <h3 className='header text-xl'>Email</h3>
                        <p className='line-clamp-4'>mail@example.com support@somemail.com</p>
                    </li>
                    <li className='flex flex-col gap-6 rounded border p-6 hover:border-primary '>
                        <div className='grid w-fit rounded-full bg-primary p-4 text-3xl text-white'>
                            <FaLocationArrow />
                        </div>
                        <h3 className='header text-xl'>Address</h3>
                        <p className='line-clamp-4'>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
                    </li>
                </ul>
            </section>

            <section className='container flex flex-col gap-6 py-[40px]  md:flex-row'>
                <Map />
                <div>
                    <h2 className='header  text-2xl '>Contact Form</h2>
                    <div className='mt-4 grid  gap-4 pb-[100px]'>
                        <div className='form-group'>
                            <label htmlFor='' className='form-label required-field'>
                                Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='name'
                                {...register('name', {
                                    required: {
                                        message: 'required field',
                                        value: true
                                    }
                                })}
                            />
                            {errors.name && <small className='text-red-600'>{errors.name.message}</small>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='' className='form-label required-field'>
                                Email
                            </label>
                            <input
                                type='email'
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
                        <div className='form-group'>
                            <div className='flex'>
                                <label htmlFor='' className='form-label required-field'>
                                    phone
                                </label>
                                <span className='group relative   inline-block cursor-pointer'>
                                    <span className='  text-xl text-primary'>
                                        <IoMdInformationCircle />
                                    </span>
                                    <div
                                        className={`absolute -top-16 hidden  w-[250px] rounded-md bg-slate-800  p-2 text-start text-gray-200 group-hover:block`}
                                    >
                                        <ul>
                                            <li>For Nepal +97798XXXXXXXX</li>
                                            <li>For Australia +61XXXXXXXX</li>
                                        </ul>
                                    </div>
                                </span>
                            </div>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='phone'
                                {...register('phone_number', {
                                    required: {
                                        message: 'required field',
                                        value: true
                                    }
                                })}
                            />
                            {errors.phone_number && (
                                <small className='text-red-600'>{errors.phone_number.message}</small>
                            )}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='' className='form-label required-field'>
                                message
                            </label>
                            <textarea
                                rows={8}
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                                placeholder='Your message...'
                                {...register('message', {
                                    required: {
                                        message: 'required field',
                                        value: true
                                    }
                                })}
                            ></textarea>
                            {errors.message && <small className='text-red-600'>{errors.message.message}</small>}
                        </div>

                        <div className='mt-3'>
                            <Controller
                                rules={{
                                    required: {
                                        message: 'required field',
                                        value: true
                                    }
                                }}
                                control={control}
                                name='g-recaptcha-response'
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <div className='flex flex-col items-start justify-start gap-2 sm:flex-row'>
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey='6LcN-ogpAAAAAB850rsE7mTc3oBzBmpziiITz7G3'
                                                onChange={(e: any) => {
                                                    onChange(e)
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    (recaptchaRef?.current as any)?.reset()
                                                }}
                                                className=' text-danger underline  hover:text-danger-light sm:self-center '
                                            >
                                                reset captch
                                            </button>
                                        </div>
                                    </>
                                )}
                            ></Controller>

                            {errors['g-recaptcha-response'] && (
                                <small className='text-red-600'>{errors['g-recaptcha-response'].message}</small>
                            )}
                        </div>

                        <button className='btn w-fit px-8' onClick={handleSubmit(Submit)} disabled={isLoading}>
                            Send
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Page

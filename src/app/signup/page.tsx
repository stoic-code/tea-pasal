'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import notify from '@/utils/notify'
import 'react-toastify/dist/ReactToastify.css'
import handleServerError, { SetErrorFunction } from '@/utils/handleServerError'
import { useSignUpMutation } from '@/lib/features/api/auth/userApi'
import { useRouter } from 'next/navigation'
import { IoMdInformationCircle } from 'react-icons/io'
import Select, { SingleValue } from 'react-select'

import { useEffect, useState, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import { IoIosEye } from 'react-icons/io'
import { IoIosEyeOff } from 'react-icons/io'

export type Fomfield = {
    first_name: string
    last_name: string
    contact: string
    email: string
    password: string
    re_password: string
}
export type Option = { value: string; label: string; image: string }

const countryOptions = [
    { value: '+977', label: 'Nepal(+977)', image: '/assets/images/flag-nepal.svg' },
    { value: '+61', label: 'Australia(+61)', image: '/assets/images/flag-australia.svg' }
]

let countryChangedOnce = false

export default function Signup() {
    const [signUp, { isLoading }] = useSignUpMutation()
    const [selectedCountry] = useState(countryOptions[0])
    const contactInputRef = useRef<HTMLInputElement>(null)

    /* for passwordss. */
    const [view, setView] = useState(false)
    const [confrimView, setConfirmView] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        setValue
    } = useForm<Fomfield>({
        defaultValues: {
            contact: `${selectedCountry.value} `
        }
    })

    const router = useRouter()

    const onSubmit = async (data: Fomfield) => {
        // let countryCode = data.contact.split(' ')[0].split('').slice(1).join('')
        // let contact = countryCode + data.contact.split(' ')[1]
        // data.contact = contact

        try {
            await signUp(data).unwrap()
            notify('Check email to activate your account')
            router.push('/login')
        } catch (err) {
            handleServerError(err, setError as SetErrorFunction)
        }
    }

    const CustomOption = ({ data, innerProps }: { data: any; innerProps: any }) => (
        <div
            {...innerProps}
            className='flex w-full cursor-pointer items-center justify-center  gap-2 hover:bg-primary hover:text-white'
        >
            <img src={data.image} alt={data.label} className='h-[40px] w-[40px] ' />
            {data.label}
        </div>
    )

    const CustomSingleValue = ({ data, innerProps }: { data: any; innerProps: any }) => (
        <div {...innerProps} className=' -mt-5 flex items-center  justify-center'>
            <img src={data.image} alt={data.label} className='object-fit h-[40px] w-[100px]' />
        </div>
    )

    const handleChange = (selectedOption: any) => {
        countryChangedOnce = true
        setValue('contact', selectedOption.value)

        if (countryChangedOnce) {
            document.getElementById('contact')?.focus()
        }
    }

    const viewpassword = () => {
        setView(!view)
    }
    const viewRePassword = () => {
        setConfirmView(!confrimView)
    }

    return (
        <div className='dark:bg-gray-900 '>
            <section className='flex justify-center bg-gray-50 '>
                <div className='my-20 w-1/2 rounded-lg bg-white p-5'>
                    <div className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
                        Register Now
                    </div>

                    <div className='mx-5 my-6 justify-between gap-4  md:flex'>
                        <div className='flex-1'>
                            <div className='mt-2'>
                                <label className=' required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                                    Your First Name
                                </label>
                                <input
                                    autoFocus
                                    type='text'
                                    id='first'
                                    className='form-control'
                                    placeholder='Your First Name'
                                    {...register('first_name', {
                                        required: {
                                            message: 'required field',
                                            value: true
                                        }
                                    })}
                                />
                                {errors.first_name && (
                                    <small className='text-red-600'>{errors.first_name.message}</small>
                                )}
                            </div>
                            <div className='mt-2'>
                                <label
                                    htmlFor='last'
                                    className='  required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Your Last Name
                                </label>
                                <input
                                    type='text'
                                    id='lastname'
                                    placeholder='Your Last Name'
                                    className='form-control'
                                    {...register('last_name', {
                                        required: {
                                            message: 'required field',
                                            value: true
                                        }
                                    })}
                                />
                                {errors.last_name && <small className='text-red-600'>{errors.last_name.message}</small>}
                            </div>
                            <div className='mt-2'>
                                <label className=' mb-2 flex text-sm font-medium text-gray-900 dark:text-white '>
                                    Your contact *
                                    <span className='group relative  ml-2 inline-block cursor-pointer'>
                                        <span className='  text-xl text-primary'>
                                            <IoMdInformationCircle />
                                        </span>
                                        <div
                                            className={`absolute -top-16 hidden  w-[250px] rounded-md bg-slate-800  p-2 text-start text-gray-200 group-hover:block`}
                                        >
                                            <ul>
                                                <li>For Nepal +977XXXXXXXX</li>
                                                <li>For Australia +61XXXXXXXX</li>
                                            </ul>
                                        </div>
                                    </span>
                                </label>

                                <div className='mt-2 flex gap-2 '>
                                    <Select
                                        options={countryOptions}
                                        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                        onChange={(e: SingleValue<Option>) => handleChange(e)}
                                        value={selectedCountry}
                                        styles={{
                                            menu: provided => ({
                                                ...provided,
                                                position: 'absolute',
                                                top: '-100px',
                                                left: '0px',
                                                zIndex: 9999,
                                                width: '200px'
                                            }),

                                            singleValue: provided => ({
                                                ...provided,
                                                padding: 0,
                                                margin: 0,
                                                lineHeight: 0
                                            }),
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderColor: state.isFocused ? 'green' : provided.borderColor,
                                                boxShadow: state.isFocused ? 'green' : provided.boxShadow,
                                                '&:hover': {
                                                    borderColor: state.isFocused ? 'green' : provided.borderColor
                                                }
                                            }),
                                            input: provided => ({
                                                ...provided,
                                                width: 0,

                                                display: 'hidden'
                                            })
                                        }}
                                        isSearchable={false}
                                    />

                                    <input
                                        // ref = {contactInputRef}
                                        id='contact'
                                        placeholder='Your Contact'
                                        className={`form-control`}
                                        {...register('contact', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </div>
                                {errors.contact && <small className='text-red-600'>{errors.contact.message}</small>}
                            </div>
                        </div>
                        <div className='flex-1 '>
                            <div className='mt-2'>
                                <label
                                    htmlFor='email'
                                    className=' required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white      '
                                >
                                    Your Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    className='form-control'
                                    placeholder='Email'
                                    {...register('email', {
                                        required: {
                                            message: 'required field',
                                            value: true
                                        }
                                    })}
                                />
                                {errors.email && <small className='text-red-600'>{errors.email.message}</small>}
                            </div>
                            <div className='mt-2'>
                                <label
                                    htmlFor='password'
                                    className='  required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Password
                                </label>
                                <div className='flex items-center justify-center '>
                                    <input
                                        type={view ? 'text' : 'password'}
                                        id='password'
                                        placeholder='Password'
                                        className='form-control'
                                        {...register('password', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                    {view ? (
                                        <button onClick={viewpassword}>
                                            {' '}
                                            <IoIosEye className='-ml-10 text-[21px]' />
                                        </button>
                                    ) : (
                                        <button onClick={viewpassword}>
                                            {' '}
                                            <IoIosEyeOff className='-ml-10 text-[21px]' />
                                        </button>
                                    )}
                                </div>

                                {errors.password && <small className='text-red-600'>{errors.password.message}</small>}
                            </div>

                            <div className='mt-2'>
                                <label
                                    htmlFor='password'
                                    className='  required-field mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Confirm Password
                                </label>
                                <div className='flex items-center justify-center'>
                                    <input
                                        type={confrimView ? 'text' : 'password'}
                                        id='re_password'
                                        placeholder='Confirm Password'
                                        className=' form-control'
                                        {...register('re_password', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            },
                                            validate: value => value === watch('password') || "Passwords don't match."
                                        })}
                                    />
                                    {confrimView ? (
                                        <button onClick={viewRePassword}>
                                            {' '}
                                            <IoIosEye className='-ml-10 text-[21px]' />
                                        </button>
                                    ) : (
                                        <button onClick={viewRePassword}>
                                            {' '}
                                            <IoIosEyeOff className='-ml-10 text-[21px]' />
                                        </button>
                                    )}
                                </div>
                                {errors.re_password && (
                                    <small className='text-red-600'>{errors.re_password.message}</small>
                                )}
                            </div>
                        </div>{' '}
                    </div>
                    <div className='container flex items-center' onClick={handleSubmit(onSubmit)}>
                        <button disabled={isLoading} className=' btn w-full rounded-lg'>
                            {isLoading ? 'Loading' : 'Sign Up'}
                        </button>
                    </div>
                    <p className='container mt-2 text-sm font-light text-gray-500 dark:text-gray-400'>
                        have an account?{' '}
                        <Link
                            href='/login'
                            className='text-primary-600 dark:text-primary-500 font-medium hover:text-primary hover:underline'
                        >
                            Login
                        </Link>
                    </p>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}

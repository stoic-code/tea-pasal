'use client'

import { useForm } from 'react-hook-form'
import { useUpdateEmailMutation } from '@/lib/features/api/auth/userApi'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa6'

interface fieldForm {
    current_password: string
    new_email: string
}

export default function EditEmail({ userInfo }: { userInfo: User }) {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const [updateEmail, { isSuccess }] = useUpdateEmailMutation()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    console.log(errors)
    console.log(userInfo)

    // useEffect(() => {
    //     if (userInfo) {
    //         reset(userInfo)
    //     }
    // }, [userInfo])

    async function onSubmit(data: any) {
        console.log('btn clicked')
        console.log(data)
        const res = await updateEmail({ email: data?.new_email }).unwrap()
        // console.log()
        console.log(res)
        reset()
    }
    return (
        <>
            <form className=' inline' onSubmit={handleSubmit(onSubmit)}>
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field text-sm  ' htmlFor='password'>
                        Current Password
                    </label>
                    <div className='relative flex justify-between '>
                        <input
                            {...register('current_password', {
                                required: '*Current password is required'
                            })}
                            className=' form-control-simple'
                            name='current_password'
                            type={showPassword ? 'text' : 'password'}
                        />

                        <button
                            type='button'
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                    {errors.current_password?.message && (
                        <small className=' form-error'>{`${errors?.current_password.message}`}</small>
                    )}
                </div>
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field text-sm  ' htmlFor='username'>
                        New Email Address
                    </label>

                    <input
                        {...register('new_email', {
                            required: '*email is required'
                        })}
                        className=' form-control-simple'
                        name='new_email'
                        type='email'
                    />
                    {errors.new_email?.message && (
                        <small className=' form-error'>{`${errors?.new_email.message}`}</small>
                    )}
                </div>
                <div>
                    <button type='submit' className=' mt-4 rounded-sm bg-primary-dark-10 px-8 py-2 text-xs text-white'>
                        SAVE CHANGES
                    </button>
                </div>
            </form>
        </>
    )
}

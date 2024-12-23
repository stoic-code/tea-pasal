'use client'

import { useForm } from 'react-hook-form'

import { useChangePasswordMutation } from '@/lib/features/api/auth/userApi'
import notify from '@/utils/notify'
import handleServerError from '@/utils/handleServerError'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa6'
import { useState } from 'react'

export default function EditPassword({ userInfo }: { userInfo: User }) {
    const [changePassword, { isSuccess, error }] = useChangePasswordMutation()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const [showPassword, setShowPassword] = useState({
        show_current_password: false,
        show_new_password: false,
        show_repeat_password: false
    })

    async function onSubmit(formdata: any) {
        try {
            await changePassword({
                current_password: formdata.current_password,
                new_password: formdata.new_password
            }).unwrap()

            notify('Password Changed Successfully')
            reset()
        } catch (err) {
            handleServerError(err) // TODO: handle Form validation too.
        }
    }
    return (
        <>
            <form className=' inline' action='#' onSubmit={handleSubmit(onSubmit)}>
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field  text-sm ' htmlFor='password'>
                        Current Password
                    </label>
                    <div className='relative'>
                        <input
                            {...register('current_password', {
                                required: '*Current password is required'
                            })}
                            className=' form-control-simple'
                            name='current_password'
                            // onChange={e => handleChange(e)}
                            type={showPassword.show_current_password ? 'text' : 'password'}
                            // value={editProfile?.email}
                        />
                        <button
                            type='button'
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                            onClick={e => {
                                e.preventDefault()

                                setShowPassword(prev => {
                                    return {
                                        ...prev,
                                        show_current_password: !prev.show_current_password
                                    }
                                })
                            }}
                        >
                            {showPassword.show_current_password ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                    {errors.current_password?.message && (
                        <small className=' form-error'>{`${errors?.current_password.message}`}</small>
                    )}
                </div>
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field text-sm  ' htmlFor='password'>
                        New Password
                    </label>
                    <div className='relative'>
                        <input
                            {...register('new_password', {
                                required: '*New password is required',
                                minLength: {
                                    value: 8,
                                    message: '*Password must be of 8 characters'
                                }
                            })}
                            className='form-control-simple'
                            name='new_password'
                            // onChange={e => handleChange(e)}
                            type={showPassword.show_new_password ? 'text' : 'password'} // value={editProfile?.email}
                        />
                        <button
                            type='button'
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                            onClick={e => {
                                e.preventDefault()

                                setShowPassword(prev => {
                                    return {
                                        ...prev,
                                        show_new_password: !prev.show_new_password
                                    }
                                })
                            }}
                        >
                            {showPassword.show_new_password ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                    {errors.new_password?.message && (
                        <small className=' form-error'>{`${errors?.new_password.message}`}</small>
                    )}
                </div>
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field text-sm  ' htmlFor='password'>
                        Repeat Password
                    </label>
                    <div className=' relative'>
                        <input
                            {...register('repeat_password', {
                                required: '*Repeat password is required',
                                validate: value => {
                                    return value === watch('new_password') || "*Password doesn't match"
                                },
                                minLength: {
                                    value: 8,
                                    message: '*Password must  be of 8 characters'
                                }
                            })}
                            className=' form-control-simple'
                            name='repeat_password'
                            // onChange={e => handleChange(e)}
                            type={showPassword.show_repeat_password ? 'text' : 'password'} // value={editProfile?.email}
                        />
                        <button
                            className='absolute right-3 top-1/2 -translate-y-1/2'
                            type='button'
                            onClick={e => {
                                e.preventDefault()

                                setShowPassword(prev => {
                                    return {
                                        ...prev,
                                        show_repeat_password: !prev.show_repeat_password
                                    }
                                })
                            }}
                        >
                            {showPassword.show_repeat_password ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                    {errors.repeat_password?.message && (
                        <small className=' form-error'>{`${errors?.repeat_password.message}`}</small>
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

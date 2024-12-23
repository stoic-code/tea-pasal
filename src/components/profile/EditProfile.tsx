'use client'
import { useUserDetailQuery } from '@/lib/features/api/auth/userApi'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import withProtectedRoute from '../withProtectedRoute'
import EditFullName from './EditFullName'
import EditEmail from './EditEmail'
import EditPassword from './EditPassword'
import { UserInfo } from 'os'

function EditProfile() {
    const { data, error, isSuccess } = useUserDetailQuery()
    const userInfo: User = data as User

    return (
        <section>
            {/* <p className=' mb-10 text-xl font-bold'>User Dashboard</p> */}
            <div id='main wrapper' className=' grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3 '>
                <div
                    className={`relative rounded-3xl border-2   border-gray-300  p-8 transition-all  duration-500 focus-within:border-primary-dark-30   `}
                >
                    <p className=' absolute  -top-4 bg-white px-1 text-xl font-bold'>Edit Profile</p>
                    <EditFullName userInfo={userInfo} />
                </div>
                <div className=' relative rounded-3xl border-2  border-gray-300 p-8  transition-all  duration-500 focus-within:border-primary-dark-30'>
                    <p className=' absolute  -top-4 bg-white px-1 text-xl font-bold'>Edit Email</p>

                    <EditEmail userInfo={userInfo} />
                </div>
                <div className=' relative rounded-3xl border-2  border-gray-300 p-8  transition-all  duration-500 focus-within:border-primary-dark-30'>
                    <p className=' absolute  -top-4 bg-white px-1 text-xl font-bold'>Edit Password</p>

                    <EditPassword userInfo={userInfo} />
                </div>
            </div>
        </section>
    )
}

export default withProtectedRoute(EditProfile)

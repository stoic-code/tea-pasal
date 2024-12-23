import EditProfile from '@/components/profile/EditProfile'
import ShippingAddress from '@/components/profile/ShippingAddress'

async function Dashboard() {
    return (
        <>
            <div className=' container flex flex-col'>
                <section className='my-14'>
                    <EditProfile />
                </section>
                <section className='mb-14'>
                    <ShippingAddress />
                </section>
            </div>
        </>
    )
}

export default Dashboard

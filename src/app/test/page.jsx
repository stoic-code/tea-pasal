'use client'
export default function Page() {
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()

                    fetch(`http://182.93.93.82:8989/api/v1/auth/o/google-oauth2/${e.target.input.value}`, {
                        method: 'POST',
                        credentials: 'include'
                    })
                }}
            >
                <textarea name='input' type='text' className='form-control' />
                <input type='submit' className='btn' />
            </form>
        </div>
    )
}

import React from 'react'
import VideoPlayer from './VideoPlayer'

export default function Info() {
    return (
        <section className='container py-24  text-center'>
            <h2 className={`header playfair mb-3`}>Tea is a Drink of Health</h2>
            <p className='description-lg'>
                Avocado Green Mattresses are designed in hoboken and handmade in sunny california with only the finest
                naturally non- toxic and 100% certified organic materials from our own farms. Our mission is to be the
                most respected source for organic mattresses and pillows at affordable prices — while maintaining
                environmentally conscious, ethical, and sustainable business practices — to help safeguard your health
                and protect our planet.
            </p>
            <div className='mt-12'>
                <VideoPlayer />
            </div>
        </section>
    )
}

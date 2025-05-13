import React from 'react'
import SubscriberList from './_partials/SubscriberList'


const page = () => {
  return (
    <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-12 xl:col-span-9'>
            <SubscriberList />
        </div>
        <div>

        </div>
    </div>
  )
}

export default page
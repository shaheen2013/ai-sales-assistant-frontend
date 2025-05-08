"use client";

import { Calendar } from '@/components/calendar'
import React from 'react'

const AppointBookingSection = () => {
  return (
    <div>
      <Calendar 
        mode='single'
        // onSelect={(date) => console.log(date)}
      />
    </div>
  )
}

export default AppointBookingSection
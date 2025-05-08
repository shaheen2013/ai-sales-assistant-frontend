"use client";

import { Calendar } from '@/components/calendar'
import React, { useState } from 'react'

const AppointBookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    </div>
  )
}

export default AppointBookingSection
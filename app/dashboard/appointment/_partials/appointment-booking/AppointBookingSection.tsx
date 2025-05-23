"use client";

import { Calendar } from '@/components/calendar'
import React, { useState } from 'react'
import UpcomingAppointmentList from './UpcomingAppointmentList';
import { useGetAppoinmentsQuery } from '@/features/appointmentBooking/appointmentBookingSlice';
import moment from 'moment';

const AppointBookingSection = () => {
  /*--React State--*/
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(moment().toDate());

  /*--RTK Query--*/
  const {} = useGetAppoinmentsQuery({ date: moment(selectedDate).format("YYYY-MM-DD") });
  return (
    <div className='p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-50'> 
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={{
          before: moment().toDate()
        }}
      />

      <div className="w-full h-px bg-gray-50 my-6" />

      <h4 className="justify-start text-gray-700 text-xl font-semibold">Upcoming Appointment</h4>

      <div className='mt-6 flex flex-col gap-6'>
        <UpcomingAppointmentList />
        <UpcomingAppointmentList />
      </div>
    </div>
  )
}

export default AppointBookingSection
"use client";

import React, { FC } from 'react'
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type DateRangeProps = {
    date: Range[];
    onChange: (date: Range[]) => void
}

const DateRange: FC<DateRangeProps> = ({ date, onChange }) => {
    return (
        <DateRangePicker
            onChange={(item: RangeKeyDict) => onChange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={date}
            rangeColors={["#34AD5D", "#019935", "#018B30"]}
            direction='horizontal'
        />
    )
}

export default DateRange
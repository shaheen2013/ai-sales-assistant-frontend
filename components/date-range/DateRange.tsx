"use client";

import React, { FC, useEffect, useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type DateRangeProps = {
  date: Range[];
  onChange: (date: Range[]) => void;
};

const DateRange: FC<DateRangeProps> = ({ date, onChange }) => {
  const [screenResolution, setScreenResolution] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setScreenResolution(window.innerWidth);
    };

    // Set initial screen resolution
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DateRangePicker
      onChange={(item: RangeKeyDict) => onChange([item.selection])}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={date}
      rangeColors={["#34AD5D", "#019935", "#018B30"]}
      //   direction="horizontal"
      direction={screenResolution < 640 ? "vertical" : "horizontal"}
    />
  );
};

export default DateRange;

"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardOverviewChart() {
  interface Data {
    name: string;
    reach: number;
    engagement: number;
    impressions: number;
  }

  const data: Data[] = [
    {
      name: "Jan",
      reach: 4000,
      engagement: 2400,
      impressions: 2400,
    },
    {
      name: "Feb",
      reach: 3000,
      engagement: 1398,
      impressions: 2210,
    },
    {
      name: "Mar",
      reach: 2000,
      engagement: 9800,
      impressions: 2290,
    },
    {
      name: "Apr",
      reach: 2780,
      engagement: 3908,
      impressions: 2000,
    },
    {
      name: "May",
      reach: 1890,
      engagement: 4800,
      impressions: 2181,
    },
    {
      name: "Jun",
      reach: 2390,
      engagement: 3800,
      impressions: 2500,
    },
    {
      name: "Jul",
      reach: 3490,
      engagement: 4300,
      impressions: 2100,
    },
    {
      name: "Aug",
      reach: 3490,
      engagement: 4300,
      impressions: 2100,
    },
    {
      name: "Sep",
      reach: 3490,
      engagement: 4300,
      impressions: 2100,
    },
    {
      name: "Oct",
      reach: 3490,
      engagement: 4300,
      impressions: 2100,
    },
    {
      name: "Nov",
      reach: 3490,
      engagement: 4300,
      impressions: 2100,
    },
    {
      name: "Dec",
      reach: 3490,
      engagement: 4300,
      impressions: 2100,
    },
  ];

  function CustomTooltip({ payload, label, active }: any) {
    return (
      <div className="border bg-white p-3  rounded-lg custom-tooltip">
        {payload.map((item: any, index: number) => {
          return (
            <div key={index} className="flex gap-2 items-center mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>

              <p className="text-[#2A2F3D] text-sm font-medium capitalize">{`${item.name} (${item.value})`}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="h-[400px] border p-6 rounded-lg bg-white shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 7,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#E3E8EF" strokeDasharray="5 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={CustomTooltip}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
            itemStyle={{}}
            labelStyle={{
              display: "none",
            }}
          />

          <Line type="monotone" dataKey="reach" stroke="#F0F4A9" />
          <Line type="monotone" dataKey="engagement" stroke="#DDF2F6" />

          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#E5D9FF"
            activeDot={{
              fill: "#fff",
              stroke: "#E5D9FF",
              strokeWidth: 3.4,
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

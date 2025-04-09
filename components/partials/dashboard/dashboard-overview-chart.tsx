"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
      reach: 4231,
      engagement: 8123,
      impressions: 1324,
    },
    {
      name: "Feb",
      reach: 3120,
      engagement: 1475,
      impressions: 2678,
    },
    {
      name: "Mar",
      reach: 2789,
      engagement: 9234,
      impressions: 1890,
    },
    {
      name: "Apr",
      reach: 1904,
      engagement: 3560,
      impressions: 2750,
    },
    {
      name: "May",
      reach: 3345,
      engagement: 5021,
      impressions: 2120,
    },
    {
      name: "Jun",
      reach: 2450,
      engagement: 3880,
      impressions: 2965,
    },
    {
      name: "Jul",
      reach: 3102,
      engagement: 4678,
      impressions: 2203,
    },
    {
      name: "Aug",
      reach: 3760,
      engagement: 4021,
      impressions: 3180,
    },
    {
      name: "Sep",
      reach: 2890,
      engagement: 4780,
      impressions: 2011,
    },
    {
      name: "Oct",
      reach: 3599,
      engagement: 3890,
      impressions: 2344,
    },
    {
      name: "Nov",
      reach: 2730,
      engagement: 5090,
      impressions: 2455,
    },
    {
      name: "Dec",
      reach: 3950,
      engagement: 4444,
      impressions: 2109,
    },
  ];

  function CustomTooltip({ payload }: any) {
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
    <div className="h-[450px] border p-6 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between mb-2">
        <h3 className="text-[#2A2F3D] text-xl font-semibold mb-4">
          Profile Overview
        </h3>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#F0F4A9]"></div>
            <p className="text-[#2A2F3D] text-sm font-medium">Reach</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#DDF2F6]"></div>
            <p className="text-[#2A2F3D] text-sm font-medium">Engagement</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#E5D9FF]"></div>
            <p className="text-[#2A2F3D] text-sm font-medium">Impressions</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 7,
            bottom: 5,
          }}
        >
          <CartesianGrid
            stroke="#E3E8EF"
            strokeDasharray="5 0"
            horizontal={false}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={CustomTooltip}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
            labelStyle={{
              display: "none",
            }}
            cursor={{
              stroke: "#000",
              strokeWidth: 1,
              strokeDasharray: "10 8",
            }}
          />
          <Line
            type="monotone"
            dataKey="reach"
            stroke="#F0F4A9"
            dot={false}
            activeDot={false}
            strokeWidth={4}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#DDF2F6"
            dot={false}
            activeDot={false}
            strokeWidth={4}
          />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#E5D9FF"
            dot={false}
            strokeWidth={4}
            // activeDot={CustomActiveDot}
            activeDot={{
              fill: "#fff",
              stroke: "#E5D9FF",
              strokeWidth: 3.4,
              r: 8,
              style: {
                filter: "drop-shadow(0 0 0 4px rgba(229, 217, 255, 0.5))",
              },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

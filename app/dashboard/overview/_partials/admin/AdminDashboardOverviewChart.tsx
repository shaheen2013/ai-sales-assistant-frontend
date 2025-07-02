"use client";

import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  reach: number;
  engagement: number;
}

type AdminDashboardOverviewChartPropsType = {
  data: ChartData[];
};

const AdminDashboardOverviewChart: FC<AdminDashboardOverviewChartPropsType> = ({
  data,
}) => {
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
    <div className="h-[450px] border overflow-x-auto p-6 rounded-lg bg-white shadow-sm">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
        <h3 className="text-[#2A2F3D] text-xl font-semibold ">
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

          {/* <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#E5D9FF]"></div>
            <p className="text-[#2A2F3D] text-sm font-medium">Impressions</p>
          </div> */}
        </div>

        {/* <div>hey</div> */}
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
          {/* <XAxis dataKey="name" /> */}
          <XAxis
            dataKey="month"
            stroke="#E3E8EF" // color of the axis line and ticks
            tick={{ fill: "#878787", fontSize: 14, dy: 8 }} // tick label styles
            axisLine={{ stroke: "#E3E8EF" }} // X axis line color
            tickLine={{ stroke: "#fff" }} // small tick marks
          />
          <YAxis
            stroke="#878787"
            tick={{ fill: "#878787", fontSize: 14, dx: -8 }}
            axisLine={{ stroke: "#E3E8EF" }}
            tickLine={{ stroke: "#fff" }}
          />
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
            strokeDasharray="5 0"
            dot={false}
            activeDot={{
              r: 8,
              stroke: "#F0F4A9",
              strokeWidth: 3,
              fill: "#fff",

              // shadow
              filter: "drop-shadow(0px 0px 5px rgba(240, 244, 169, 0.3))",
            }}
            strokeWidth={4}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#DDF2F6"
            dot={false}
            activeDot={{
              r: 8,
              stroke: "#DDF2F6",
              strokeWidth: 3,
              fill: "#fff",

              // shadow
              filter: "drop-shadow(0px 0px 5px rgba(221, 242, 246, 0.3))",
            }}
            strokeWidth={4}
          />

          {/* <Line
            type="monotone"
            dataKey=""
            stroke="#8884d8"
            // activeDot={{ r: 8 }}
          /> */}
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboardOverviewChart;

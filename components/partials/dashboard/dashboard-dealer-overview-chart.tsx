"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardDealerOverviewChart() {
  interface Data {
    name: string;
    organic: number;
    byAi: number;
    byReferral: number;
  }

  const data: Data[] = [
    {
      name: "Jan",
      organic: 3800,
      byAi: 2100,
      byReferral: 1900,
    },
    {
      name: "Feb",
      organic: 4200,
      byAi: 1600,
      byReferral: 2500,
    },
    {
      name: "Mar",
      organic: 3000,
      byAi: 2800,
      byReferral: 2200,
    },
    {
      name: "Apr",
      organic: 4500,
      byAi: 2400,
      byReferral: 2100,
    },
    {
      name: "May",
      organic: 3300,
      byAi: 2900,
      byReferral: 2700,
    },
    {
      name: "Jun",
      organic: 3900,
      byAi: 2600,
      byReferral: 2300,
    },
    {
      name: "Jul",
      organic: 4100,
      byAi: 2000,
      byReferral: 2800,
    },
    {
      name: "Aug",
      organic: 3700,
      byAi: 2500,
      byReferral: 2400,
    },
    {
      name: "Sep",
      organic: 3400,
      byAi: 3000,
      byReferral: 2200,
    },
    {
      name: "Oct",
      organic: 3200,
      byAi: 2700,
      byReferral: 2600,
    },
    {
      name: "Nob",
      organic: 3600,
      byAi: 2300,
      byReferral: 2500,
    },
    {
      name: "Dec",
      organic: 4000,
      byAi: 1800,
      byReferral: 2900,
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
    <div className="bg-white h-[250px]">
      <svg
        viewBox="0 0 553 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w=full"
      >
        <line
          x1="0.874077"
          y1="14.6636"
          x2="551.689"
          y2="14.6636"
          stroke="#F5F5F5"
          strokeWidth="0.77037"
          strokeLinecap="round"
        />
        <line
          x1="0.874077"
          y1="14.5875"
          x2="551.689"
          y2="14.5875"
          stroke="#F5F5F5"
          strokeWidth="0.77037"
          strokeLinecap="round"
        />
        <line
          x1="0.874077"
          y1="12.5836"
          x2="551.689"
          y2="12.5836"
          stroke="#F5F5F5"
          strokeWidth="0.77037"
          strokeLinecap="round"
        />
        <line
          x1="0.874077"
          y1="10.5816"
          x2="551.689"
          y2="10.5816"
          stroke="#F5F5F5"
          strokeWidth="0.77037"
          strokeLinecap="round"
        />
        <line
          x1="0.874077"
          y1="8.57771"
          x2="551.689"
          y2="8.57771"
          stroke="#F5F5F5"
          strokeWidth="0.77037"
          strokeLinecap="round"
        />
        <line
          x1="0.874077"
          y1="6.57575"
          x2="551.689"
          y2="6.57575"
          stroke="#F5F5F5"
          strokeWidth="0.77037"
          strokeLinecap="round"
        />
      </svg>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 0,
            // right: 30,
            // left: 20,
            // bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="name"
            orientation="top"
            tick={{ fill: "#535862", fontSize: 10, fontWeight: 500, dy: 0 }}
            axisLine={{ stroke: "#fff" }}
            tickLine={{ stroke: "#fff" }}
          />
          {/* <YAxis /> */}
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
              fill: "transparent",
              // stroke: "#000",
              // strokeWidth: 1,
              // strokeDasharray: "10 8",
            }}
          />
          {/* <Legend /> */}
          <Bar
            dataKey="organic"
            stackId="a"
            fill="#34AD5D"
            barSize={26}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="byAi"
            stackId="a"
            fill="#8AD0A2"
            barSize={26}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="byReferral"
            stackId="a"
            fill="#E6F5EB"
            barSize={26}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

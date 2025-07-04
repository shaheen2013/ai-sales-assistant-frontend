"use client";

import { DealerRegistrationSourceMonthlyData } from "@/types/dealerType";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardDealerOverviewChart({
  data,
}: {
  data: DealerRegistrationSourceMonthlyData[];
}) {
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
      {/* <svg
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
      </svg> */}

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
            dataKey="month"
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
            name={"Organic"}
            dataKey="organic"
            stackId="a"
            fill="#34AD5D"
            barSize={26}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            name={"By AI"}
            dataKey="by_ai"
            stackId="a"
            fill="#8AD0A2"
            barSize={26}
            radius={[6, 6, 0, 0]}
          />
          {/* <Bar
            dataKey="byReferral"
            stackId="a"
            fill="#E6F5EB"
            barSize={26}
            radius={[6, 6, 0, 0]}
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

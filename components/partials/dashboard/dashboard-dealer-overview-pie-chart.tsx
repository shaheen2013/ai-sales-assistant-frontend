"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

// const chartData = [
//   { name: "organic", visitors: 275, fill: "var(--color-chrome)" },
//   { name: "safari", visitors: 200, fill: "var(--color-safari)" },
//   // { name: "firefox", visitors: 187, fill: "var(--color-firefox)" },
// ];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#ddd",
  },
  chrome: {
    label: "Organic",
    color: "#34AD5D",
  },
  safari: {
    label: "by AI",
    color: "#55BB78",
  },
  // firefox: {
  //   label: "Referral",
  //   color: "#B5E4CE",
  // },
} satisfies ChartConfig;

export default function DashboardDealerOverviewPieChart({ data }: { data: { name: string, visitors: number, fill: string }[] }) {
  return (
    <div className="flex">
      {/* chart */}
      <div className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[550px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="name"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </div>

      {/* labels */}
      <div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          <div className="w-[6.16px] h-[6.16px] bg-[#34ad5d] rounded-full" />
          Organic
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          <div className="w-[6.16px] h-[6.16px] bg-[#8AD0A2] rounded-full" />
          by Ai
        </div>
        {/* <div className="text-gray-600 text-sm">Referral</div> */}
      </div>
    </div>
  );
}

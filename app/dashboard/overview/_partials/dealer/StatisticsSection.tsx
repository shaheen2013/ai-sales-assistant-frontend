import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import Image from "next/image";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function CustomTooltip({ payload }: any) {
  console.log("payload", payload);
  return (
    <div className="p-4 relative bg-white border border-gray-50 rounded-lg shadow-[0px_4px_12px_rgba(0,0,0,0.1)] flex justify-center items-center">
      {payload.map((item: any, index: number) => {
        return (
          <div key={index} className="flex flex-col justify-center items-center" >
            <div className="justify-start text-slate-800 text-lg">{item.value}</div>
            <div className="justify-start text-zinc-400 text-sm mt-1">Total Minute</div>
          </div>
        );
      })}
    </div>
  );
}

export default function StatisticsSection() {
  return (
    <div className="border rounded-xl p-4">
      {/* top */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-gray-500 text-xl font-semibold">
            Support Statistic
          </h2>
          <h4 className="text-gray-300 text-base">
            Compare last month vs. current month AI talk time and total interactions in a line chart.
          </h4>
        </div>
      </div>

      <hr />

      {/* content */}
      <div className="grid grid-cols-12 items-center mt-6">
        <div className="col-span-12 xl:col-span-2">
          <div className="text-gray-500 text-base font-normal">Total Talk</div>
          <div className="text-gray-700 mt-2"><span className=" text-3xl font-semibold">220 </span><span className="text-lg font-normal">Minute</span></div>
          <div className="text-base font-normal text-gray-500 mt-2"><span className="text-green-500">+23%</span> than last Month</div>
          <div className="flex gap-2 justify-start items-start mt-6">
            <Image
              src={"/icons/homepage/ellipse.svg"}
              alt="ellipse"
              width={12}
              height={12}
              className="size-3 mt-1"
            />
            <div>
              <div className="text-gray-500 text-sm font-normal">Last Month</div>
              <div className="text-gray-700 text-base font-medium mt-2">321 Minute</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-10 h-[347px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#E6F5EB"
                strokeDasharray="5 0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#878787", fontSize: 18, dy: 8, fontWeight: 500 }}
                axisLine={{ stroke: "transparent" }}
                tickLine={{ stroke: "transparent" }}
              />
              <YAxis
                tick={{ fill: "#878787", fontSize: 18, dy: 8, fontWeight: 500 }}
                axisLine={{ stroke: "transparent" }}
                tickLine={{ stroke: "transparent" }}
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
                  fill: 'rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="pv" fill="#55BB78" barSize={32} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-[url('/images/tooltip_bg.png')] bg-cover bg-no-repeat bg-center w-40 h-20  flex justify-center items-center">
      </div>
    </div>
  );
}

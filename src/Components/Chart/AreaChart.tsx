/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define the structure of the chart data
interface ChartData {
  name: string;
  uv: number;
}

const data: ChartData[] = [
  { name: "Jan", uv: 475000 },
  { name: "Feb", uv: 580000 },
  { name: "Mar", uv: 300000 },
  { name: "Apr", uv: 525000 },
  { name: "May", uv: 375000 },
  { name: "Jun", uv: 450000 },
  { name: "Jul", uv: 575000 },
  { name: "Aug", uv: 360000 },
  { name: "Sep", uv: 500000 },
  { name: "Oct", uv: 500000 },
  { name: "Nov", uv: 450000 },
  { name: "Dec", uv: 500000 },
];

const activeDotStyle = {
  r: 8, // Size of the hover dot
  stroke: "#fff", // Color of the hover dot
  strokeWidth: 2, // Border width of the hover dot
  fill: "#AA8FFF", // Inside color of the hover dot
};

const Area_Chart: React.FC = () => {
  // Formatter function to add 'K' suffix to Y-axis values

  // Custom tick style
  const tickStyle = { fill: "#000", fontSize: 12 };

  const yAxisTickFormatter = (value: any): string => {
    if (typeof value === "number") {
      if (value >= 1000000) return `${value / 1000000}M`;
      if (value >= 1000) return `${value / 1000}k`;
      return value.toString();
    }
    return String(value);
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#E5E5EF"
            strokeDasharray="0"
          />
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickCount={5}
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#ffffff",
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#AA8FFF" stopOpacity={1} />
              <stop offset="70%" stopColor="#fff" stopOpacity={1} />
              <stop offset="100%" stopColor="#fff" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff", // Tooltip background color
              border: "1px solid #ccc", // Tooltip border
              borderRadius: "5px", // Tooltip border radius
            }}
            itemStyle={{ color: "#0a0a08" }} // Tooltip text color
            labelStyle={{ color: "#202020" }} // Tooltip label color
            formatter={(value: number): [string, string] => [`${value}K`, "UV"]}
            labelFormatter={(label: string) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#AA8FFF"
            strokeWidth={3}
            fill="url(#colorUv)"
            activeDot={{ ...activeDotStyle }} // Custom hover line
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;

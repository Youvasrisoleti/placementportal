
import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

interface BarChartProps {
  data: any[];
  xAxisDataKey?: string;
}

export const BarChart = ({ data, xAxisDataKey = "name" }: BarChartProps) => {
  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  return (
    <ChartContainer className="w-full h-full" config={{}}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="total" fill="#8884d8">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ChartContainer>
  );
};

interface LineChartProps {
  data: any[];
  xAxisDataKey?: string;
}

export const LineChart = ({ data, xAxisDataKey = "name" }: LineChartProps) => {
  return (
    <ChartContainer className="w-full h-full" config={{}}>
      <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ChartContainer>
  );
};

interface PieChartProps {
  data: any[];
}

export const PieChart = ({ data }: PieChartProps) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];

  return (
    <ChartContainer className="w-full h-full" config={{}}>
      <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
};

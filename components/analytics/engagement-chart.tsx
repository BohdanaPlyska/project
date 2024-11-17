"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = {
  posts: [
    { date: "Mon", value: 2400 },
    { date: "Tue", value: 1398 },
    { date: "Wed", value: 9800 },
    { date: "Thu", value: 3908 },
    { date: "Fri", value: 4800 },
    { date: "Sat", value: 3800 },
    { date: "Sun", value: 4300 },
  ],
  stories: [
    { date: "Mon", value: 3000 },
    { date: "Tue", value: 2000 },
    { date: "Wed", value: 8780 },
    { date: "Thu", value: 4890 },
    { date: "Fri", value: 5300 },
    { date: "Sat", value: 4300 },
    { date: "Sun", value: 5300 },
  ],
}

interface EngagementChartProps {
  metric?: keyof typeof data
}

export function EngagementChart({ metric = "posts" }: EngagementChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data[metric]}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Engagement
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
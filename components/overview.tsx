"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    date: "Jan 22",
    followers: 2890,
    engagement: 2400,
  },
  {
    date: "Feb 22",
    followers: 3200,
    engagement: 2800,
  },
  {
    date: "Mar 22",
    followers: 3500,
    engagement: 3100,
  },
  {
    date: "Apr 22",
    followers: 3780,
    engagement: 3400,
  },
  {
    date: "May 22",
    followers: 4000,
    engagement: 3700,
  },
  {
    date: "Jun 22",
    followers: 4500,
    engagement: 4100,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Followers
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Engagement
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="followers"
          activeDot={{
            r: 6,
            style: { fill: "hsl(var(--chart-1))" },
          }}
          style={{ stroke: "hsl(var(--chart-1))" }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="engagement"
          activeDot={{
            r: 6,
            style: { fill: "hsl(var(--chart-2))" },
          }}
          style={{ stroke: "hsl(var(--chart-2))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ThumbsUp, MessageCircle } from "lucide-react"

const stats = [
  {
    title: "Total Followers",
    value: "45.2K",
    icon: Users,
    change: "+12.3%",
  },
  {
    title: "Total Likes",
    value: "123.4K",
    icon: ThumbsUp,
    change: "+8.2%",
  },
  {
    title: "Comments",
    value: "8.9K",
    icon: MessageCircle,
    change: "+5.7%",
  },
]

export function AccountStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-500">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
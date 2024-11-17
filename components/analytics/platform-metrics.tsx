"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Facebook, ArrowUpRight, ArrowDownRight } from "lucide-react"

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    followers: "32.5K",
    change: "+15.3%",
    trending: "up",
    engagement: "4.2%",
  },
  {
    name: "Facebook",
    icon: Facebook,
    followers: "12.7K",
    change: "-2.1%",
    trending: "down",
    engagement: "2.8%",
  },
]

export function PlatformMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {platforms.map((platform) => (
        <Card key={platform.name}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {platform.name}
            </CardTitle>
            <platform.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{platform.followers}</div>
                <p className="text-xs text-muted-foreground">Total Followers</p>
              </div>
              <div className="flex items-center space-x-1">
                <span className={platform.trending === "up" ? "text-green-500" : "text-red-500"}>
                  {platform.change}
                </span>
                {platform.trending === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">{platform.engagement}</div>
              <p className="text-xs text-muted-foreground">Engagement Rate</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
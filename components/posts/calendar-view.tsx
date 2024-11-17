"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook } from "lucide-react"

const scheduledPosts = [
  {
    date: new Date(2024, 3, 15),
    posts: [
      {
        id: 1,
        platform: "Instagram",
        time: "10:00 AM",
        content: "Summer Collection Launch",
      },
      {
        id: 2,
        platform: "Facebook",
        time: "2:00 PM",
        content: "Behind the Scenes",
      },
    ],
  },
  {
    date: new Date(2024, 3, 18),
    posts: [
      {
        id: 3,
        platform: "Instagram",
        time: "11:30 AM",
        content: "Customer Spotlight",
      },
    ],
  },
]

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedDayPosts = scheduledPosts.find(
    (day) => day.date.toDateString() === date?.toDateString()
  )

  return (
    <div className="grid gap-6 md:grid-cols-[400px_1fr]">
      <Card>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">
            {date ? date.toLocaleDateString("en-US", { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : "Select a date"}
          </h3>
          {selectedDayPosts ? (
            <div className="space-y-4">
              {selectedDayPosts.posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {post.platform === "Instagram" ? (
                    <Instagram className="h-4 w-4" />
                  ) : (
                    <Facebook className="h-4 w-4" />
                  )}
                  <div>
                    <p className="font-medium">{post.content}</p>
                    <p className="text-sm text-muted-foreground">{post.time}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {post.platform}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No posts scheduled for this date</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
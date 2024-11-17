"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const notifications = [
  {
    title: "Post Performance",
    description: "Get notified when a post reaches performance milestones",
    enabled: true,
  },
  {
    title: "Comments",
    description: "Receive notifications for new comments on your posts",
    enabled: true,
  },
  {
    title: "Follower Milestones",
    description: "Get notified when you reach follower milestones",
    enabled: true,
  },
  {
    title: "Direct Messages",
    description: "Receive notifications for new direct messages",
    enabled: false,
  },
  {
    title: "Mentions",
    description: "Get notified when someone mentions you in a post",
    enabled: true,
  },
  {
    title: "Email Digest",
    description: "Receive weekly email summaries of your account activity",
    enabled: false,
  },
]

export function NotificationSettings() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
              <Switch defaultChecked={notification.enabled} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
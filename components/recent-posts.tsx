"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const posts = [
  {
    id: 1,
    title: "Summer Collection Launch 🌞",
    engagement: "High",
    date: "2 hours ago",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    platform: "Instagram",
  },
  {
    id: 2,
    title: "Behind the Scenes: Product Shoot 📸",
    engagement: "Medium",
    date: "5 hours ago",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    platform: "Facebook",
  },
  {
    id: 3,
    title: "Customer Spotlight: Sarah's Story ⭐",
    engagement: "High",
    date: "1 day ago",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
    platform: "Instagram",
  },
]

export function RecentPosts() {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.image} alt="Post image" />
            <AvatarFallback>PN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-sm text-muted-foreground">
              {post.platform} • {post.date}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {post.engagement === "High" ? (
              <span className="text-green-500">High</span>
            ) : post.engagement === "Medium" ? (
              <span className="text-yellow-500">Medium</span>
            ) : (
              <span className="text-red-500">Low</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
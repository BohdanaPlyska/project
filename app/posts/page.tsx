"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostsList } from "@/components/posts/posts-list"
import { CreatePostDialog } from "@/components/posts/create-post-dialog"
import { CalendarView } from "@/components/posts/calendar-view"
import { ImagePlus } from "lucide-react"

export default function PostsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button onClick={() => setCreateOpen(true)}>
          <ImagePlus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <PostsList />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>
      </Tabs>

      <CreatePostDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
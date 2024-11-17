"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Facebook, Clock, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CreatePostDialog } from "./create-post-dialog"
import { toast } from "@/hooks/use-toast"

interface Post {
  id: number
  content: string
  image: string
  platform: "Instagram" | "Facebook"
  status: "Published" | "Scheduled" | "Draft"
  date: string
}

const initialPosts: Post[] = [
  {
    id: 1,
    content: "Summer Collection Launch 🌞 Get ready for the hottest styles of the season!",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    platform: "Instagram",
    status: "Published",
    date: "2 hours ago",
  },
  {
    id: 2,
    content: "Behind the Scenes: Product Shoot 📸 Sneak peek at what's coming!",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    platform: "Facebook",
    status: "Scheduled",
    date: "Tomorrow at 10:00 AM",
  },
  {
    id: 3,
    content: "Customer Spotlight: Sarah's Story ⭐ See how our products made a difference!",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
    platform: "Instagram",
    status: "Draft",
    date: "Not scheduled",
  },
]

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleDelete = (post: Post) => {
    setSelectedPost(post)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter((p) => p.id !== selectedPost.id))
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      })
    }
    setDeleteDialogOpen(false)
  }

  const handleEdit = (post: Post) => {
    setSelectedPost(post)
    setEditDialogOpen(true)
  }

  const handleDuplicate = (post: Post) => {
    const newPost = {
      ...post,
      id: Math.max(...posts.map((p) => p.id)) + 1,
      status: "Draft" as const,
      date: "Not scheduled",
    }
    setPosts([...posts, newPost])
    toast({
      title: "Post duplicated",
      description: "A new draft has been created from the selected post.",
    })
  }

  return (
    <>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex gap-4 p-6">
              <Avatar className="h-24 w-24 rounded-lg">
                <AvatarImage src={post.image} alt="Post image" />
                <AvatarFallback>Post</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  {post.platform === "Instagram" ? (
                    <Instagram className="h-4 w-4" />
                  ) : (
                    <Facebook className="h-4 w-4" />
                  )}
                  <Badge variant={
                    post.status === "Published" ? "default" :
                    post.status === "Scheduled" ? "secondary" : "outline"
                  }>
                    {post.status}
                  </Badge>
                </div>
                <p className="text-sm">{post.content}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.date}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(post)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicate(post)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedPost && (
        <CreatePostDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          post={selectedPost}
          mode="edit"
        />
      )}
    </>
  )
}
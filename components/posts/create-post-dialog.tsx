"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { ImagePlus, X, Instagram, Facebook } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface Platform {
  id: string
  name: string
  icon: typeof Instagram | typeof Facebook
}

const platforms: Platform[] = [
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "facebook", name: "Facebook", icon: Facebook },
]

interface Post {
  id: number
  content: string
  image: string
  platform: "Instagram" | "Facebook"
  status: "Published" | "Scheduled" | "Draft"
  date: string
}

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post?: Post
  mode?: "create" | "edit"
}

export function CreatePostDialog({ 
  open, 
  onOpenChange, 
  post, 
  mode = "create" 
}: CreatePostDialogProps) {
  const [date, setDate] = useState<Date>()
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [content, setContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (post && mode === "edit") {
      setContent(post.content)
      setSelectedPlatforms([post.platform.toLowerCase()])
      setPreviews([post.image])
    }
  }, [post, mode])

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).slice(0, 10 - images.length)
    if (newFiles.length === 0) return

    setImages(prev => [...prev, ...newFiles])
    
    const newPreviews = newFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleImageUpload(e.dataTransfer.files)
  }

  const handleClose = () => {
    previews.forEach(preview => URL.revokeObjectURL(preview))
    setImages([])
    setPreviews([])
    setTags([])
    setTagInput("")
    setSelectedPlatforms([])
    setContent("")
    onOpenChange(false)
  }

  const handleSave = () => {
    toast({
      title: `Post ${mode === "create" ? "created" : "updated"}`,
      description: `The post has been successfully ${mode === "create" ? "created" : "updated"}.`,
    })
    handleClose()
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (newTag && !tags.includes(newTag) && tags.length < 10) {
        setTags(prev => [...prev, newTag])
        setTagInput("")
      }
    } else if (e.key === 'Backspace' && !tagInput) {
      e.preventDefault()
      setTags(prev => prev.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Post" : "Edit Post"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Platforms</Label>
            <div className="flex flex-wrap gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => togglePlatform(platform.id)}
                  />
                  <Label
                    htmlFor={platform.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <platform.icon className="h-4 w-4" />
                    {platform.name}
                  </Label>
                </div>
              ))}
            </div>
            {selectedPlatforms.length === 0 && (
              <p className="text-sm text-destructive">
                Please select at least one platform
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea 
              placeholder="Write your post content here..." 
              className="h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder={tags.length < 10 ? "Add tags..." : ""}
                  disabled={tags.length >= 10}
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px] disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Press enter or comma to add tags. Maximum 10 tags.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Media</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-4 transition-colors",
                isDragging && "border-primary/50 bg-primary/5",
                !isDragging && "border-border hover:border-primary/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {previews.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={preview}
                          alt={`Upload preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 10}
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    {previews.length > 0 ? "Add More Images" : "Upload Images"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {images.length < 10 ? (
                      <>Drag & drop or click to upload (max {10 - images.length} more)</>
                    ) : (
                      <span className="text-yellow-600">Maximum number of images reached</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PNG, JPG, JPEG
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Schedule Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label>Schedule Time</Label>
              <Input type="time" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={selectedPlatforms.length === 0}
          >
            {mode === "create" ? "Schedule Post" : "Update Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const apiKeys = [
  {
    name: "Instagram API Key",
    key: "ig_key_123456789",
    status: "Active",
  },
  {
    name: "Facebook API Key",
    key: "fb_key_987654321",
    status: "Active",
  },
]

export function ApiSettings() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {apiKeys.map((api) => (
          <div key={api.name} className="space-y-2">
            <Label>{api.name}</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showKeys[api.key] ? "text" : "password"}
                  value={api.key}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-8 top-0"
                  onClick={() => toggleKeyVisibility(api.key)}
                >
                  {showKeys[api.key] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => copyToClipboard(api.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline">Regenerate</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Status: <span className="text-green-500">{api.status}</span>
            </p>
          </div>
        ))}

        <div className="pt-4">
          <Button>Add New API Key</Button>
        </div>
      </CardContent>
    </Card>
  )
}
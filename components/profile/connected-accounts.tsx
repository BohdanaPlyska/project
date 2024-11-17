"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

const accounts = [
  {
    platform: "Instagram",
    icon: Instagram,
    connected: true,
    account: "@johndoe",
  },
  {
    platform: "Facebook",
    icon: Facebook,
    connected: true,
    account: "John Doe",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    connected: false,
    account: null,
  },
  {
    platform: "YouTube",
    icon: Youtube,
    connected: false,
    account: null,
  },
]

export function ConnectedAccounts() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {accounts.map((account) => (
            <div
              key={account.platform}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg border p-2">
                  <account.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">{account.platform}</h3>
                  {account.connected ? (
                    <p className="text-sm text-muted-foreground">
                      Connected as {account.account}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  )}
                </div>
              </div>
              {account.connected ? (
                <Button variant="outline">Disconnect</Button>
              ) : (
                <Button>Connect</Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
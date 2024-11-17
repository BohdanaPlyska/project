"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SecuritySettings() {
  return (
    <Card>
      <CardContent className="space-y-8 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" />
            </div>
            <Button className="w-fit">Update Password</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Secure your account with 2FA</p>
              <p className="text-sm text-muted-foreground">
                Enhance your account security by enabling two-factor authentication
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">MacBook Pro - Chrome</p>
                <p className="text-sm text-muted-foreground">
                  Last active: 2 minutes ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">iPhone 12 - Safari</p>
                <p className="text-sm text-muted-foreground">
                  Last active: 15 minutes ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
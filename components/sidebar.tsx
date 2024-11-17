"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  Home,
  ImagePlus,
  Settings,
  User,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Posts",
    href: "/posts",
    icon: ImagePlus,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth')

  if (isAuthPage) {
    return null
  }

  return (
    <nav className="hidden border-r bg-muted/40 md:block">
      <div className="flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2 px-3 py-2">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full justify-start">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="w-full justify-start">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
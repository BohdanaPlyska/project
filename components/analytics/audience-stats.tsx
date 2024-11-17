"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const ageGroups = [
  { age: "18-24", percentage: 35 },
  { age: "25-34", percentage: 45 },
  { age: "35-44", percentage: 15 },
  { age: "45+", percentage: 5 },
]

const locations = [
  { country: "United States", percentage: 40 },
  { country: "United Kingdom", percentage: 25 },
  { country: "Canada", percentage: 20 },
  { country: "Australia", percentage: 15 },
]

export function AudienceStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ageGroups.map((group) => (
              <div key={group.age} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{group.age}</span>
                  <span className="text-muted-foreground">{group.percentage}%</span>
                </div>
                <Progress value={group.percentage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.country} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{location.country}</span>
                  <span className="text-muted-foreground">{location.percentage}%</span>
                </div>
                <Progress value={location.percentage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { AudienceStats } from "@/components/analytics/audience-stats"
import { PlatformMetrics } from "@/components/analytics/platform-metrics"
import { TimeRangeSelect } from "@/components/analytics/time-range-select"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <TimeRangeSelect />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PlatformMetrics />
          <Card>
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <EngagementChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Post Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <EngagementChart metric="posts" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Story Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <EngagementChart metric="stories" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <AudienceStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
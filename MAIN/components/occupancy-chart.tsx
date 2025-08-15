"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, Users, DollarSign, Bed } from "lucide-react"

// Sample occupancy data
const dailyOccupancyData = [
  { date: "Jan 1", occupancy: 85, revenue: 12500, adr: 147 },
  { date: "Jan 2", occupancy: 92, revenue: 13800, adr: 150 },
  { date: "Jan 3", occupancy: 78, revenue: 11700, adr: 150 },
  { date: "Jan 4", occupancy: 88, revenue: 13200, adr: 150 },
  { date: "Jan 5", occupancy: 95, revenue: 14250, adr: 150 },
  { date: "Jan 6", occupancy: 82, revenue: 12300, adr: 150 },
  { date: "Jan 7", occupancy: 90, revenue: 13500, adr: 150 },
  { date: "Jan 8", occupancy: 87, revenue: 13050, adr: 150 },
  { date: "Jan 9", occupancy: 93, revenue: 13950, adr: 150 },
  { date: "Jan 10", occupancy: 89, revenue: 13350, adr: 150 },
  { date: "Jan 11", occupancy: 91, revenue: 13650, adr: 150 },
  { date: "Jan 12", occupancy: 86, revenue: 12900, adr: 150 },
  { date: "Jan 13", occupancy: 94, revenue: 14100, adr: 150 },
  { date: "Jan 14", occupancy: 88, revenue: 13200, adr: 150 },
  { date: "Jan 15", occupancy: 92, revenue: 13800, adr: 150 },
]

const roomTypeData = [
  { type: "Standard", occupancy: 88, total: 30, occupied: 26 },
  { type: "Deluxe", occupancy: 92, total: 15, occupied: 14 },
  { type: "Suite", occupancy: 85, total: 8, occupied: 7 },
  { type: "Presidential", occupancy: 75, total: 2, occupied: 1 },
]

const monthlyComparisonData = [
  { month: "Aug", occupancy: 82, adr: 145, revpar: 119 },
  { month: "Sep", occupancy: 88, adr: 148, revpar: 130 },
  { month: "Oct", occupancy: 91, adr: 152, revpar: 138 },
  { month: "Nov", occupancy: 85, adr: 150, revpar: 128 },
  { month: "Dec", occupancy: 93, adr: 155, revpar: 144 },
  { month: "Jan", occupancy: 89, adr: 150, revpar: 134 },
]

const bookingSourceData = [
  { name: "Direct", value: 35, color: "#0088FE" },
  { name: "OTA", value: 40, color: "#00C49F" },
  { name: "Corporate", value: 15, color: "#FFBB28" },
  { name: "Walk-in", value: 10, color: "#FF8042" },
]

const chartConfig = {
  occupancy: {
    label: "Occupancy %",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  adr: {
    label: "ADR",
    color: "hsl(var(--chart-3))",
  },
  revpar: {
    label: "RevPAR",
    color: "hsl(var(--chart-4))",
  },
}

export function OccupancyChart() {
  const currentOccupancy = 89
  const totalRooms = 55
  const occupiedRooms = 49
  const dailyRevenue = 13350
  const adr = 150

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentOccupancy}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rooms Occupied</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {occupiedRooms}/{totalRooms}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                6 rooms available
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dailyRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +5.2% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${adr}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -1.3% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Occupancy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Occupancy & Revenue Trend</CardTitle>
            <CardDescription>Last 15 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyOccupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="occupancy"
                    stroke="var(--color-occupancy)"
                    fill="var(--color-occupancy)"
                    fillOpacity={0.3}
                    name="Occupancy %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    name="Revenue ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Room Type Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy by Room Type</CardTitle>
            <CardDescription>Current occupancy rates by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="occupancy" fill="var(--color-occupancy)" name="Occupancy %" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>6-Month Performance Comparison</CardTitle>
            <CardDescription>Occupancy, ADR, and RevPAR trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="occupancy" stroke="var(--color-occupancy)" name="Occupancy %" />
                  <Line type="monotone" dataKey="adr" stroke="var(--color-adr)" name="ADR ($)" />
                  <Line type="monotone" dataKey="revpar" stroke="var(--color-revpar)" name="RevPAR ($)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Booking Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Sources Distribution</CardTitle>
            <CardDescription>Revenue breakdown by booking channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Room Type Details */}
      <Card>
        <CardHeader>
          <CardTitle>Room Type Performance Details</CardTitle>
          <CardDescription>Detailed breakdown of each room category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roomTypeData.map((room) => (
              <div key={room.type} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bed className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{room.type} Rooms</h4>
                    <p className="text-sm text-muted-foreground">
                      {room.occupied} of {room.total} rooms occupied
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{room.occupancy}%</div>
                  <Badge variant={room.occupancy >= 90 ? "default" : room.occupancy >= 80 ? "secondary" : "outline"}>
                    {room.occupancy >= 90 ? "High" : room.occupancy >= 80 ? "Good" : "Low"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

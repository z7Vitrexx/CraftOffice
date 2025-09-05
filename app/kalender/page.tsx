"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { termine, formatDate, formatTime, getKundeById } from "@/lib/seed-data"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const statusColors = {
  Geplant: "bg-blue-100 text-blue-800 border-blue-200",
  "In Arbeit": "bg-orange-100 text-orange-800 border-orange-200",
  Abgeschlossen: "bg-green-100 text-green-800 border-green-200",
  Verschoben: "bg-gray-100 text-gray-800 border-gray-200",
}

export default function KalenderPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")
  const [filterStatus, setFilterStatus] = useState<string>("alle")

  const today = new Date()
  const todayTermine = termine.filter((termin) => {
    const terminDate = new Date(termin.datum)
    return terminDate.toDateString() === today.toDateString()
  })

  const getTermineStats = () => {
    const stats = termine.reduce(
      (acc, termin) => {
        acc[termin.status] = (acc[termin.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      gesamt: termine.length,
      heute: todayTermine.length,
      geplant: stats["Geplant"] || 0,
      inArbeit: stats["In Arbeit"] || 0,
      abgeschlossen: stats["Abgeschlossen"] || 0,
    }
  }

  const stats = getTermineStats()

  const filteredTermine = termine.filter((termin) => {
    const matchesStatus = filterStatus === "alle" || termin.status === filterStatus
    return matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kalender</h1>
            <p className="text-muted-foreground mt-2">Verwalten Sie alle Ihre Termine und Einsätze</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Neuer Termin
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gesamt</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gesamt}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Heute</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.heute}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Geplant</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.geplant}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Arbeit</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.inArbeit}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Abgeschlossen</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.abgeschlossen}</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Controls */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">
                    {selectedDate.toLocaleDateString("de-DE", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Heute
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Status</SelectItem>
                    <SelectItem value="Geplant">Geplant</SelectItem>
                    <SelectItem value="In Arbeit">In Arbeit</SelectItem>
                    <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
                    <SelectItem value="Verschoben">Verschoben</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={viewMode} onValueChange={(value: "day" | "week" | "month") => setViewMode(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Tag</SelectItem>
                    <SelectItem value="week">Woche</SelectItem>
                    <SelectItem value="month">Monat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-primary" />
              Heutige Termine ({todayTermine.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayTermine.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Keine Termine für heute geplant</p>
              ) : (
                todayTermine.map((termin) => {
                  const kunde = getKundeById(termin.kundeId)
                  return (
                    <div key={termin.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {formatTime(termin.startzeit)} - {formatTime(termin.endzeit)}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mt-1">{termin.titel}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {kunde?.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {termin.ort}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${statusColors[termin.status]} border`}>{termin.status}</Badge>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* All Appointments */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Filter className="h-5 w-5 text-primary" />
              Alle Termine ({filteredTermine.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTermine.map((termin) => {
                const kunde = getKundeById(termin.kundeId)
                return (
                  <div
                    key={termin.id}
                    className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{formatDate(termin.datum)}</span>
                          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                          <span className="text-sm text-muted-foreground">
                            {formatTime(termin.startzeit)} - {formatTime(termin.endzeit)}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground mt-1">{termin.titel}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {kunde?.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {termin.ort}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {termin.verantwortliche.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${statusColors[termin.status]} border`}>{termin.status}</Badge>
                      <Button variant="outline" size="sm">
                        Bearbeiten
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

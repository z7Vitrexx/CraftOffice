"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Square, User, Timer, TrendingUp, AlertCircle } from "lucide-react"
import { zeitbuchungen, auftraege } from "@/lib/seed-data"

export default function ZeiterfassungPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMitarbeiter, setSelectedMitarbeiter] = useState("Alle")
  const [selectedStatus, setSelectedStatus] = useState("Alle")

  // Get unique employees
  const mitarbeiter = Array.from(new Set(zeitbuchungen.map((z) => z.mitarbeiter)))

  // Calculate KPIs
  const heute = new Date().toISOString().split("T")[0]
  const heuteZeiten = zeitbuchungen.filter((z) => z.start.startsWith(heute))
  const gesamtStundenHeute = heuteZeiten.reduce((sum, z) => sum + z.dauerMin, 0) / 60
  const aktiveMitarbeiter = new Set(heuteZeiten.map((z) => z.mitarbeiter)).size
  const offeneZeiten = zeitbuchungen.filter((z) => !z.ende).length
  const wocheStart = new Date()
  wocheStart.setDate(wocheStart.getDate() - wocheStart.getDay() + 1)
  const wocheZeiten = zeitbuchungen.filter((z) => new Date(z.start) >= wocheStart)
  const gesamtStundenWoche = wocheZeiten.reduce((sum, z) => sum + z.dauerMin, 0) / 60

  // Filter time entries
  const filteredZeiten = zeitbuchungen.filter((zeit) => {
    const matchesSearch =
      zeit.mitarbeiter?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zeit.bemerkung?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zeit.auftragId?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMitarbeiter = selectedMitarbeiter === "Alle" || zeit.mitarbeiter === selectedMitarbeiter
    const matchesStatus =
      selectedStatus === "Alle" ||
      (selectedStatus === "Aktiv" && !zeit.ende) ||
      (selectedStatus === "Abgeschlossen" && zeit.ende)

    return matchesSearch && matchesMitarbeiter && matchesStatus
  })

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, "0")}h`
  }

  const getAuftragTitel = (auftragId?: string) => {
    if (!auftragId) return "Allgemeine Arbeitszeit"
    const auftrag = auftraege.find((a) => a.id === auftragId)
    return auftrag?.titel || auftragId
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Zeiterfassung</h1>
            <p className="text-muted-foreground mt-1">Arbeitszeiten erfassen und verwalten</p>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Zeit starten
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Square className="h-4 w-4" />
              Zeit stoppen
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stunden heute</p>
                  <p className="text-2xl font-bold">{gesamtStundenHeute.toFixed(1)}h</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aktive Mitarbeiter</p>
                  <p className="text-2xl font-bold">{aktiveMitarbeiter}</p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Offene Zeiten</p>
                  <p className="text-2xl font-bold">{offeneZeiten}</p>
                </div>
                <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stunden diese Woche</p>
                  <p className="text-2xl font-bold">{gesamtStundenWoche.toFixed(1)}h</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Timer className="h-5 w-5 text-primary" />
              Zeitbuchungen verwalten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Nach Mitarbeiter, Bemerkung oder Auftrag suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={selectedMitarbeiter}
                onChange={(e) => setSelectedMitarbeiter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="Alle">Alle Mitarbeiter</option>
                {mitarbeiter.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="Alle">Alle Status</option>
                <option value="Aktiv">Aktiv</option>
                <option value="Abgeschlossen">Abgeschlossen</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Time Entries Table */}
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Mitarbeiter</th>
                    <th className="text-left p-4 font-medium">Auftrag</th>
                    <th className="text-left p-4 font-medium">Start</th>
                    <th className="text-left p-4 font-medium">Ende</th>
                    <th className="text-left p-4 font-medium">Dauer</th>
                    <th className="text-left p-4 font-medium">Bemerkung</th>
                    <th className="text-left p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredZeiten.map((zeit) => (
                    <tr key={zeit.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{zeit.mitarbeiter}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{getAuftragTitel(zeit.auftragId)}</p>
                          {zeit.auftragId && <p className="text-sm text-muted-foreground">{zeit.auftragId}</p>}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{new Date(zeit.start).toLocaleDateString("de-DE")}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(zeit.start).toLocaleTimeString("de-DE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        {zeit.ende ? (
                          <div>
                            <p className="font-medium">{new Date(zeit.ende).toLocaleDateString("de-DE")}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(zeit.ende).toLocaleTimeString("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            Läuft
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{formatDuration(zeit.dauerMin)}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{zeit.bemerkung}</span>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={zeit.ende ? "secondary" : "default"}
                          className={zeit.ende ? "" : "bg-green-100 text-green-800 hover:bg-green-100"}
                        >
                          {zeit.ende ? "Abgeschlossen" : "Aktiv"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

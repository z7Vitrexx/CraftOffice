"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Euro, Users, Clock, FileText, Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const umsatzData = [
  { monat: "Jan", umsatz: 45000, kosten: 32000 },
  { monat: "Feb", umsatz: 52000, kosten: 35000 },
  { monat: "Mär", umsatz: 48000, kosten: 33000 },
  { monat: "Apr", umsatz: 61000, kosten: 38000 },
  { monat: "Mai", umsatz: 55000, kosten: 36000 },
  { monat: "Jun", umsatz: 67000, kosten: 41000 },
]

const projektData = [
  { name: "Abgeschlossen", value: 45, color: "#10b981" },
  { name: "In Bearbeitung", value: 30, color: "#3b82f6" },
  { name: "Geplant", value: 25, color: "#f59e0b" },
]

const mitarbeiterLeistung = [
  { name: "Max Mustermann", stunden: 168, projekte: 12, bewertung: 4.8 },
  { name: "Anna Schmidt", stunden: 156, projekte: 10, bewertung: 4.9 },
  { name: "Tom Weber", stunden: 142, projekte: 8, bewertung: 4.6 },
  { name: "Lisa Müller", stunden: 134, projekte: 9, bewertung: 4.7 },
]

export default function BerichtePage() {
  const [zeitraum, setZeitraum] = useState("6monate")
  const [berichtstyp, setBerichtstyp] = useState("uebersicht")

  const gesamtUmsatz = umsatzData.reduce((sum, item) => sum + item.umsatz, 0)
  const gesamtKosten = umsatzData.reduce((sum, item) => sum + item.kosten, 0)
  const gewinn = gesamtUmsatz - gesamtKosten
  const gewinnMarge = ((gewinn / gesamtUmsatz) * 100).toFixed(1)

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-balance">Berichte & Analytics</h2>
              <p className="text-muted-foreground">Detaillierte Einblicke in Ihr Geschäft</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Bericht erstellen
              </Button>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section>
          <Card className="rounded-2xl border-0 shadow-sm bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Filter className="h-5 w-5 text-primary" />
                Berichtsfilter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <Select value={zeitraum} onValueChange={setZeitraum}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Zeitraum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1monat">Letzter Monat</SelectItem>
                    <SelectItem value="3monate">Letzte 3 Monate</SelectItem>
                    <SelectItem value="6monate">Letzte 6 Monate</SelectItem>
                    <SelectItem value="1jahr">Letztes Jahr</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={berichtstyp} onValueChange={setBerichtstyp}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Berichtstyp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uebersicht">Übersicht</SelectItem>
                    <SelectItem value="finanzen">Finanzen</SelectItem>
                    <SelectItem value="projekte">Projekte</SelectItem>
                    <SelectItem value="mitarbeiter">Mitarbeiter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* KPI Cards */}
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gesamtumsatz</p>
                    <p className="text-3xl font-bold text-foreground">{gesamtUmsatz.toLocaleString("de-DE")}€</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Euro className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gewinn</p>
                    <p className="text-3xl font-bold text-foreground">{gewinn.toLocaleString("de-DE")}€</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">{gewinnMarge}% Marge</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Aktive Projekte</p>
                    <p className="text-3xl font-bold text-foreground">24</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-red-600" />
                      <span className="text-xs text-red-600">-2 diese Woche</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Arbeitsstunden</p>
                    <p className="text-3xl font-bold text-foreground">1.248</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600">Diesen Monat</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Umsatz Chart */}
          <Card className="rounded-2xl border-0 shadow-sm bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <BarChart3 className="h-5 w-5 text-primary" />
                Umsatz & Kosten Entwicklung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={umsatzData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monat" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString("de-DE")}€`, ""]} />
                  <Bar dataKey="umsatz" fill="#6366f1" name="Umsatz" />
                  <Bar dataKey="kosten" fill="#ef4444" name="Kosten" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Projekt Status */}
          <Card className="rounded-2xl border-0 shadow-sm bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="h-5 w-5 text-primary" />
                Projekt Status Verteilung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projektData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {projektData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Mitarbeiter Leistung */}
        <section>
          <Card className="rounded-2xl border-0 shadow-sm bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Users className="h-5 w-5 text-primary" />
                Mitarbeiter Leistung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mitarbeiterLeistung.map((ma, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl border bg-background">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{ma.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{ma.stunden}h gearbeitet</span>
                          <span>{ma.projekte} Projekte</span>
                          <div className="flex items-center gap-1">
                            <span>Bewertung: {ma.bewertung}</span>
                            <Badge className="bg-green-100 text-green-800 border-green-200">Sehr gut</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {((ma.stunden / 168) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Auslastung</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  )
}

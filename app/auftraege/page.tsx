"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Calendar, MapPin, Users, Euro, Clock, FileText, Settings, Zap } from "lucide-react"
import { auftraege, formatCurrency, formatDate, getKundeById } from "@/lib/seed-data"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const statusColors = {
  Neu: "bg-blue-100 text-blue-800 border-blue-200",
  Angebot: "bg-purple-100 text-purple-800 border-purple-200",
  Geplant: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Arbeit": "bg-orange-100 text-orange-800 border-orange-200",
  Abnahme: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Abgerechnet: "bg-green-100 text-green-800 border-green-200",
}

const priorityColors = {
  Low: "bg-gray-100 text-gray-600 border-gray-200",
  Med: "bg-yellow-100 text-yellow-700 border-yellow-200",
  High: "bg-red-100 text-red-700 border-red-200",
}

const statusIcons = {
  Neu: Plus,
  Angebot: FileText,
  Geplant: Calendar,
  "In Arbeit": Settings,
  Abnahme: Clock,
  Abgerechnet: Euro,
}

export default function AuftraegePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("alle")
  const [priorityFilter, setPriorityFilter] = useState<string>("alle")

  const filteredAuftraege = auftraege.filter((auftrag) => {
    const matchesSearch =
      auftrag.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auftrag.ort.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getKundeById(auftrag.kundeId)?.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "alle" || auftrag.status === statusFilter
    const matchesPriority = priorityFilter === "alle" || auftrag.prioritaet === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusStats = () => {
    const stats = auftraege.reduce(
      (acc, auftrag) => {
        acc[auftrag.status] = (acc[auftrag.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      gesamt: auftraege.length,
      neu: stats["Neu"] || 0,
      geplant: stats["Geplant"] || 0,
      inArbeit: stats["In Arbeit"] || 0,
      abnahme: stats["Abnahme"] || 0,
    }
  }

  const stats = getStatusStats()

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Aufträge</h1>
            <p className="text-muted-foreground mt-2">Verwalten Sie alle Ihre Aufträge und Projekte</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Neuer Auftrag
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gesamt</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gesamt}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Neu</CardTitle>
              <Plus className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.neu}</div>
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
              <Settings className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.inArbeit}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Abnahme</CardTitle>
              <Euro className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.abnahme}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Suchen nach Titel, Ort oder Kunde..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle Status</SelectItem>
                  <SelectItem value="Neu">Neu</SelectItem>
                  <SelectItem value="Angebot">Angebot</SelectItem>
                  <SelectItem value="Geplant">Geplant</SelectItem>
                  <SelectItem value="In Arbeit">In Arbeit</SelectItem>
                  <SelectItem value="Abnahme">Abnahme</SelectItem>
                  <SelectItem value="Abgerechnet">Abgerechnet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Priorität filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle Prioritäten</SelectItem>
                  <SelectItem value="Low">Niedrig</SelectItem>
                  <SelectItem value="Med">Mittel</SelectItem>
                  <SelectItem value="High">Hoch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Filter className="h-5 w-5 text-primary" />
              Aufträge ({filteredAuftraege.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/50">
                    <TableHead className="font-semibold text-foreground">Auftrag</TableHead>
                    <TableHead className="font-semibold text-foreground">Kunde</TableHead>
                    <TableHead className="font-semibold text-foreground">Ort</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Priorität</TableHead>
                    <TableHead className="font-semibold text-foreground">Verantwortlich</TableHead>
                    <TableHead className="font-semibold text-foreground">Start</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Betrag</TableHead>
                    <TableHead className="font-semibold text-foreground">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuftraege.map((auftrag) => {
                    const kunde = getKundeById(auftrag.kundeId)
                    const StatusIcon = statusIcons[auftrag.status]
                    return (
                      <TableRow key={auftrag.id} className="hover:bg-muted/30 border-b border-border/30">
                        <TableCell className="py-4">
                          <div>
                            <p className="font-medium text-foreground">{auftrag.titel}</p>
                            <p className="text-sm text-muted-foreground">{auftrag.id}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div>
                            <p className="font-medium text-foreground">{kunde?.name}</p>
                            <p className="text-sm text-muted-foreground">{kunde?.kontakt}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{auftrag.ort}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`${statusColors[auftrag.status]} border gap-1.5`}>
                            <StatusIcon className="h-3 w-3" />
                            {auftrag.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          {auftrag.prioritaet && (
                            <Badge className={`${priorityColors[auftrag.prioritaet]} border gap-1.5`}>
                              <Zap className="h-3 w-3" />
                              {auftrag.prioritaet === "Low"
                                ? "Niedrig"
                                : auftrag.prioritaet === "Med"
                                  ? "Mittel"
                                  : "Hoch"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{auftrag.verantwortliche.join(", ")}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{formatDate(auftrag.start)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-right font-semibold text-foreground">
                          {formatCurrency(auftrag.betrag)}
                        </TableCell>
                        <TableCell className="py-4">
                          <Button variant="outline" size="sm" className="border-0 bg-muted/50 hover:bg-muted">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

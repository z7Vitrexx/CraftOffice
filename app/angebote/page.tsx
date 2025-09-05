"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Calendar, Euro, TrendingUp, FileText, Send, CheckCircle, XCircle } from "lucide-react"
import { angebote, formatCurrency, formatDate, getKundeById } from "@/lib/seed-data"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const statusColors = {
  Entwurf: "bg-gray-100 text-gray-800 border-gray-200",
  Gesendet: "bg-blue-100 text-blue-800 border-blue-200",
  Akzeptiert: "bg-green-100 text-green-800 border-green-200",
  Abgelehnt: "bg-red-100 text-red-800 border-red-200",
}

const statusIcons = {
  Entwurf: FileText,
  Gesendet: Send,
  Akzeptiert: CheckCircle,
  Abgelehnt: XCircle,
}

export default function AngebotePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("alle")

  const filteredAngebote = angebote.filter((angebot) => {
    const kunde = getKundeById(angebot.kundeId)
    const matchesSearch =
      angebot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kunde?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kunde?.kontakt?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "alle" || angebot.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusStats = () => {
    const stats = angebote.reduce(
      (acc, angebot) => {
        acc[angebot.status] = (acc[angebot.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const gesamtWert = angebote.reduce((sum, angebot) => sum + angebot.betrag, 0)
    const offeneWert = angebote.filter((a) => a.status === "Gesendet").reduce((sum, angebot) => sum + angebot.betrag, 0)

    return {
      gesamt: angebote.length,
      entwurf: stats["Entwurf"] || 0,
      gesendet: stats["Gesendet"] || 0,
      akzeptiert: stats["Akzeptiert"] || 0,
      abgelehnt: stats["Abgelehnt"] || 0,
      gesamtWert,
      offeneWert,
    }
  }

  const stats = getStatusStats()

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Angebote</h1>
            <p className="text-muted-foreground mt-2">Verwalten Sie alle Ihre Angebote und Kostenvoranschläge</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Neues Angebot
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gesamt</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stats.gesamt}</p>
                </div>
                <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Entwürfe</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stats.entwurf}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gesendet</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{stats.gesendet}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Send className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Akzeptiert</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.akzeptiert}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gesamtwert</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(stats.gesamtWert)}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Euro className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Offener Wert</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{formatCurrency(stats.offeneWert)}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Suchen nach Angebots-ID oder Kunde..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-0 bg-muted/50"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-0 bg-muted/50">
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle Status</SelectItem>
                  <SelectItem value="Entwurf">Entwurf</SelectItem>
                  <SelectItem value="Gesendet">Gesendet</SelectItem>
                  <SelectItem value="Akzeptiert">Akzeptiert</SelectItem>
                  <SelectItem value="Abgelehnt">Abgelehnt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Filter className="h-5 w-5 text-primary" />
              Angebote ({filteredAngebote.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/50">
                    <TableHead className="font-semibold text-foreground">Angebot</TableHead>
                    <TableHead className="font-semibold text-foreground">Kunde</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Wahrscheinlichkeit</TableHead>
                    <TableHead className="font-semibold text-foreground">Erstellt</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Betrag</TableHead>
                    <TableHead className="font-semibold text-foreground">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAngebote.map((angebot) => {
                    const kunde = getKundeById(angebot.kundeId)
                    const StatusIcon = statusIcons[angebot.status]
                    return (
                      <TableRow key={angebot.id} className="hover:bg-muted/30 border-b border-border/30">
                        <TableCell className="py-4">
                          <div>
                            <p className="font-medium text-foreground">{angebot.id}</p>
                            <p className="text-sm text-muted-foreground">Angebot</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div>
                            <p className="font-medium text-foreground">{kunde?.name}</p>
                            <p className="text-sm text-muted-foreground">{kunde?.kontakt}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`${statusColors[angebot.status]} border gap-1.5`}>
                            <StatusIcon className="h-3 w-3" />
                            {angebot.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${angebot.wahrscheinlichkeit}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground">{angebot.wahrscheinlichkeit}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{formatDate(angebot.erstelltAm)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-right font-semibold text-foreground">
                          {formatCurrency(angebot.betrag)}
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

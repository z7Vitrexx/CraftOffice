"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Plus,
  Download,
  Send,
  Eye,
  Edit,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { rechnungen } from "@/lib/seed-data"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function RechnungenPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("alle")
  const [selectedTab, setSelectedTab] = useState("alle")

  // Filter rechnungen based on search and status
  const filteredRechnungen = rechnungen.filter((rechnung) => {
    const matchesSearch =
      (rechnung.kunde?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (rechnung.rechnungsnummer?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    if (selectedTab === "alle") {
      return matchesSearch && (statusFilter === "alle" || rechnung.status === statusFilter)
    }

    const tabFilter =
      selectedTab === "offen"
        ? ["entwurf", "versendet", "ueberfaellig"]
        : selectedTab === "bezahlt"
          ? ["bezahlt"]
          : selectedTab === "ueberfaellig"
            ? ["ueberfaellig"]
            : [selectedTab]

    return (
      matchesSearch &&
      tabFilter.includes(rechnung.status) &&
      (statusFilter === "alle" || rechnung.status === statusFilter)
    )
  })

  // Calculate summary stats
  const stats = {
    gesamt: rechnungen.length,
    offen: rechnungen.filter((r) => ["entwurf", "versendet", "ueberfaellig"].includes(r.status)).length,
    bezahlt: rechnungen.filter((r) => r.status === "bezahlt").length,
    ueberfaellig: rechnungen.filter((r) => r.status === "ueberfaellig").length,
    gesamtbetrag: rechnungen.reduce((sum, r) => sum + r.betrag, 0),
    offenerBetrag: rechnungen
      .filter((r) => ["entwurf", "versendet", "ueberfaellig"].includes(r.status))
      .reduce((sum, r) => sum + r.betrag, 0),
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      entwurf: { variant: "secondary" as const, icon: FileText, text: "Entwurf" },
      versendet: { variant: "default" as const, icon: Send, text: "Versendet" },
      bezahlt: {
        variant: "default" as const,
        icon: CheckCircle,
        text: "Bezahlt",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      },
      ueberfaellig: { variant: "destructive" as const, icon: AlertTriangle, text: "Überfällig" },
    }

    const config = variants[status as keyof typeof variants]
    if (!config) return null

    const Icon = config.icon
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("de-DE")
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Rechnungen</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Rechnungen und verfolgen Sie Zahlungseingänge</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Neue Rechnung
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamt Rechnungen</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gesamt}</div>
              <p className="text-xs text-muted-foreground">{formatCurrency(stats.gesamtbetrag)} Gesamtvolumen</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offene Rechnungen</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.offen}</div>
              <p className="text-xs text-muted-foreground">{formatCurrency(stats.offenerBetrag)} ausstehend</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bezahlte Rechnungen</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.bezahlt}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.bezahlt / stats.gesamt) * 100).toFixed(1)}% Zahlungsquote
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Überfällige Rechnungen</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.ueberfaellig}</div>
              <p className="text-xs text-muted-foreground">Sofortige Aufmerksamkeit erforderlich</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Rechnungsübersicht</CardTitle>
                <CardDescription>Alle Rechnungen mit Status und Zahlungsinformationen</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="alle">Alle ({stats.gesamt})</TabsTrigger>
                  <TabsTrigger value="offen">Offen ({stats.offen})</TabsTrigger>
                  <TabsTrigger value="bezahlt">Bezahlt ({stats.bezahlt})</TabsTrigger>
                  <TabsTrigger value="ueberfaellig">Überfällig ({stats.ueberfaellig})</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Suche nach Kunde oder Rechnungsnummer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-80"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alle">Alle Status</SelectItem>
                      <SelectItem value="entwurf">Entwurf</SelectItem>
                      <SelectItem value="versendet">Versendet</SelectItem>
                      <SelectItem value="bezahlt">Bezahlt</SelectItem>
                      <SelectItem value="ueberfaellig">Überfällig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value={selectedTab} className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rechnungsnummer</TableHead>
                        <TableHead>Kunde</TableHead>
                        <TableHead>Rechnungsdatum</TableHead>
                        <TableHead>Fälligkeitsdatum</TableHead>
                        <TableHead>Betrag</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRechnungen.map((rechnung) => (
                        <TableRow key={rechnung.id}>
                          <TableCell className="font-medium">{rechnung.rechnungsnummer}</TableCell>
                          <TableCell>{rechnung.kunde}</TableCell>
                          <TableCell>{formatDate(rechnung.rechnungsdatum)}</TableCell>
                          <TableCell>{formatDate(rechnung.faelligkeitsdatum)}</TableCell>
                          <TableCell className="font-medium">{formatCurrency(rechnung.betrag)}</TableCell>
                          <TableCell>{getStatusBadge(rechnung.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Anzeigen
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Bearbeiten
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="w-4 h-4 mr-2" />
                                  Versenden
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  PDF Download
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

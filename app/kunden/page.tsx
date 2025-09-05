"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Users,
  UserPlus,
  Building,
  Phone,
  Mail,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { kunden } from "@/lib/seed-data"

export default function KundenPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("alle")
  const [typeFilter, setTypeFilter] = useState("alle")

  const filteredKunden = kunden.filter((kunde) => {
    const matchesSearch =
      kunde.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kunde.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kunde.telefon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kunde.adresse?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "alle" || kunde.status === statusFilter
    const matchesType = typeFilter === "alle" || kunde.typ === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktiv":
        return "bg-green-100 text-green-800 border-green-200"
      case "inaktiv":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "interessent":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (typ: string) => {
    switch (typ) {
      case "privat":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "gewerbe":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const totalKunden = kunden.length
  const activeKunden = kunden.filter((k) => k.status === "aktiv").length
  const newKunden = kunden.filter((k) => k.status === "interessent").length
  const gewerbeKunden = kunden.filter((k) => k.typ === "gewerbe").length

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Kunden</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Kunden und Kontakte</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Neuer Kunde
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gesamt Kunden</p>
                  <p className="text-3xl font-bold text-foreground">{totalKunden}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aktive Kunden</p>
                  <p className="text-3xl font-bold text-foreground">{activeKunden}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Neue Interessenten</p>
                  <p className="text-3xl font-bold text-foreground">{newKunden}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gewerbekunden</p>
                  <p className="text-3xl font-bold text-foreground">{gewerbeKunden}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Building className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Search className="h-5 w-5 text-primary" />
              Filter & Suche
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <Input
                  placeholder="Suche nach Name, E-Mail, Telefon oder Adresse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle Status</SelectItem>
                  <SelectItem value="aktiv">Aktiv</SelectItem>
                  <SelectItem value="inaktiv">Inaktiv</SelectItem>
                  <SelectItem value="interessent">Interessent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Kundentyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle Typen</SelectItem>
                  <SelectItem value="privat">Privatkunde</SelectItem>
                  <SelectItem value="gewerbe">Gewerbekunde</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Kunden Liste */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5 text-primary" />
              Kundenliste ({filteredKunden.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredKunden.map((kunde) => (
                <div
                  key={kunde.id}
                  className="flex items-center justify-between p-4 rounded-2xl border bg-background hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{kunde.name}</h3>
                        <Badge className={getStatusColor(kunde.status)}>{kunde.status}</Badge>
                        <Badge className={getTypeColor(kunde.typ)}>{kunde.typ}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {kunde.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {kunde.telefon}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {kunde.adresse}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Anzeigen
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Bearbeiten
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Löschen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

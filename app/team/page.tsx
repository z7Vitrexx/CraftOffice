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
  UserCheck,
  Clock,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Award,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mitarbeiter } from "@/lib/seed-data"

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("alle")
  const [positionFilter, setPositionFilter] = useState("alle")

  const filteredMitarbeiter = mitarbeiter.filter((ma) => {
    const matchesSearch =
      ma.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ma.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ma.position?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "alle" || ma.status === statusFilter
    const matchesPosition = positionFilter === "alle" || ma.position === positionFilter

    return matchesSearch && matchesStatus && matchesPosition
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktiv":
        return "bg-green-100 text-green-800 border-green-200"
      case "urlaub":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "krank":
        return "bg-red-100 text-red-800 border-red-200"
      case "inaktiv":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Geschäftsführer":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Elektriker":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Heizungsbauer":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Maler":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Dachdecker":
        return "bg-green-100 text-green-800 border-green-200"
      case "Bürokraft":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const totalMitarbeiter = mitarbeiter.length
  const activeMitarbeiter = mitarbeiter.filter((ma) => ma.status === "aktiv").length
  const urlaubMitarbeiter = mitarbeiter.filter((ma) => ma.status === "urlaub").length
  const krankMitarbeiter = mitarbeiter.filter((ma) => ma.status === "krank").length

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-balance">Team & Personal</h2>
              <p className="text-muted-foreground">Verwalten Sie Ihr Team und Mitarbeiter</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Neuer Mitarbeiter
            </Button>
          </div>
        </section>

        {/* KPI Cards */}
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gesamt Team</p>
                    <p className="text-3xl font-bold text-foreground">{totalMitarbeiter}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Aktiv</p>
                    <p className="text-3xl font-bold text-foreground">{activeMitarbeiter}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Im Urlaub</p>
                    <p className="text-3xl font-bold text-foreground">{urlaubMitarbeiter}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Krank</p>
                    <p className="text-3xl font-bold text-foreground">{krankMitarbeiter}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filters */}
        <section>
          <Card className="rounded-2xl border-0 shadow-sm bg-card">
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
                    placeholder="Suche nach Name, E-Mail oder Position..."
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
                    <SelectItem value="urlaub">Im Urlaub</SelectItem>
                    <SelectItem value="krank">Krank</SelectItem>
                    <SelectItem value="inaktiv">Inaktiv</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Positionen</SelectItem>
                    <SelectItem value="Geschäftsführer">Geschäftsführer</SelectItem>
                    <SelectItem value="Elektriker">Elektriker</SelectItem>
                    <SelectItem value="Heizungsbauer">Heizungsbauer</SelectItem>
                    <SelectItem value="Maler">Maler</SelectItem>
                    <SelectItem value="Dachdecker">Dachdecker</SelectItem>
                    <SelectItem value="Bürokraft">Bürokraft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Liste */}
        <section>
          <Card className="rounded-2xl border-0 shadow-sm bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Users className="h-5 w-5 text-primary" />
                Mitarbeiterliste ({filteredMitarbeiter.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMitarbeiter.map((ma) => (
                  <div
                    key={ma.id}
                    className="flex items-center justify-between p-4 rounded-2xl border bg-background hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{ma.name}</h3>
                          <Badge className={getStatusColor(ma.status)}>{ma.status}</Badge>
                          <Badge className={getPositionColor(ma.position)}>{ma.position}</Badge>
                          {ma.erfahrung && ma.erfahrung >= 5 && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              <Award className="h-3 w-3 mr-1" />
                              Erfahren
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {ma.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {ma.telefon}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ma.erfahrung} Jahre Erfahrung
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
                          Profil anzeigen
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Urlaub planen
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Entfernen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

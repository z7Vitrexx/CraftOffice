"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, TrendingDown, Plus, Filter, ShoppingCart, Boxes, BarChart3 } from "lucide-react"
import { materialien, formatCurrency } from "@/lib/seed-data"

export default function LagerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Alle")

  // Calculate KPIs
  const gesamtArtikel = materialien.length
  const niedrigerBestand = materialien.filter((m) => m.bestand <= m.mindest).length
  const kritischerBestand = materialien.filter((m) => m.bestand < m.mindest * 0.5).length
  const gesamtWert = materialien.reduce((sum, m) => sum + m.bestand * 25, 0) // Estimated value

  // Filter materials
  const filteredMaterialien = materialien.filter((material) => {
    const matchesSearch =
      material.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.id?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      selectedStatus === "Alle" ||
      (selectedStatus === "Niedrig" && material.bestand <= material.mindest) ||
      (selectedStatus === "Kritisch" && material.bestand < material.mindest * 0.5) ||
      (selectedStatus === "Normal" && material.bestand > material.mindest)

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (material: (typeof materialien)[0]) => {
    if (material.bestand < material.mindest * 0.5) {
      return <Badge variant="destructive">Kritisch</Badge>
    } else if (material.bestand <= material.mindest) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Niedrig
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Normal
        </Badge>
      )
    }
  }

  const getProgressWidth = (bestand: number, mindest: number) => {
    const percentage = Math.min((bestand / (mindest * 1.5)) * 100, 100)
    return `${percentage}%`
  }

  const getProgressColor = (bestand: number, mindest: number) => {
    if (bestand < mindest * 0.5) return "bg-red-500"
    if (bestand <= mindest) return "bg-orange-500"
    return "bg-green-500"
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Lager & Material</h1>
            <p className="text-muted-foreground mt-1">Materialbestand verwalten und überwachen</p>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Material hinzufügen
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              Bestellung erstellen
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gesamt Artikel</p>
                  <p className="text-2xl font-bold">{gesamtArtikel}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Boxes className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Niedriger Bestand</p>
                  <p className="text-2xl font-bold">{niedrigerBestand}</p>
                </div>
                <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Kritischer Bestand</p>
                  <p className="text-2xl font-bold">{kritischerBestand}</p>
                </div>
                <div className="h-12 w-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lagerwert (geschätzt)</p>
                  <p className="text-2xl font-bold">{formatCurrency(gesamtWert)}</p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Filter className="h-5 w-5 text-primary" />
              Materialien verwalten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Nach Material oder Artikel-Nr. suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="Alle">Alle Status</option>
                <option value="Normal">Normal</option>
                <option value="Niedrig">Niedrig</option>
                <option value="Kritisch">Kritisch</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterialien.map((material) => (
            <Card key={material.id} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">{material.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{material.id}</p>
                    </div>
                    {getStatusBadge(material)}
                  </div>

                  {/* Stock Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bestand</span>
                      <span className="font-semibold">
                        {material.bestand} {material.einheit}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Mindestbestand</span>
                      <span className="text-sm">
                        {material.mindest} {material.einheit}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(material.bestand, material.mindest)}`}
                          style={{ width: getProgressWidth(material.bestand, material.mindest) }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>
                          {material.mindest * 1.5} {material.einheit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Bearbeiten
                    </Button>
                    {material.bestand <= material.mindest && (
                      <Button size="sm" className="flex-1 gap-1">
                        <ShoppingCart className="h-3 w-3" />
                        Bestellen
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5 text-primary" />
              Schnellaktionen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <span className="font-medium">Kritische Bestände</span>
                <span className="text-sm text-muted-foreground">{kritischerBestand} Artikel sofort bestellen</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                <span className="font-medium">Sammelbestellung</span>
                <span className="text-sm text-muted-foreground">Alle niedrigen Bestände bestellen</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <span className="font-medium">Lager-Report</span>
                <span className="text-sm text-muted-foreground">Detaillierte Bestandsanalyse</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

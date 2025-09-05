"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Package, Plus, AlertTriangle, User } from "lucide-react"
import { zeitbuchungen, materialien } from "@/lib/seed-data"

export function ZeiterfassungMaterial() {
  const heuteZeiten = zeitbuchungen.filter((z) => z.start.startsWith("2024-02-14"))

  const fehlendeStempel = heuteZeiten.filter((z) => !z.ende).length
  const materialKnapp = materialien.filter((m) => m.bestand < m.mindest)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Zeiterfassung */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Zeiterfassung Heute
          </CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Zeit buchen
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {fehlendeStempel > 0 && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">{fehlendeStempel} fehlende Ausstempelungen</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {heuteZeiten.slice(0, 4).map((zeit) => (
              <div key={zeit.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{zeit.mitarbeiter}</p>
                    <p className="text-xs text-muted-foreground">{zeit.bemerkung}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(zeit.start).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {zeit.ende &&
                      ` - ${new Date(zeit.ende).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                  </p>
                  <Badge variant={zeit.ende ? "default" : "secondary"}>
                    {zeit.ende ? `${Math.round((zeit.dauerMin || 0) / 60)}h` : "Aktiv"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Material */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Material Status
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            Zum Lager
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {materialKnapp.length > 0 && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  {materialKnapp.length} Artikel unter Mindestbestand
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {materialKnapp.slice(0, 4).map((material) => (
              <div key={material.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{material.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Bestand: {material.bestand} {material.einheit}
                    (Min: {material.mindest} {material.einheit})
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Bestellen
                </Button>
              </div>
            ))}
          </div>

          {materialKnapp.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Alle Materialien ausreichend vorhanden</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

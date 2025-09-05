"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Receipt, Send, AlertTriangle } from "lucide-react"
import { formatCurrency, rechnungen, getKundeById } from "@/lib/seed-data"

const agingBuckets = [
  { label: "0-30 Tage", min: 0, max: 30, color: "default" as const },
  { label: "31-60 Tage", min: 31, max: 60, color: "secondary" as const },
  { label: "61-90 Tage", min: 61, max: 90, color: "destructive" as const },
  { label: ">90 Tage", min: 91, max: Number.POSITIVE_INFINITY, color: "destructive" as const },
]

export function RechnungenAging() {
  const offeneRechnungen = rechnungen.filter((r) => !r.bezahlt)

  const agingData = agingBuckets.map((bucket) => {
    const rechnungenInBucket = offeneRechnungen.filter(
      (r) => r.alterInTagen >= bucket.min && r.alterInTagen <= bucket.max,
    )
    const summe = rechnungenInBucket.reduce((sum, r) => sum + r.betrag, 0)
    return {
      ...bucket,
      count: rechnungenInBucket.length,
      summe,
      rechnungen: rechnungenInBucket.slice(0, 3), // Top 3 für Anzeige
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Rechnungen Aging
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agingData.map((bucket, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={bucket.color}>{bucket.label}</Badge>
                <span className="text-sm text-muted-foreground">{bucket.count} Rechnungen</span>
              </div>
              <span className="font-semibold">{formatCurrency(bucket.summe)}</span>
            </div>

            {bucket.rechnungen.length > 0 && (
              <div className="space-y-1 ml-4">
                {bucket.rechnungen.map((rechnung) => {
                  const kunde = getKundeById(rechnung.kundeId)
                  return (
                    <div key={rechnung.id} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {kunde?.name} - {rechnung.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>{formatCurrency(rechnung.betrag)}</span>
                        {rechnung.alterInTagen > 30 && (
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                            <Send className="h-3 w-3 mr-1" />
                            Mahnung
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Gesamt offen
            </span>
            <span className="font-bold text-lg">
              {formatCurrency(offeneRechnungen.reduce((sum, r) => sum + r.betrag, 0))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

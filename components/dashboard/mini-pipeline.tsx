"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, ArrowRight, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/seed-data"

const topAuftraege = [
  {
    titel: "Hotel Alpenblick Elektrik",
    kunde: "Hotel Alpenblick",
    betrag: 22000,
    fortschritt: 65,
    status: "In Arbeit",
  },
  {
    titel: "Elektroinstallation Büro",
    kunde: "Müller GmbH",
    betrag: 15000,
    fortschritt: 80,
    status: "In Arbeit",
  },
  {
    titel: "Dachgeschoss Ausbau",
    kunde: "Familie Fischer",
    betrag: 15500,
    fortschritt: 20,
    status: "Geplant",
  },
]

export function MiniPipeline() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          Top Aufträge
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          Zur Pipeline
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {topAuftraege.map((auftrag, index) => (
          <div key={index} className="space-y-3 p-3 rounded-lg bg-muted/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{auftrag.titel}</p>
                <p className="text-xs text-muted-foreground">{auftrag.kunde}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{formatCurrency(auftrag.betrag)}</p>
                <Badge variant={auftrag.status === "In Arbeit" ? "default" : "secondary"} className="text-xs">
                  {auftrag.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Fortschritt</span>
                <span>{auftrag.fortschritt}%</span>
              </div>
              <Progress value={auftrag.fortschritt} className="h-2" />
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Gesamt Pipeline</span>
            <span className="font-semibold flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              {formatCurrency(52500)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

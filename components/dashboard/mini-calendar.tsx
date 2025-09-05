"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

const termine = [
  {
    zeit: "09:00",
    titel: "Kundentermin Müller GmbH",
    ort: "München",
    status: "Bestätigt",
  },
  {
    zeit: "11:30",
    titel: "Baustelle Inspektion",
    ort: "Hamburg",
    status: "Ausstehend",
  },
  {
    zeit: "14:00",
    titel: "Material Lieferung",
    ort: "Berlin",
    status: "Bestätigt",
  },
  {
    zeit: "16:30",
    titel: "Abnahme Hotel Alpenblick",
    ort: "Garmisch",
    status: "Ausstehend",
  },
]

export function MiniCalendar() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Heute: Termine
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          Zum Kalender
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {termine.map((termin, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="h-3 w-3" />
                {termin.zeit}
              </div>
              <div>
                <p className="font-medium text-sm">{termin.titel}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {termin.ort}
                </p>
              </div>
            </div>
            <Badge variant={termin.status === "Bestätigt" ? "default" : "secondary"}>{termin.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

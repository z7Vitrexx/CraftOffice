"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Calendar, FileText, AlertTriangle, TrendingUp, Users, Clock, Headphones } from "lucide-react"
import { formatCurrency } from "@/lib/seed-data"

const kpis = [
  {
    title: "Offene Aufträge",
    value: "12",
    trend: "+8%",
    trendPositive: true,
    icon: ClipboardList,
    color: "primary" as const,
  },
  {
    title: "Heute: Termine",
    value: "6",
    subtitle: "3 ausstehend",
    icon: Calendar,
    color: "secondary" as const,
  },
  {
    title: "Offene Angebote",
    value: "5",
    subtitle: "78% Gewinnchance",
    trend: "+12%",
    trendPositive: true,
    icon: FileText,
    color: "primary" as const,
  },
  {
    title: "Überfällige Rechnungen",
    value: formatCurrency(28500),
    subtitle: "8 Rechnungen",
    icon: AlertTriangle,
    color: "destructive" as const,
  },
  {
    title: "Umsatz (Monat)",
    value: formatCurrency(125000),
    subtitle: "Plan: €150.000",
    trend: "+15%",
    trendPositive: true,
    icon: TrendingUp,
    color: "primary" as const,
  },
  {
    title: "Auslastung Team",
    value: "87%",
    trend: "+5%",
    trendPositive: true,
    icon: Users,
    color: "secondary" as const,
  },
  {
    title: "Ø Durchlaufzeit",
    value: "12 Tage",
    trend: "-2 Tage",
    trendPositive: true,
    icon: Clock,
    color: "primary" as const,
  },
  {
    title: "Service-Tickets",
    value: "3",
    subtitle: "2 offen",
    icon: Headphones,
    color: "secondary" as const,
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon
              className={`h-4 w-4 ${
                kpi.color === "primary"
                  ? "text-primary"
                  : kpi.color === "secondary"
                    ? "text-secondary"
                    : kpi.color === "destructive"
                      ? "text-destructive"
                      : "text-muted-foreground"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center justify-between mt-2">
              {kpi.subtitle && <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>}
              {kpi.trend && (
                <Badge variant={kpi.trendPositive ? "default" : "destructive"} className="text-xs">
                  {kpi.trend}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

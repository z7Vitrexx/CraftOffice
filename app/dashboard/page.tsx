import { KPICards } from "@/components/dashboard/kpi-cards"
import { MiniCalendar } from "@/components/dashboard/mini-calendar"
import { MiniPipeline } from "@/components/dashboard/mini-pipeline"
import { RechnungenAging } from "@/components/dashboard/rechnungen-aging"
import { ZeiterfassungMaterial } from "@/components/dashboard/zeiterfassung-material"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* KPI Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-balance">Dashboard Übersicht</h2>
          <KPICards />
        </section>

        {/* Mini Widgets Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MiniCalendar />
          <MiniPipeline />
        </section>

        {/* Rechnungen & Cashflow */}
        <section>
          <RechnungenAging />
        </section>

        {/* Zeiterfassung & Material */}
        <section>
          <ZeiterfassungMaterial />
        </section>
      </div>
    </DashboardLayout>
  )
}

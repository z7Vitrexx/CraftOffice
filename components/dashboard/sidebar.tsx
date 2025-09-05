"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Receipt,
  Users,
  Calendar,
  Clock,
  Package,
  UserCheck,
  BarChart3,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Aufträge", href: "/auftraege", icon: ClipboardList, badge: "12" },
  { name: "Angebote", href: "/angebote", icon: FileText, badge: "5" },
  { name: "Rechnungen", href: "/rechnungen", icon: Receipt, badge: "8" },
  { name: "Kunden", href: "/kunden", icon: Users },
  { name: "Kalender", href: "/kalender", icon: Calendar },
  { name: "Zeiterfassung", href: "/zeiterfassung", icon: Clock },
  { name: "Lager/Material", href: "/lager", icon: Package, badge: "3" },
  { name: "Team/Personal", href: "/team", icon: UserCheck },
  { name: "Berichte", href: "/berichte", icon: BarChart3 },
  { name: "Einstellungen", href: "/einstellungen", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

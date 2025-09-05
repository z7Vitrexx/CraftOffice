"use client"

import { Search, Plus, Bell, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section - Workspace switcher and search */}
        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-lg font-semibold">
                <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  HB
                </div>
                Handwerksbetrieb GmbH
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Handwerksbetrieb GmbH</DropdownMenuItem>
              <DropdownMenuItem>Elektro Müller</DropdownMenuItem>
              <DropdownMenuItem>SHK Weber</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Suchen... (Strg+K)" className="w-80 pl-10" />
          </div>
        </div>

        {/* Right section - Actions and user */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Neu
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>+ Angebot</DropdownMenuItem>
              <DropdownMenuItem>+ Auftrag</DropdownMenuItem>
              <DropdownMenuItem>+ Rechnung</DropdownMenuItem>
              <DropdownMenuItem>+ Kunde</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Diese Woche
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
          </Button>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

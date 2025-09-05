"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, User, Building, Bell, Shield, Database, Save, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EinstellungenPage() {
  const [activeTab, setActiveTab] = useState("unternehmen")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    desktop: true,
  })

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-balance">Einstellungen</h2>
              <p className="text-muted-foreground">Verwalten Sie Ihre Konto- und Anwendungseinstellungen</p>
            </div>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Änderungen speichern
            </Button>
          </div>
        </section>

        {/* Settings Tabs */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="unternehmen">Unternehmen</TabsTrigger>
              <TabsTrigger value="profil">Profil</TabsTrigger>
              <TabsTrigger value="benachrichtigungen">Benachrichtigungen</TabsTrigger>
              <TabsTrigger value="sicherheit">Sicherheit</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            {/* Unternehmen Tab */}
            <TabsContent value="unternehmen" className="space-y-6">
              <Card className="rounded-2xl border-0 shadow-sm bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Building className="h-5 w-5 text-primary" />
                    Unternehmensinformationen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Firmenname</Label>
                      <Input id="company-name" defaultValue="Mustermann Handwerk GmbH" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-type">Unternehmenstyp</Label>
                      <Select defaultValue="handwerk">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="handwerk">Handwerksbetrieb</SelectItem>
                          <SelectItem value="dienstleistung">Dienstleistung</SelectItem>
                          <SelectItem value="handel">Handel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-number">Steuernummer</Label>
                      <Input id="tax-number" defaultValue="123/456/78901" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vat-id">USt-IdNr.</Label>
                      <Input id="vat-id" defaultValue="DE123456789" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Firmenadresse</Label>
                    <Textarea
                      id="company-address"
                      defaultValue="Musterstraße 123&#10;12345 Musterstadt&#10;Deutschland"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Telefon</Label>
                      <Input id="company-phone" defaultValue="+49 123 456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">E-Mail</Label>
                      <Input id="company-email" defaultValue="info@mustermann-handwerk.de" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profil Tab */}
            <TabsContent value="profil" className="space-y-6">
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5 text-primary" />
                    Persönliche Informationen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Upload className="h-4 w-4" />
                        Foto hochladen
                      </Button>
                      <p className="text-sm text-muted-foreground">JPG, PNG bis 2MB</p>
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Vorname</Label>
                      <Input id="first-name" defaultValue="Max" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Nachname</Label>
                      <Input id="last-name" defaultValue="Mustermann" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" defaultValue="max.mustermann@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" defaultValue="+49 123 456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" defaultValue="Geschäftsführer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Sprache</Label>
                      <Select defaultValue="de">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Benachrichtigungen Tab */}
            <TabsContent value="benachrichtigungen" className="space-y-6">
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Bell className="h-5 w-5 text-primary" />
                    Benachrichtigungseinstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>E-Mail Benachrichtigungen</Label>
                        <p className="text-sm text-muted-foreground">Erhalten Sie Updates per E-Mail</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Push Benachrichtigungen</Label>
                        <p className="text-sm text-muted-foreground">Browser-Benachrichtigungen aktivieren</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>SMS Benachrichtigungen</Label>
                        <p className="text-sm text-muted-foreground">Wichtige Updates per SMS</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Desktop Benachrichtigungen</Label>
                        <p className="text-sm text-muted-foreground">Systembenachrichtigungen anzeigen</p>
                      </div>
                      <Switch
                        checked={notifications.desktop}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, desktop: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sicherheit Tab */}
            <TabsContent value="sicherheit" className="space-y-6">
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Shield className="h-5 w-5 text-primary" />
                    Sicherheitseinstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Aktuelles Passwort</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Neues Passwort</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="w-full md:w-auto">Passwort ändern</Button>
                  </div>
                  <hr />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Zwei-Faktor-Authentifizierung</Label>
                        <p className="text-sm text-muted-foreground">Zusätzliche Sicherheit für Ihr Konto</p>
                      </div>
                      <Button variant="outline">Aktivieren</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Aktive Sitzungen</Label>
                        <p className="text-sm text-muted-foreground">Verwalten Sie Ihre aktiven Anmeldungen</p>
                      </div>
                      <Button variant="outline">Anzeigen</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <Card className="border-0 shadow-sm bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Settings className="h-5 w-5 text-primary" />
                    Systemeinstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zeitzone</Label>
                      <Select defaultValue="europe/berlin">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe/berlin">Europa/Berlin</SelectItem>
                          <SelectItem value="europe/london">Europa/London</SelectItem>
                          <SelectItem value="america/new_york">Amerika/New York</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Währung</Label>
                      <Select defaultValue="eur">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="gbp">Britisches Pfund (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Datumsformat</Label>
                      <Select defaultValue="dd.mm.yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd.mm.yyyy">DD.MM.YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Design</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Hell</SelectItem>
                          <SelectItem value="dark">Dunkel</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <hr />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Daten exportieren</Label>
                        <p className="text-sm text-muted-foreground">Laden Sie Ihre Daten herunter</p>
                      </div>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Database className="h-4 w-4" />
                        Export starten
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Konto löschen</Label>
                        <p className="text-sm text-muted-foreground">Permanent alle Daten entfernen</p>
                      </div>
                      <Button variant="destructive">Konto löschen</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </DashboardLayout>
  )
}

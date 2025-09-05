export type Waehrung = "EUR"

export interface Kunde {
  id: string
  name: string
  kontakt: string
  ort: string
  kategorie?: "Privat" | "Gewerblich"
}

export interface Angebot {
  id: string
  kundeId: string
  betrag: number
  wahrscheinlichkeit: number
  status: "Entwurf" | "Gesendet" | "Akzeptiert" | "Abgelehnt"
  erstelltAm: string
}

export interface Auftrag {
  id: string
  kundeId: string
  titel: string
  ort: string
  betrag: number
  status: "Neu" | "Angebot" | "Geplant" | "In Arbeit" | "Abnahme" | "Abgerechnet"
  start: string
  ende?: string
  verantwortliche: string[]
  prioritaet?: "Low" | "Med" | "High"
}

export interface Rechnung {
  id: string
  kundeId: string
  betrag: number
  faelligAm: string
  bezahlt: boolean
  alterInTagen: number
}

export interface Zeitbuchung {
  id: string
  mitarbeiter: string
  auftragId?: string
  start: string
  ende?: string
  dauerMin?: number
  bemerkung?: string
}

export interface Material {
  id: string
  name: string
  bestand: number
  mindest: number
  einheit: string
}

export interface Termin {
  id: string
  kundeId: string
  titel: string
  datum: string
  startzeit: string
  endzeit: string
  ort: string
  status: "Geplant" | "In Arbeit" | "Abgeschlossen" | "Verschoben"
  verantwortliche: string[]
}

export interface KPI {
  label: string
  value: string | number
  trend?: number
  icon: string
  color?: "primary" | "success" | "warning" | "destructive"
}

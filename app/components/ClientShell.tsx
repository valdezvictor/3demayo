'use client'

import { LangProvider } from './LangContext'
import { SiteNav } from './SiteNav'

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <SiteNav />
      {children}
    </LangProvider>
  )
}

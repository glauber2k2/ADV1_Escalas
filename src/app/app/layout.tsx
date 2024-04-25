import Header from '@/components/Header'
import { ReactNode } from 'react'

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      {children}
    </div>
  )
}

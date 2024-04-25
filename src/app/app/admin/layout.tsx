import { auth } from '@/services/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function layout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (session?.user?.isAdmin) {
    return children
  } else {
    return redirect('/app')
  }
}

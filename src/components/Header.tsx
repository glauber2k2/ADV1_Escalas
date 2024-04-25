import React from 'react'
import AuthButton from './AuthButton'
import Link from 'next/link'
import { auth } from '@/services/auth'

export default async function Header() {
  const session = await auth()

  return (
    <div className="h-20 px-8 flex items-center border-b border-neutral-300 dark:border-neutral-800 gap-2">
      <Link href={'/'} className="flex items-center gap-2 mr-auto">
        <span className="text-2xl hidden md:block">Escala ADV1</span>
      </Link>

      {session?.user?.isAdmin && (
        <Link href={'/app/admin'} className="text-sm opacity-90">
          Gerar escala
        </Link>
      )}

      <AuthButton />
    </div>
  )
}

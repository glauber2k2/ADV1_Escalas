import React from 'react'
import AuthButton from './AuthButton'
import Link from 'next/link'
import { Church } from 'lucide-react'

export default function Header() {
  return (
    <div className="h-20 px-8 flex items-center border-b border-neutral-300 dark:border-neutral-800 gap-2">
      <Link href={'/'} className="flex items-center gap-2 mr-auto">
        {/* Imagem ou logo */}
        <span className="text-2xl hidden md:block">Escala ADV1</span>
      </Link>
      <Link href={'/'} className="text-sm opacity-90">
        Favoritos
      </Link>
      <AuthButton />
    </div>
  )
}

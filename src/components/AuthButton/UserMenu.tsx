'use client'

import React, { ReactNode } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { LogOut, Terminal, User2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function UserMenu({ children }: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-64 flex flex-col">
        <Button variant={'ghost'} size={'sm'} className="justify-between">
          Minha conta <User2 size={16} />
        </Button>
        <Button
          variant={'ghost'}
          size={'sm'}
          className="justify-between text-red-500"
          onClick={() => signOut()}
        >
          Sair <LogOut size={16} />
        </Button>
      </PopoverContent>
    </Popover>
  )
}

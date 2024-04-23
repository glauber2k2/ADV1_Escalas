import { auth } from '@/services/auth'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import UserMenu from './UserMenu'

export default async function AuthButton() {
  const session = await auth()

  return (
    <UserMenu>
      <Button
        variant={'link'}
        className="flex items-center gap-2 !no-underline"
      >
        <Avatar className="w-7 h-7">
          <AvatarFallback>
            {session?.user?.email?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Button>
    </UserMenu>
  )
}

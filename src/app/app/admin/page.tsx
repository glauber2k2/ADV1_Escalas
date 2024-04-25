import React from 'react'
import EscalaForm from './_components/EscalaForm'
import { Card, CardTitle } from '@/components/ui/card'
import { BarChartHorizontalBig } from 'lucide-react'
import { getUsers } from '../_components/actions'

export default async function page() {
  const users = await getUsers()

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-1/3 p-8 space-y-4">
        <CardTitle className="flex gap-2 items-center">
          <BarChartHorizontalBig /> Gerar escala do mês
        </CardTitle>
        <EscalaForm users={users} />
      </Card>
    </div>
  )
}

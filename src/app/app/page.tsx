import React from 'react'
import { getUserEscalas } from './_components/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { stringToColor } from '@/lib/utils'

export default async function page() {
  const escalas = await getUserEscalas()
  const today = new Date()

  function findNextSchedule() {
    const today = new Date()
    today.setHours(23, 59, 59, 999)

    const nextSchedule = escalas.find((schedule) => {
      const scheduleDate = new Date(schedule.data)
      return scheduleDate > today
    })

    return nextSchedule
  }

  function findTodaysSchedule() {
    const todayFormatted = today.toISOString().slice(0, 10)

    const todaysSchedule = escalas.find((schedule) => {
      const scheduleDateFormatted = schedule.data.toISOString().slice(0, 10)
      return scheduleDateFormatted === todayFormatted
    })

    if (!todaysSchedule) {
      return findNextSchedule()
    }

    return todaysSchedule
  }

  const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR })
  const todaysSchedule = findTodaysSchedule()
  const isToday =
    todaysSchedule &&
    todaysSchedule.data.toISOString().slice(0, 10) ===
      today.toISOString().slice(0, 10)
  const nextSchedule = findNextSchedule()

  return (
    <div className="flex h-full flex-col">
      <div className="h-full flex justify-center items-center">
        <Card className="p-8 w-1/3">
          <CardTitle>{formattedDate}</CardTitle>
          <CardDescription>
            {todaysSchedule
              ? isToday
                ? 'Você está escalado hoje.'
                : `Sua próxima escala é ${format(todaysSchedule.data, "EEEE, d 'de' MMMM", { locale: ptBR })}`
              : 'Você não foi escalado hoje.'}
          </CardDescription>

          <CardContent className="mt-4 p-0">
            {todaysSchedule &&
              todaysSchedule.data.toISOString().slice(0, 10) ===
                today.toISOString().slice(0, 10) && (
                <div className="flex flex-col border p-4 rounded-lg text-sm text-muted-foreground">
                  Você foi escalado em
                  <span
                    style={{
                      color: todaysSchedule.funcao
                        ? stringToColor(todaysSchedule.funcao)
                        : 'white',
                    }}
                    className={`text-xl mt-2 font-medium capitalize`}
                  >
                    {todaysSchedule.funcao}
                  </span>
                </div>
              )}

            <CardDescription className="flex mt-4 justify-end">
              Próxima escala:{' '}
              {nextSchedule
                ? format(nextSchedule.data, "EEEE, d 'de' MMMM", {
                    locale: ptBR,
                  })
                : 'Não há próxima escala'}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

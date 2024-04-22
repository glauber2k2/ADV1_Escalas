import React from 'react';
import { getUserEscalas } from './_components/actions';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function page() {
  const escalas = await getUserEscalas();
  const today = new Date();

  function findNextSchedule() {
  const nextSchedule = escalas.find(schedule => {
    return schedule.data > today;
  });

  return nextSchedule;
}

  function findTodaysSchedule() {
    const todayFormatted = today.toISOString().slice(0, 10);

    const todaysSchedule = escalas.find(schedule => {
      const scheduleDateFormatted = schedule.data.toISOString().slice(0, 10);
      return scheduleDateFormatted === todayFormatted;
    });

    if (!todaysSchedule) {
      return findNextSchedule();
    }

    return todaysSchedule;
  }

  const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: ptBR });
  const todaysSchedule = findTodaysSchedule();
  const isToday = todaysSchedule && todaysSchedule.data.toISOString().slice(0, 10) === today.toISOString().slice(0, 10);
  const nextSchedule = findNextSchedule();

  return (
    <div className='flex h-screen flex-col'>
      <div className='h-10 bg-red-50 w-full' />

      <div className='h-full flex justify-center items-center'>
        <Card className='p-8 w-1/3'>
          <CardTitle>{formattedDate}</CardTitle>
          <CardDescription>
            {todaysSchedule ? (
              isToday ? 'Você está escalado hoje.' :
              `Sua próxima escala é ${format(todaysSchedule.data, "EEEE, d 'de' MMMM", { locale: ptBR })}`
            ) : (
              'Você não foi escalado hoje.'
            )}
          </CardDescription>

          <CardContent className='mt-10'>
            {todaysSchedule && todaysSchedule.data.toISOString().slice(0, 10) === today.toISOString().slice(0, 10) && (
              <div className='flex flex-col'>
                Escalado em
                <span className='p-2 bg-blue-500 rounded font-bold text-lg'>{todaysSchedule.funcao}</span>
              </div>
            )}

            <div className='flex flex-col mt-4'>
              <label className='font-medium'>Próxima escala:</label>
              <span className='text-sm opacity-50'>
                {nextSchedule ? format(nextSchedule.data, "EEEE, d 'de' MMMM", { locale: ptBR }) : "Não há próxima escala"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

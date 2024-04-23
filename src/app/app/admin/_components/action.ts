'use server'

import { criarEscala } from '../../_components/actions'

export default async function SortearEscala(
  valores: { userId: string; funcao: string }[],
) {
  const diasSemana = ['terça', 'quinta', 'domingo']

  // Distribuir os objetos entre terças, quintas e domingos
  await Promise.all(
    diasSemana.map(async (dia) => {
      for (const valor of valores) {
        const data = calcularDataProximoDia(dia)
        await criarEscala({ ...valor, data })
      }
    }),
  )
}

function calcularDataProximoDia(dia: string) {
  const hoje = new Date()
  const proximoDia = new Date(hoje)

  // Encontrar o próximo dia especificado (terça, quinta ou domingo)
  while (proximoDia.getDay() !== getDiaSemana(dia)) {
    proximoDia.setDate(proximoDia.getDate() + 1)
  }

  return proximoDia
}

function getDiaSemana(dia: string) {
  const diasSemana = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ]
  return diasSemana.indexOf(dia.toLowerCase())
}

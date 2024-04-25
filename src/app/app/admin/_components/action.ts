'use server'

import { criarEscala } from '../../_components/actions'

export default async function SortearEscala(
  valores: { userId: string; funcao: string }[],
) {
  const diasSemana = ['terça', 'quinta', 'domingo']

  const hoje = new Date()
  const proximoDia = new Date(hoje)

  // Dividir as pessoas por função
  const pessoasPorFuncao: Record<string, { userId: string; funcao: string }[]> =
    {}
  valores.forEach(({ userId, funcao }) => {
    if (!pessoasPorFuncao[funcao]) {
      pessoasPorFuncao[funcao] = []
    }
    pessoasPorFuncao[funcao].push({ userId, funcao })
  })

  // Distribuir as pessoas igualmente entre as escalas
  const escalas: { userId: string; funcao: string; dia: string }[] = []
  do {
    const dia = getDiaDaSemana(proximoDia)
    if (diasSemana.includes(dia)) {
      Object.values(pessoasPorFuncao).forEach((pessoas) => {
        // Verificar se ainda há pessoas para atribuir nesta função
        if (pessoas.length > 0) {
          // Selecionar a próxima pessoa para esta função
          const { userId, funcao } = pessoas.shift()!
          escalas.push({ userId, funcao, dia })
          // Adicionar a pessoa de volta ao final da lista para que ela seja atribuída novamente no futuro
          pessoas.push({ userId, funcao })
        }
      })
    }
    proximoDia.setDate(proximoDia.getDate() + 1)
  } while (proximoDia.getMonth() === hoje.getMonth())

  // Criar as escalas
  await Promise.all(
    escalas.map(({ userId, funcao, dia }) => {
      const data = calcularDataProximoDia(dia)
      return criarEscala({ userId, funcao, data })
    }),
  )
}

function calcularDataProximoDia(dia: string) {
  const hoje = new Date()
  const proximoDia = new Date(hoje)

  // Encontrar o próximo dia especificado (terça, quinta ou domingo)
  while (getDiaDaSemana(proximoDia) !== dia) {
    proximoDia.setDate(proximoDia.getDate() + 1)
  }

  return proximoDia
}

function getDiaDaSemana(date: Date) {
  const diasSemana = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ]
  return diasSemana[date.getDay()]
}

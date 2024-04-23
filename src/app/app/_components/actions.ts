import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { z } from 'zod'
import { upsertPromptSchema } from './upsertPromptSchema'

export async function getEscalas() {
  const escalas = await prisma.escala.findMany()
  return escalas
}

export async function getUsers() {
  const users = await prisma.user.findMany()
  return users
}

export async function getUserEscalas() {
  const session = await auth()
  const prompts = await prisma.escala.findMany({
    where: {
      userId: session?.user?.id,
    },
  })
  return prompts
}

export async function criarEscala(input: z.infer<typeof upsertPromptSchema>) {
  try {
    const novaEscala = await prisma.escala.create({
      data: {
        data: input.data,
        funcao: input.funcao,
        userId: input.userId,
      },
    })
    return novaEscala
  } catch (error) {
    console.error('Erro ao criar a escala:', error)
    throw new Error('Erro ao criar a escala')
  }
}

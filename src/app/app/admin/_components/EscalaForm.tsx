'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import SortearEscala from './action'
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = z.object({
  escala: z.array(
    z.object({
      userId: z.string(),
      funcao: z.string(),
    }),
  ),
})

export default function EscalaForm() {
  const [pessoas, setPessoas] = useState([
    { userId: '', funcao: '' },
    { userId: '', funcao: '' },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const removeTag = (indexToRemove: number) => {
    setPessoas(pessoas.filter((_, index) => index !== indexToRemove))
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    SortearEscala(values.escala)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-64">
          <div className="grid grid-cols-2 gap-4">
            {pessoas.map((field, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-medium">
                  Membro {index + 1}
                  <button
                    className="text-red-500 text-xs font-normal"
                    type="button"
                    onClick={() => removeTag(index)}
                  >
                    remover
                  </button>
                </div>
                <FormField
                  control={form.control}
                  name={`escala.${index}.userId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membro</FormLabel>
                      <FormDescription />
                      <FormControl>
                        <Input
                          autoComplete="off"
                          {...field}
                          placeholder="Id do membro"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`escala.${index}.funcao`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Função
                      </FormLabel>
                      <FormDescription />
                      <FormControl>
                        <Input
                          autoComplete="off"
                          {...field}
                          placeholder="Função do membro"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex flex-col gap-2 items-center col-span-2 mt-4">
          <Button
            type="button"
            className="w-full"
            variant={'secondary'}
            onClick={() => setPessoas([...pessoas, { userId: '', funcao: '' }])}
          >
            Adicionar membro
          </Button>
          <Button className="w-full" type="submit">
            Gerar escala
          </Button>
        </div>
      </form>
    </Form>
  )
}

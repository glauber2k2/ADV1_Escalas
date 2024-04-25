'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
import SortearEscala from './action'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { User } from '@prisma/client'

const formSchema = z.object({
  escala: z.array(
    z.object({
      userId: z.string(),
      funcao: z.string(),
    }),
  ),
})

export default function EscalaForm({ users }: { users: User[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      escala: [
        { userId: '', funcao: '' },
        { userId: '', funcao: '' },
      ],
    },
  })

  const { fields, remove, append } = useFieldArray({
    name: 'escala',
    control: form.control,
    shouldUnregister: false,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    SortearEscala(values.escala)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-64">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-medium">
                  Membro {index + 1}
                  <button
                    className="text-red-500 text-xs font-normal"
                    type="button"
                    onClick={() => {
                      if (fields.length > 2) {
                        remove(index)
                      }
                    }}
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? users.find((user) => user.id === field.value)
                                    ?.email
                                : 'Selecionar membro.'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar membro ..." />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              {users &&
                                users.map((user) => (
                                  <CommandItem
                                    value={user.email || ''}
                                    key={user.id}
                                    onSelect={() => {
                                      form.setValue(
                                        `escala.${index}.userId`,
                                        user.id,
                                      )
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        user.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {user.email}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar função." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="fotos">Fotos</SelectItem>
                          <SelectItem value="projecao">Projeção</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                        </SelectContent>
                      </Select>
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
            onClick={() => append({ userId: '', funcao: '' })}
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

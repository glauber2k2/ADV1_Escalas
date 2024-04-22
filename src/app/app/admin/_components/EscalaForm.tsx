"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import SortearEscala from "./action";

const formSchema = z.object({
  escala: z.array(
    z.object({
      userId: z.string(),
      funcao: z.string(),
    })
  ),
});

export default function EscalaForm() {
  const [pessoas, setPessoas] = useState([{ userId: "", funcao: "" }]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const removeTag = (indexToRemove: number) => {
    setPessoas(pessoas.filter((_, index) => index !== indexToRemove));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {

    SortearEscala(values.escala)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {pessoas.map((field, index) => (
          <div key={index}>
            <FormField
              control={form.control}
              name={`escala.${index}.userId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Tag {index + 1}
                    <Button
                      type="button"
                      variant={"link"}
                      size={"icon"}
                      onClick={() => removeTag(index)}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </FormLabel>
                  <FormDescription />
                  <FormControl>
                    <Input
                      autoComplete="off"
                      {...field}
                      placeholder="Tag do prompt"
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
                    Função {index + 1}
                  </FormLabel>
                  <FormDescription />
                  <FormControl>
                    <Input
                      autoComplete="off"
                      {...field}
                      placeholder="Função"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => setPessoas([...pessoas, { userId: "", funcao: "" }])}
        >
          Add
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

"use client";

import React, { useState } from "react";
import getColumns from "@/lib/columns";
import axios from "axios";
import Assento from "@/components/Assento";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { ColumnDef } from "@tanstack/react-table";
import type { GenericData, Sala } from "@/lib/definitions";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export default function Home() {
  const [selectedValue, setSelectedValue] = useState<string>("assentos");
  const [data, setData] = useState<GenericData[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [columns, setColumns] = useState<ColumnDef<GenericData>[]>(
    getColumns("assentos")
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // Pega todas as salas uma vez
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/salas", {
        headers: { cursor: 0 },
      })
      .then((response) => {
        setSalas(response.data);
      });
  }, []);

  // Fetch data and update columns whenever the selected value changes
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/" + selectedValue, {
        headers: { cursor: 0 },
      })
      .then((response) => {
        setData(response.data);
        setColumns(getColumns(selectedValue));
      });
  }, [selectedValue]);

  return (
    <>
      <div className="container mx-auto py-auto">
        <h1 className="title pb-2">Vender</h1>
        <div className="flex pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Vender</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <section className="container mx-auto py-2">
          <h1 className="subtitle">Ingressos</h1>

          <div className="flex pb-0">
            <Select onValueChange={(value) => setSelectedValue(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {salas.map((element) => (
                  <SelectItem
                    key={element.id}
                    value={element.bloco + element.numero}
                  >
                    {element.bloco + element.numero}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="container mx-auto py-2">
            <Table>
              <TableCaption>Assentos na sala selecionada</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Assento codigo="A1" ocupado={true} />
                  </TableCell>
                  <TableCell>
                    <Assento codigo="A2" ocupado={true} />
                  </TableCell>
                  <TableCell>
                    <Assento codigo="A3" ocupado={false} />
                  </TableCell>
                  <TableCell>
                    <Assento codigo="A4" ocupado={true} />
                  </TableCell>
                  <TableCell>
                    <Assento codigo="A5" ocupado={true} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
        <section className="container mx-auto py-2">
          <h2 className="subtitle">Bombeniere</h2>
          <div className="container mx-auto py-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}

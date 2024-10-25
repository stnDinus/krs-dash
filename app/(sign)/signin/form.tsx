"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import schema, { schemaT } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import signin from "./signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const form = useForm<schemaT>({
    resolver: zodResolver(schema),
  });
  const formEl = useRef<HTMLFormElement>(null);
  const router = useRouter()
  async function helper() {
    const success = await signin(new FormData(formEl.current!))
    if (!success) {
      toast.error("Kombinasi username dan password salah")
      return
    }

    router.push("/dashboard")
  }

  return (
    <Form {...form}>
      <form
        ref={formEl}
        onSubmit={form.handleSubmit(helper)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="A11.2022.14433" {...field} />
              </FormControl>
              <FormDescription>Nomor Induk Mahasiswa (NIM).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Masukan password anda" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6">Login</Button>
      </form>
    </Form>
  );
}

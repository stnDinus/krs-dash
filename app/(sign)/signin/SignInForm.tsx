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
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function SignInForm() {
  const form = useForm<schemaT>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function helper(v: schemaT) {
    setLoading(true);
    const success = await signin(v.username, v.password);
    setLoading(false);

    if (!success) {
      toast.error("Kombinasi username dan password salah");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(helper)}>
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
                <Input
                  placeholder="Masukan password anda"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="mt-6">
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}

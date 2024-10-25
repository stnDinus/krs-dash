"use server"

import { jwtSecret, jwtCookieName } from "@/lib/auth";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function CheckAuthLayout({ children }: { children: ReactNode }) {
  const jwtSession = cookies().get(jwtCookieName)
  if (jwtSession === undefined) redirect("/signin")

  try {
    verify(jwtSession.value, jwtSecret)
  } catch (err) {
    redirect("/signin")
  }

  return <>
    {children}
  </>
}

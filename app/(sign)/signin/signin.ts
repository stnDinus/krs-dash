"use server";

import schema from "./schema";
import {
  InvalidPassword,
  InvalidUsername,
  default as signin_db,
} from "@/db/users/signin";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { jwtCookieName, jwtSecret } from "@/lib/auth";

/**
 * @returns success {boolean}
 */
const signin = async (username: string, password: string): Promise<boolean> => {
  try {
    schema.parse({ username, password });
    await signin_db(username!.toString(), password!.toString());
  } catch (err) {
    if (err instanceof InvalidUsername || err instanceof InvalidPassword) {
      return false;
    }
    console.error(err);
    return false;
  }

  const jwtSession = sign({ username }, jwtSecret);

  cookies().set(jwtCookieName, jwtSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return true;
};

export default signin;

"use server";

import schema from "./schema";
import {
  InvalidUsername,
  default as signin_db,
} from "@/db/users/fetchPassword";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { jwtCookieName, jwtSecret } from "@/lib/auth";
import { compareSync } from "bcrypt";

/**
 * @returns success {boolean}
 */
const signin = async (username: string, password: string): Promise<boolean> => {
  let hashedPass: string;
  try {
    schema.parse({ username, password });
    hashedPass = await signin_db(username);
  } catch (err) {
    if (err instanceof InvalidUsername) {
      return false;
    }
    console.error(err);
    return false;
  }

  const passmatch = compareSync(password, hashedPass);
  if (!passmatch) return false;

  const jwtSession = sign({ username }, jwtSecret);

  cookies().set(jwtCookieName, jwtSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return true;
};

export default signin;

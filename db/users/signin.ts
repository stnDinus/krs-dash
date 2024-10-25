import pool from "../pool";

export class InvalidUsername extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUsername";
  }
}

export class InvalidPassword extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidPassword";
  }
}

export default async function signin(username: string, password: string) {
  const res = await pool.query("select password from users where id = $1", [
    username,
  ]);
  if (res.rowCount === null || res.rowCount < 1) {
    throw new InvalidUsername(
      `Cannot find user with the username: "${username}"`,
    );
  }

  const dbPass = res.rows[0].password;
  if (password != dbPass) {
    throw new InvalidPassword(
      `Wrong password for user with the username "${username}"" got ${password}`,
    );
  }
}

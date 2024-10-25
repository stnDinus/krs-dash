import pool from "../pool";

export class InvalidUsername extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUsername";
  }
}

export default async function fetchPassword(username: string) {
  const res = await pool.query("select password from users where id = $1", [
    username,
  ]);
  if (res.rowCount === null || res.rowCount < 1) {
    throw new InvalidUsername(
      `Cannot find user with the username: "${username}"`,
    );
  }

  const password = res.rows[0].password as string;
  return password;
}

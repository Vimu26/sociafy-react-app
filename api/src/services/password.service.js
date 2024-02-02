import { genSalt, hash, compare } from "bcrypt";

export async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashPassword = await hash(password, salt);
  return hashPassword;
}

export async function comparePassword(password, hashPassword) {
  return compare(password, hashPassword);
}

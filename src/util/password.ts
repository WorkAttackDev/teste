import { compare, hash } from "bcrypt";
import { promisify } from "util";

export const passwordCompare = promisify(compare);

export const hashPassword = async (password: string) =>
  await promisify(hash)(password, 10);

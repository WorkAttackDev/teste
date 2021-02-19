import argon2 from "argon2";
import type { MyContext } from "../../context";
import type { LogInInput, UserResponse } from "./types";
import { loginValidate } from "./user.validate";

const login = async (
  args: LogInInput,

  ctx: MyContext
): Promise<UserResponse> => {
  const { email, password } = args;
  const { prisma, req } = ctx;

  const errors = loginValidate(args);

  if (errors) return errors;

  const user = await prisma.user.findFirst({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user)
    return {
      errors: [{ field: "email", message: "email não encontrado" }],
    };

  if (!user.isVerified)
    return {
      errors: [{ field: "email", message: "email não verificado" }],
    };

  if (!(await argon2.verify(user.password, password)))
    return {
      errors: [{ field: "password", message: "password incorreta" }],
    };

  req.session.userId = user.id;
  

  return { user };
};

export default login;

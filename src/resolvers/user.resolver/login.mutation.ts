import type { MyContext } from "../../context";
import User from "../../entities/User";
import { passwordCompare } from "../../util/password";
import type { LogInInput, UserResponse } from "./types";
import { loginValidate } from "./user.validate";

const login = async (
  args: LogInInput,

  ctx: MyContext
): Promise<UserResponse> => {
  const { email, password } = args;
  const { req } = ctx;

  const errors = loginValidate(args);

  if (errors) return errors;

  const user = await User.findOne({ where: { email: email.toLowerCase() } });

  if (!user)
    return {
      errors: [{ field: "email", message: "email não encontrado" }],
    };

  if (!user.isVerified)
    return {
      errors: [{ field: "email", message: "email não verificado" }],
    };

  if (!(await passwordCompare(password, user.password)))
    return {
      errors: [{ field: "password", message: "password incorreta" }],
    };

  req.session.userId = user.id;

  return { user };
};

export default login;

import { MyContext } from "../../context";
import User from "../../entities/User";
import { oneDayTimeout } from "../../util/date_handler";
import { hashPassword } from "../../util/password";
import type { ChangePasswordInput, UserResponse } from "./types";
import { hasPasswordError } from "./user.validate";

export const changePassword = async (
  args: ChangePasswordInput,
  ctx: MyContext
): Promise<UserResponse> => {
  const { password, token } = args;

  const { req } = ctx;

  const passwordError = hasPasswordError(password);
  if (passwordError) return passwordError;

  const user = await User.findOne({ where: { verifyToken: token } });

  if (!user || oneDayTimeout().getTime() < Date.now()) {
    return {
      errors: [{ field: "token", message: "chave de recuperação já expirou" }],
    };
  }

  const hashedPassword = await hashPassword(password);

  try {
    User.update(user.id, {
      password: hashedPassword,
      expireToken: new Date(),
      verifyToken: undefined,
    });

    req.session.userId = user.id;

    return {
      user: user,
    };
  } catch (e) {
    console.log(e);

    return {
      errors: [{ field: "token", message: "erro ao atualizar a password" }],
    };
  }
};

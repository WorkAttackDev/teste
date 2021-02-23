import type { MyContext } from "../../context";
import User from "../../entities/User";
import type { UserResponse } from "./types";

export const emailLogin = async (
  token: string,
  ctx: MyContext
): Promise<UserResponse> => {
  const { req } = ctx;

  const user = await User.findOne({ where: { verifyToken: token } });

  if (!user || user.expireToken.getTime() < Date.now()) {
    return {
      errors: [{ field: "token", message: "chave de recuperação já expirou" }],
    };
  }

  if (!user.isVerified)
    return {
      errors: [{ field: "email", message: "email não verificado" }],
    };

  try {
    await User.update(user.id, {
      expireToken: Date.now(),
      verifyToken: undefined,
    });

    req.session.userId = user.id;

    return {
      user: user,
    };
  } catch (e) {
    console.log(e);

    return {
      errors: [{ field: "token", message: "erro ao fazer login" }],
    };
  }
};

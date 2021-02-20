import type { MyContext } from "../../context";
import { hashPassword } from "../../util/password";
import type { ChangePasswordInput, UserResponse } from "./types";
import { hasPasswordError } from "./user.validate";

export const changePassword = async (
  args: ChangePasswordInput,
  ctx: MyContext
): Promise<UserResponse> => {
  const { password, token } = args;
  const { prisma, req } = ctx;

  const passwordError = hasPasswordError(password);
  if (passwordError) return passwordError;

  const user = await prisma.user.findFirst({ where: { verifyToken: token } });

  const tokenTimeout: number = parseInt(user?.expireToken ?? "0");

  if (!user || tokenTimeout < Date.now()) {
    return {
      errors: [{ field: "token", message: "chave de recuperação já expirou" }],
    };
  }

  const hashedPassword = await hashPassword(password);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        expireToken: "0",
        verifyToken: null,
      },
    });

    req.session.userId = updatedUser.id;

    return {
      user: updatedUser,
    };
  } catch (e) {
    console.log(e);

    return {
      errors: [{ field: "token", message: "erro ao atualizar a password" }],
    };
  }
};

import type { MyContext } from "../../context";
import type { UserResponse } from "./types";

export const emailLogin = async (
  token: string,
  ctx: MyContext
): Promise<UserResponse> => {
  const { prisma, req } = ctx;

  const user = await prisma.user.findFirst({ where: { verifyToken: token } });

  const tokenTimeout: number = parseInt(user?.expireToken ?? "0");

  if (!user || tokenTimeout < Date.now()) {
    return {
      errors: [{ field: "token", message: "chave de recuperação já expirou" }],
    };
  }

  if (!user.isVerified)
    return {
      errors: [{ field: "email", message: "email não verificado" }],
    };

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        expireToken: "0",
        verifyToken: null,
      },
    });

    // req.session.userId = updatedUser.id;

    return {
      user: updatedUser,
    };
  } catch (e) {
    console.log(e);

    return {
      errors: [{ field: "token", message: "erro ao fazer login" }],
    };
  }
};

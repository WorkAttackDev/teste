import type { MyContext } from "../../context";
import type { UserResponse } from "./types";

const confirmAccount = async (
  token: string,

  ctx: MyContext
): Promise<UserResponse> => {
  const { prisma } = ctx;

  try {
    const user = await prisma.user.update({
      data: { isVerified: true, verifyToken: "", expireToken: "0" },
      where: { verifyToken: token },
    });

    if (!user)
      return {
        errors: [
          {
            field: "token",
            message: `Token inválido`,
          },
        ],
      };

    // req.session.userId = user.id;

    return { user };
  } catch (error) {
    console.log(error);

    return {
      errors: [
        {
          field: "token",
          message: `Erro ao confirmar usuário`,
        },
      ],
    };
  }
};

export default confirmAccount;

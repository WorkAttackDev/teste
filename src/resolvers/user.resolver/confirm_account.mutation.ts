import type { MyContext } from "../../context";
import User from "../../entities/User";
import type { HasChangeResponse } from "./types";

const confirmAccount = async (
  token: string,

  ctx: MyContext
): Promise<HasChangeResponse> => {
  try {
    const user = await User.findOne({ where: { verifyToken: token } });

    const { req } = ctx;

    if (!user)
      return {
        errors: [
          {
            field: "token",
            message: `Token inválido`,
          },
        ],
      };

    await User.update(user.id, {
      isVerified: true,
      verifyToken: undefined,
      expireToken: new Date(),
    });

    req.session.userId = user.id;

    return { change: true };
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

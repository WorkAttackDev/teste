import { v4 as uuid } from "uuid";
import type { MyContext } from "../../context";
import { confirmAccountEmail } from "../../libs/email";
import { hasEmailError } from "./user.validate";

export const sendConfirmAccount = async (
  email: string,
  ctx: MyContext
): Promise<boolean> => {
  const { prisma } = ctx;

  const emailError = hasEmailError(email);
  if (emailError) return false;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return false;

  const token = uuid();

  const oneDay = Date.now() + 1000 * 60 * 60 * 24 + "";

  try {
    await prisma.user.update({
      where: { email },
      data: { verifyToken: token, expireToken: oneDay },
    });

    await confirmAccountEmail(email, token);

    return true;
  } catch (error) {
    console.log(error);

    return true;
  }
};

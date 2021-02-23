import { v4 as uuid } from "uuid";
import type { MyContext } from "../../context";
import User from "../../entities/User";
import { confirmAccountEmail } from "../../libs/email";
import { oneDayTimeout } from "../../util/date_handler";
import { hasEmailError } from "./user.validate";

export const sendConfirmAccount = async (
  email: string,
  ctx: MyContext
): Promise<boolean> => {
  // const { prisma } = ctx;

  const emailError = hasEmailError(email);
  if (emailError) return false;

  const user = await User.findOne({ where: { email } });

  if (!user) return false;

  const token = uuid();


  try {
    await User.update(
      { id: user.id },
      { verifyToken: token, expireToken: oneDayTimeout() }
    );

    await confirmAccountEmail(email, token);

    return true;
  } catch (error) {
    console.log(error);

    return true;
  }
};

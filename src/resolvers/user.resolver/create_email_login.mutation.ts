import { v4 as uuid } from "uuid";
import type { MyContext } from "../../context";
import User from "../../entities/User";
import { createEmailLoginEmail } from "../../libs/email";
import { oneDayTimeout } from "../../util/date_handler";
import { hasEmailError } from "./user.validate";

export const createEmailLogin = async (
  email: string,
  ctx: MyContext
): Promise<boolean> => {
  const emailError = hasEmailError(email);

  if (emailError) return false;

  const user = await User.findOne({ where: { email } });

  if (!user) return false;

  const token = uuid();

  try {
    await User.update(user.id, {
      verifyToken: token,
      expireToken: oneDayTimeout(),
    });

    await createEmailLoginEmail(email, token);

    return true;
  } catch (error) {
    console.log(error);

    return true;
  }
};

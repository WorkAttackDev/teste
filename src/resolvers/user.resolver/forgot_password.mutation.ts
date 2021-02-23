import { v4 as uuid } from "uuid";
import User from "../../entities/User";
// import type { MyContext } from "../../context";
import { forgotPasswordEmail } from "../../libs/email";
import { oneDayTimeout } from "../../util/date_handler";
import { hasEmailError } from "./user.validate";

export const forgotPassword = async (email: string): Promise<boolean> => {
  const emailError = hasEmailError(email);
  if (emailError) return true;

  const user = await User.findOne({ where: { email } });

  if (!user) return true;

  const token = uuid();

  try {
    await User.update(user.id, {
      verifyToken: token,
      expireToken: oneDayTimeout(),
    });
    
    await forgotPasswordEmail(email, token);

    return true;
  } catch (error) {
    console.log(error);

    return true;
  }
};

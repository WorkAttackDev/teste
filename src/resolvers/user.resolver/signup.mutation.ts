import type { MyContext } from "../../context";
// import { confirmAccountEmail } from "../../libs/email";
import User from "../../entities/User";
import type { SignUpInput, UserResponse } from "./types";
import { signupValidate } from "./user.validate";
import { v4 as uuidV4 } from "uuid";
import { hashPassword } from "../../util/password";
import { oneDayTimeout } from "../../util/date_handler";

const signup = async (
  args: SignUpInput,
  ctx: MyContext
): Promise<UserResponse> => {
  const { req } = ctx;

  const { email, name, password } = args;

  const errors = signupValidate(args);

  if (errors) return errors;

  let hashedPassword: string = await hashPassword(password);

  const token = uuidV4();

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 0,
      name,
      verifyToken: token,
      expireToken: oneDayTimeout(),
    }).save();

    // await confirmAccountEmail(user.email, token);

    req.session.userId = user.id;

    return { user };
  } catch (e) {
    // console.log(e);

    // if (e.code === "P2002")
    if (e.code === "SQLITE_CONSTRAINT")
      return {
        errors: [
          {
            field: "email",
            message: `Este email já existe`,
          },
        ],
      };
  }

  return {
    errors: [
      {
        field: "user",
        message: `Não foi possivel criar o usuário`,
      },
    ],
  };
};

export default signup;

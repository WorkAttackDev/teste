import type { MyContext } from "../../context";
import { confirmAccountEmail } from "../../libs/email";
import type User from "../../object_types/User";
import type { SignUpInput, UserResponse } from "./types";
import { signupValidate } from "./user.validate";
import { v4 as uuidV4 } from "uuid";
import { hashPassword } from "../../util/password";


const signup = async (
  args: SignUpInput,
  ctx: MyContext
): Promise<UserResponse> => {
  const { prisma, req } = ctx;
  const { email, name, password } = args;

  const errors = signupValidate(args);

  if (errors) return errors;


  let hashedPassword:string = await hashPassword(password);

  const token = uuidV4();

  let user: User | undefined = undefined;

  try {
    user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name,
        role: 0,
        verifyToken: token,
      },
    });
  } catch (e) {
    if (e.code === "P2002")
      return {
        errors: [
          {
            field: "email",
            message: `Este email já existe`,
          },
        ],
      };
  }

  // await confirmAccountEmail(user.email, token);

  req.session.userId = user!.id;


  return { user };
};

export default signup;

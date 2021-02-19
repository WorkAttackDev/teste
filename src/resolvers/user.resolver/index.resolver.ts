import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import type { MyContext } from "../../context";
import User from "../../object_types/User";
import { COOKIE_NAME } from "../../util/constants";
import { changePassword } from "./change_password.mutation";
import confirmAccount from "./confirm_account.mutation";
import { createEmailLogin } from "./create_email_login.mutation";
import { emailLogin } from "./email_login.mutation";
import { forgotPassword } from "./forgot_password.mutation";
import login from "./login.mutation";
import { sendConfirmAccount } from "./send_confirm_account";
import signup from "./signup.mutation";
import {
  UserResponse,
  SignUpInput,
  LogInInput,
  ChangePasswordInput,
} from "./types";

@Resolver()
class UserResolver {
  
  @Query(() => User, { nullable: true })
  async me(@Ctx() { prisma, req }: MyContext): Promise<User | null> {
    const userId = req.session.userId;

    if (!userId) return null;

    const user = await prisma.user.findFirst({ where: { id: userId } });

    return user ?? null;
  }

  @Query(() => [User])
  async getUsers(@Ctx() ctx: MyContext): Promise<User[]> {
    return ctx.prisma.user.findMany();
  }

  @Mutation(() => UserResponse)
  async signup(
    @Arg("args") args: SignUpInput,

    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    return signup(args, ctx);
  }

  @Mutation(() => Boolean)
  async sendConfirmAccount(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    return await sendConfirmAccount(email.toLowerCase(), ctx);
  }

  @Mutation(() => UserResponse)
  async confirmAccount(
    @Arg("token") token: string,

    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    return confirmAccount(token, ctx);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("args") args: LogInInput,

    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    return login(args, ctx);
  }

  @Mutation(() => Boolean)
  async createEmailLogin(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    return await createEmailLogin(email.toLowerCase(), ctx);
  }

  @Mutation(() => UserResponse)
  async emailLogin(
    @Arg("token") token: string,

    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    return emailLogin(token, ctx);
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    if (!req.session.userId) return false;

    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);

        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    return await forgotPassword(email.toLowerCase(), ctx);
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("args") args: ChangePasswordInput,

    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    return changePassword(args, ctx);
  }
}

export default UserResolver;

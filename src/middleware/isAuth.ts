import type { MiddlewareFn } from "type-graphql";
import type { MyContext } from "../context";

const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) throw new Error("não autênticado");
  return next();
};

export default isAuth;

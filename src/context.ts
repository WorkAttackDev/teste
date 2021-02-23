// import type { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

declare module "express-session" {
  interface Session {
    userId: number;
  }
}

export type MyContext = {
  // prisma: PrismaClient;
  req: Request;
  res: Response;
};

import express from "express";
import "reflect-metadata";

import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import type { IPrisma } from "@quixo3/prisma-session-store/dist/@types";
import { COOKIE_NAME, PROD_ENV } from "./src/util/constants";
import UserResolver from "./src/resolvers/user.resolver/index.resolver";
import { MyContext } from "./src/context";

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();

const app = express();

app.use(
  expressSession({
    name: COOKIE_NAME,
    cookie: {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, //  10 anos
      httpOnly: true,
      secure: PROD_ENV,
      sameSite: "lax", // estudar sobre isso e cookies em geral
    },
    secret: "ksjfsdknlkndsvnknldsnvlnsdlkvnkldsnl",
    store: new PrismaSessionStore((prisma as unknown) as IPrisma, {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
      roundTTL: undefined,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ prisma, req, res }),
    playground: true,
    introspection: true,
  });

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  //   app.use(compression({ threshold: 0 }));

  return app;
};

main()
  .then((app) => {
    app.listen(PORT, () =>
      console.log("⚡ Servidor rodando na porta ✨" + PORT)
    );
  })
  .finally(() => prisma.$disconnect());

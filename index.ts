import express from "express";
import "reflect-metadata";

import expressSession from "express-session";

import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, PROD_ENV } from "./src/util/constants";
import UserResolver from "./src/resolvers/user.resolver/index.resolver";
import { MyContext } from "./src/context";
import { createConnection } from "typeorm";
import User from "./src/entities/User";
import { TypeormStore } from "connect-typeorm/out";
import { Session } from "./src/entities/Session";

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();

const app = express();

const main = async () => {
  const dbConnection = await createConnection({
    type: "sqlite",
    database: "./database.sqlite",
    logging: true,
    synchronize: true,
    entities: [User, Session],
  });

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
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        // limitSubquery: false, // If using MariaDB.
      }).connect(dbConnection.getRepository(Session)),
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
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

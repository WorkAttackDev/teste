"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const express_session_1 = __importDefault(require("express-session"));
const apollo_server_express_1 = require("apollo-server-express");
const client_1 = require("@prisma/client");
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./src/util/constants");
const index_resolver_1 = __importDefault(require("./src/resolvers/user.resolver/index.resolver"));
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./src/entities/User"));
const out_1 = require("connect-typeorm/out");
const Session_1 = require("./src/entities/Session");
const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const PORT = process.env.PORT || 4000;
const prisma = new client_1.PrismaClient();
const app = express_1.default();
const main = async () => {
    const dbConnection = await typeorm_1.createConnection({
        type: "sqlite",
        database: "./database.sqlite",
        logging: true,
        synchronize: true,
        entities: [User_1.default, Session_1.Session],
    });
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        cookie: {
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: constants_1.PROD_ENV,
            sameSite: "lax",
        },
        secret: "ksjfsdknlkndsvnknldsnvlnsdlkvnkldsnl",
        resave: false,
        saveUninitialized: false,
        store: new out_1.TypeormStore({
            cleanupLimit: 2,
        }).connect(dbConnection.getRepository(Session_1.Session)),
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [index_resolver_1.default],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
        playground: true,
        introspection: true,
    });
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    //   app.use(compression({ threshold: 0 }));
    return app;
};
main()
    .then((app) => {
    app.listen(PORT, () => console.log("⚡ Servidor rodando na porta ✨" + PORT));
})
    .finally(() => prisma.$disconnect());

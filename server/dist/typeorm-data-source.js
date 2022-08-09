"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const Upvote_1 = require("./entities/Upvote");
const constants_1 = require("./constants");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    logging: true,
    synchronize: !constants_1.__prod__,
    migrations: [path_1.default.join(__dirname, './migrations/*{.ts,.js}')],
    entities: [Post_1.Post, User_1.User, Upvote_1.Upvote],
});
exports.AppDataSource.initialize()
    .then(() => {
    exports.AppDataSource.runMigrations();
})
    .catch((error) => console.log(error));
//# sourceMappingURL=typeorm-data-source.js.map
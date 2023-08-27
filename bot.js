"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const grammy_1 = require("grammy");
const keyboards_1 = require("./keyboards");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.BOT_TOKEN;
exports.bot = new grammy_1.Bot(token);
//const userSessions: session.SessionMap = new Map();
exports.bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //userSessions.set(ctx.chat?.id!, {step: 0 });
    yield ctx.reply("Привет, " + (((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.username) || ""), { reply_markup: keyboards_1.problemMenu });
    console.log("Бот запущен");
}));
exports.bot.start();

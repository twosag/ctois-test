import { Bot, Context, } from "grammy";
//import { problemMenu } from "../keyboards";


import dotenv from "dotenv";
import { first_menu } from "./keyboards";
dotenv.config();


const token = process.env.BOT_TOKEN as string;
export const bot = new Bot(token);
 
bot.use(first_menu);

//const userSessions: session.SessionMap = new Map();

bot.command("start", async (ctx: Context) => {
  //userSessions.set(ctx.chat?.id!, {step: 0 });
  await ctx.reply("Привет, " + (ctx.from?.username || ""), { reply_markup: first_menu, } );
  console.log("Бот запущен");
});

/*bot.callbackQuery('/problem_(.+)/', async (ctx) => {
  await ctx.editMessageText("Оберіть інститут:", {
      reply_markup: institutionsMenu,
  });
});*/
bot.start();


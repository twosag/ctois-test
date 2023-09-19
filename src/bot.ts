import { Bot, Context, GrammyError, HttpError, session, SessionFlavor } from 'grammy';
import { mainMenu } from './buttons';
import { setupProblem3Handlers } from './scenes/templatesProblem';
//import { setupProblem4Handlers } from './scenes/anotherProblem';
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
} from "@grammyjs/conversations";
import dotenv from "dotenv";
import {ethernetConversation, siteConversation, ethernetProblem1,setupProblem2Handlers } from "./scenes/index"
dotenv.config();

interface SessionData {
  username?: string | undefined, 
  first_name?: string | undefined, 
  last_name?: string | undefined, 
  problem?: string
  institut?: string,
  kafedra?:string
  corpus?: string | undefined, 
  room_number?: string
  comp_number?: string
  url?: string
  template_number?: number
  temlate_text?: string
  another_text?: string
  adminId?  : number;
}

export type MyContext = Context & SessionFlavor<SessionData> &ConversationFlavor;
const token = process.env.BOT_TOKEN as string;
export const bot = new Bot<MyContext>(token);

function initial(): SessionData {
  return {};
}
bot.use(session({ initial }));
bot.use(conversations());

bot.use(siteConversation());
bot.use(ethernetConversation());
ethernetProblem1(bot);
setupProblem2Handlers(bot);
setupProblem3Handlers(bot); 
//setupProblem4Handlers(bot); - розробка у майбутньому 
bot.command('start', (ctx) => {ctx.conversation.exit(); ctx.reply('Выберите проблему:', { reply_markup: mainMenu })});
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Помилка під час обробки оновлення ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    return ctx.reply("❌ Ваш запит було прервано. Введіть дані трохи швидше ❌", {reply_markup: mainMenu})
  } else if (e instanceof HttpError) {
    console.error("Не вдалося звʼязатися з Telegram:", e);
  } else {
    console.error("Невідома помилка:", e);
  }
});
bot.start();



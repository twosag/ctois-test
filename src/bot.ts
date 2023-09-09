import { Bot, Context, session, SessionFlavor } from 'grammy';
import { mainMenu } from './buttons';
import { setupProblem1Handlers } from './scenes/problem1';
import { setupProblem2Handlers } from './scenes/problem2';
import { setupProblem3Handlers } from './scenes/problem3';
import { setupProblem4Handlers } from './scenes/problem4';
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import dotenv from "dotenv";
import {ethernetConversation} from "./scenes/index"
dotenv.config();

interface SessionData {
  button?: string | null | true;
  room_number?: string | null | true;
  comp_number?: string | null | true;
  url?: string | null | true;
  textFirst_problem3?: string | null | true;
  textSecond_problem3?: string | null | true;
  textFirst_problem4?: string | null | true;
  lastMessageId?: number;
}

export type MyContext = Context & SessionFlavor<SessionData> &ConversationFlavor;


const token = process.env.BOT_TOKEN as string;
export const bot = new Bot<MyContext>(token);

function initial(): SessionData {
  return {};
}
bot.use(session({ initial }));
bot.use(conversations());
bot.use(ethernetConversation());
bot.command('start', (ctx) => ctx.reply('Выберите проблему:', { reply_markup: mainMenu }));

setupProblem1Handlers(bot);
setupProblem2Handlers(bot);
setupProblem3Handlers(bot);
setupProblem4Handlers(bot);
bot.start();



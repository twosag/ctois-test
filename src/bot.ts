import { Bot, Context, session, SessionFlavor } from 'grammy';
import { mainMenu } from './buttons';
import { setupProblem1Handlers } from './scenes/ethernetProblem';
import { setupProblem2Handlers } from './scenes/siteProblem';
import { setupProblem3Handlers } from './scenes/templatesProblem';
import { setupProblem4Handlers } from './scenes/anotherProblem';
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
} from "@grammyjs/conversations";
import dotenv from "dotenv";
import {ethernetConversation } from "./scenes/index"
dotenv.config();

interface SessionData {
  username?: string | undefined, 
  first_name?: string | undefined, 
  last_name?: string | undefined, 
  problem?: string
  institut?: string
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
bot.use(ethernetConversation());
//bot.use(ethernetConversationMed()); 
setupProblem1Handlers(bot);
setupProblem2Handlers(bot);
setupProblem3Handlers(bot); 
setupProblem4Handlers(bot);
bot.command('start', (ctx) => {ctx.conversation.exit(); ctx.reply('Выберите проблему:', { reply_markup: mainMenu })});
bot.start();



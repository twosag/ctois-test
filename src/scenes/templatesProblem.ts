import { MyContext } from '../bot';
import { Bot } from "grammy";
import { mainMenu} from '../buttons';

export function setupProblem3Handlers(bot: Bot<MyContext>) {
    bot.callbackQuery(/^problem3$/, async (ctx) => {
        await ctx.reply(`Напишите текст первый раз:`, {
            reply_markup: mainMenu
        });
        ctx.session.template_number;
    });

    bot.hears('Назад', async (ctx) => {
        await ctx.reply('Выберите проблему', {
            reply_markup: mainMenu
        });
        ctx.session.template_number;
        ctx.session.temlate_text;
    });

    
}

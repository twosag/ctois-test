import { MyContext } from '../bot';
import { Bot } from "grammy";
import { mainMenu, backButton } from '../buttons';

export function setupProblem3Handlers(bot: Bot<MyContext>) {
    bot.callbackQuery(/^problem3$/, async (ctx) => {
        await ctx.reply(`Напишите текст первый раз:`, {
            reply_markup: backButton
        });
        ctx.session.textFirst_problem3 = true;
    });

    bot.hears('Назад', async (ctx) => {
        await ctx.reply('Выберите проблему', {
            reply_markup: mainMenu
        });
        ctx.session.textFirst_problem3 = null;
        ctx.session.textSecond_problem3 = null;
    });

    bot.on(':text', async (ctx, next) => {
        if (!ctx.session.textFirst_problem3 || !ctx.message) return next();
        if (ctx.session.textFirst_problem3 === true) {
            ctx.session.textFirst_problem3 = ctx.message.text;
            await ctx.reply(`Вы написали: ${ctx.message.text}. Напишите текст второй раз:`, {
                reply_markup: backButton
            });
        } else if (ctx.session.textFirst_problem3 && !ctx.session.textSecond_problem3) {
            ctx.session.textSecond_problem3 = ctx.message.text;
            await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваши тексты сохранены.`, {
                reply_markup: backButton
            });
            // Здесь вы можете добавить код для сохранения данных в базу данных
            // Например:
            // saveToDatabase(ctx.from.username, new Date(), ctx.session.firstText, ctx.session.secondText);
            ctx.session.textFirst_problem3 = null;
            ctx.session.textSecond_problem3 = null;
            console.log(ctx.session);
        }
    });
}

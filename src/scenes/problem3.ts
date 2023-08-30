import { MyContext } from '../bot';
import { Bot, InlineKeyboard } from "grammy";
import { mainMenu } from '../buttons';

export function setupProblem3Handlers(bot: Bot<MyContext>) {
    bot.callbackQuery(/^problem3$/, async (ctx) => {
        await ctx.editMessageText(`Напишите текст первый раз:`, {
            reply_markup: new InlineKeyboard().text("Головне меню", "back")
        });
        ctx.session.textFirst_problem3 = true;
    });

    bot.callbackQuery("back", async (ctx) => {
        await ctx.editMessageText(`Выберите проблему`, {
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
                reply_markup: new InlineKeyboard().text("Головне меню", "back")
            });
        } else if (ctx.session.textFirst_problem3 && !ctx.session.textSecond_problem3) {
            ctx.session.textSecond_problem3 = ctx.message.text;
            await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваши тексты сохранены.`);
            // Здесь вы можете добавить код для сохранения данных в базу данных
            // Например:
            // saveToDatabase(ctx.from.username, new Date(), ctx.session.firstText, ctx.session.secondText);
            ctx.session.textFirst_problem3 = null;
            ctx.session.textSecond_problem3 = null;
        } else {
            await ctx.reply(`Напишите текст первый раз:`, {
                reply_markup: new InlineKeyboard().text("Головне меню", "back")
            });
            ctx.session.textFirst_problem3 = true;
        }
    });
}
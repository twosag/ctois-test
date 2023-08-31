import { MyContext } from "../bot";
import { Bot } from "grammy";
import { backButton, mainMenu } from "../buttons";

export function setupProblem4Handlers(bot: Bot<MyContext>) {
    
bot.callbackQuery(/^problem4$/, async (ctx) => {
    await ctx.reply(`Напишите текст:`)
    ctx.session.textFirst_problem4 = true;
});

bot.hears('Назад', async (ctx) => {
    await ctx.reply('Выберите проблему', {
        reply_markup: mainMenu
    });
    ctx.session.textFirst_problem4 = null;
 
});

bot.on(':text', async (ctx, next) => {
    if (!ctx.session.textFirst_problem4 || !ctx.message) return next();
    await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваш текст сохранен.`), {
        reply_markup: backButton
    };
    // Здесь вы можете добавить код для сохранения данных в базу данных
    // Например:
    // saveToDatabase(ctx.from.username, new Date(), ctx.message.text);
    ctx.session.textFirst_problem4 = null;
})};
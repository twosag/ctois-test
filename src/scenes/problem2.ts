import { MyContext } from "../bot";
import { Bot} from "grammy";
export function setupProblem2Handlers(bot: Bot<MyContext>) {
bot.callbackQuery(/^problem2$/, async (ctx) => {
    await ctx.editMessageText(`Напишите URL-адрес:`);
    ctx.session.url = true;
});

bot.on(':text', async (ctx, next) => {
    if (!ctx.session.url || !ctx.message) return next();
    ctx.session.url = ctx.message.text;
    await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваш URL сохранен.`);
    // Здесь вы можете добавить код для сохранения данных в базу данных
    // Например:
    // saveToDatabase(ctx.from.username, new Date(), ctx.session.url);
    ctx.session.url = null;
})};
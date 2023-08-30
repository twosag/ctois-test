import { MyContext } from "../bot";
import { Bot} from "grammy";

export function setupProblem4Handlers(bot: Bot<MyContext>) {
bot.callbackQuery(/^problem4$/, async (ctx) => {
    await ctx.editMessageText(`Напишите текст:`);
    ctx.session.textFirst_problem4 = true;
});

bot.on(':text', async (ctx, next) => {
    if (!ctx.session.textFirst_problem4 || !ctx.message) return next();
    await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваш текст сохранен.`);
    // Здесь вы можете добавить код для сохранения данных в базу данных
    // Например:
    // saveToDatabase(ctx.from.username, new Date(), ctx.message.text);
    ctx.session.textFirst_problem4 = null;
})};
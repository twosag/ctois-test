import { Conversation, conversations, createConversation } from "@grammyjs/conversations";
import { MyContext } from "../bot";
import { Bot} from "grammy";
import { mainMenu } from "../buttons";

export function setupProblem2Handlers(bot: Bot<MyContext>) {
bot.callbackQuery("site", async (ctx) => {
    try {
        await ctx.editMessageText(`Напишите URL-адрес:`);
    } catch(error) {
        console.error(error)
        await ctx.reply("ой, виникла помилка");
    }
})};
/*
bot.on(':text', async (ctx, next) => {
    if (!ctx.session.url || !ctx.message) return next();
    ctx.session.url = ctx.message.text;
    await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваш URL сохранен.`);
    // Здесь вы можете добавить код для сохранения данных в базу данных
    // Например:
    // saveToDatabase(ctx.from.username, new Date(), ctx.session.url);

})};
*/
/*
export function siteConversation() {
    return createConversation(
        async (conversation: Conversation<MyContext>, ctx: MyContext) => {
            let url;
            do {
                if (url === "/start") {
                    return ctx.reply("Дякую",{reply_markup:mainMenu});
                } else {
                    await ctx.editMessageText(`Напишите URL-адрес:`);
                    const url_string = await conversation.wait();
                    url = url_string.message?.text;
                }
            } while (isNaN(Number(url)))

            }
        }
    )
} */
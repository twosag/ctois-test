//import { Conversation, conversations, createConversation } from "@grammyjs/conversations";
import { MyContext } from "../bot";
import { Bot} from "grammy";
import { Conversation, conversations, createConversation } from "@grammyjs/conversations";
import { mainMenu } from "../buttons";
import { replySite } from "../handlers/reply";

export function setupProblem2Handlers(bot: Bot<MyContext> ) {
bot.callbackQuery("site", async (ctx) => {
    try {
        await ctx.conversation.enter("site_conv");
    } catch(error) {
        console.error(error)
        await ctx.reply("ой, виникла помилка");
    }
})

};
const chatId = -1001954529652

export function siteConversation() {

    return createConversation(
        async function waitForMe(conversation: Conversation<MyContext>, ctx: MyContext) { 
            function isValidUrl(string: string | URL) {
                try {
                  new URL(string);
                  return true;
                } catch (_) {
                  return false;  
                }
              }
            let url;
            do {
                if (url === "/start" ) {
                    ctx.reply("Дякую", { reply_markup: mainMenu });
                    url = null;
                    return;
                } else {
                    ctx.reply("Введіть url домену сайту або сторінки сайту.\n*Наприклад:* \`https://sumdu.edu.ua/uk/\`.", { parse_mode: 'Markdown' })
                }
                const url_message = await conversation.waitFor("message:text");
                url = url_message.message.text;
            } while (!isValidUrl(url));
            
            const username = ctx.from?.username;
            const first_name = ctx.from?.first_name;
            const problem = "Не працює сайт"
            const message = replySite(problem, url, username,);
            await ctx.answerCallbackQuery({ text: "✅ Звернення було передано до розгляду", show_alert: true });
            await ctx.reply("Вы були повернені до головного меню", { reply_markup: mainMenu })
            await ctx.api.sendMessage(chatId, await message, { parse_mode: 'Markdown' });
            return;
        }, "site_conv"
    );
};
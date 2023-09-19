import { MyContext } from '../bot';
import { ethernetMenuCampus, ethernetCorpusSumdu, ethernetCorpusMed, ethernetCorpusUabs, mainMenu } from '../buttons';
import { Bot, Context } from "grammy";
import { Conversation, conversations, createConversation } from "@grammyjs/conversations";
import { replyEthernet } from '../handlers/reply';


//Виклик меню "Інтернет підключення" з вибором університета

export function ethernetProblem1(bot: Bot<MyContext>) {
    bot.callbackQuery("ethernet", async (ctx) => {
        try {
            await ctx.editMessageText('Для більш детальної інформації, вкажіть будь ласка кампус університету:', { reply_markup: ethernetMenuCampus })
        } catch (error) {
            console.error(error);
            await ctx.reply('Вибачте, виникла помилка. Спробуйте ще раз.', { reply_markup: mainMenu });
        }
    });

    // Виклик меню з вибором корпусу університета

    bot.callbackQuery(["Головний кампус СумДУ", "Медичный інститут", "Кампус ННІ БТ \"УАБС\" та ННІП"], async (ctx) => {
        const institut = ctx.callbackQuery.data;
        try {
            let menu;
            if (institut === 'Головний кампус СумДУ') {
                menu = ethernetCorpusSumdu;
            } else if (institut === 'Медичный інститут') {
                menu = ethernetCorpusMed;
            } else if (institut === 'Кампус ННІ БТ "УАБС" та ННІП') {
                menu = ethernetCorpusUabs;
            }
            ctx.session.institut = institut
            await ctx.editMessageText('Выберіть корпус вашого університету в якому ви перебуваєте:', { reply_markup: menu });
        } catch (error) {
            console.error(error);
            await ctx.reply('Вибачте, виникла помилка. Спробуйте ще раз.', { reply_markup: mainMenu });
        }
       
    });

    //Виклик розмови після вибору корпусу 
    bot.callbackQuery(/^[а-яА-ЯїЇєЄіІ\s]*$/, async (ctx) => {
        const corpus = ctx.callbackQuery.data;
        try {
            ctx.session.corpus = corpus;
            await ctx.conversation.enter("ethernet_conv");
            console.log(ctx.callbackQuery)
        } catch (error) {
            console.error(error);
            await ctx.reply('Вибачте, виникла помилка. Спробуйте ще раз.', { reply_markup: mainMenu });
        }
    });
}



const chatId = -1001954529652
//Бот запитує назву кафедри + номер кабінету + інвентарний номер (Виконується перевірка на: чи є текст числом/текстом + примусове завершення на кнопку /start)
export function ethernetConversation() {

    return createConversation(
        async function waitForText(conversation: Conversation<MyContext>, ctx: MyContext) {

            let kafedra;
            do {
                if (kafedra === "/start") {
                    ctx.reply("Дякую", { reply_markup: mainMenu });
                    break;
                } else {
                    ctx.reply("Введіть назву своєї кафедри.\n*Наприклад:* \`ТПХ\`", { parse_mode: 'Markdown' })
                }
                const kafedra_message = await conversation.waitFor("message:text");
                kafedra = kafedra_message.message.text;
            } while (!/^[а-яА-ЯїЇєЄіІ\s]*$/.test(kafedra));


            let room_number;
            do {
                if (room_number === "/start") {
                    return ctx.reply("Дякую", { reply_markup: mainMenu });
                } else {
                    await ctx.reply("Введіть номер свого кабінету.\n*Наприклад:* \`208\`", { parse_mode: 'Markdown' })
                    const room_number_message = await conversation.wait();
                    room_number = room_number_message.message?.text;

                };
            } while (isNaN(Number(room_number)));

            let comp_number;
            do {
                if (comp_number === "/start") {
                    return ctx.reply("Дякую", { reply_markup: mainMenu });
                } else {
                    await ctx.reply("Вкажіть інвентарний номер системного блоку, де відсутній інтернет.\n*Наприклад:* \`10478205\`", { parse_mode: 'Markdown' })
                    const comp_number_message = await conversation.wait();
                    comp_number = comp_number_message.message?.text;
                }
            } while (isNaN(Number(comp_number)));

            const username = ctx.from?.username;
            const first_name = ctx.from?.first_name;
            const problem = "Інтернет підключення"
            const message = replyEthernet(problem, ctx.session.institut, ctx.session.corpus, kafedra, room_number, comp_number, username, first_name,);
            await ctx.answerCallbackQuery({ text: "✅ Звернення було передано до розгляду", show_alert: true });
            await ctx.reply("Вы були повернені до головного меню", { reply_markup: mainMenu })
            await ctx.api.sendMessage(chatId, await message, { parse_mode: 'Markdown' });
            return;
        }, "ethernet_conv"
    );
};




import { MyContext } from '../bot';
import { ethernetMenuCampus, ethernetCorpusSumdu, ethernetCorpusMed,ethernetCorpusUabs, mainMenu, backButton } from '../buttons';
import { Bot, Context} from "grammy";
import {Conversation,conversations,createConversation} from "@grammyjs/conversations";
import { replyEthernet } from '../handlers/reply'; 


//Вызов меню "Інтернет підключення" с выбором университета
export function setupProblem1Handlers(bot: Bot<MyContext>) {

    bot.callbackQuery(["ethernet"], async (ctx) => {
        try {
            await ctx.editMessageText('Для більш детальної інформації, вкажіть будь ласка кампус університету:', { reply_markup: ethernetMenuCampus })
        } catch (error) {
            console.error(error);
            await ctx.reply('Вибачте, виникла помилка. Спробуйте ще раз.');
        }
    });
    
    bot.callbackQuery(["Головний кампус СумДУ", "Кампус Медичного інституту","Кампус ННІ БТ \"УАБС\" та ННІП"], async (ctx) => {
        const institut = ctx.callbackQuery.data;
        try {
            let menu;
            if (institut === 'Головний кампус СумДУ') {
                menu = ethernetCorpusSumdu;
                await ctx.editMessageText('Выберіть корпус вашого університету в якому ви перебуваєте:', { reply_markup: menu });
            } else if (institut === 'Кампус Медичного інституту') {
                await ctx.conversation.enter("ethernet_conv");
            } else if (institut === 'Кампус ННІ БТ "УАБС" та ННІП') {
                menu = ethernetCorpusUabs;
                await ctx.editMessageText('Выберіть корпус вашого університету в якому ви перебуваєте:', { reply_markup: menu });
            }
            ctx.session.institut = institut
            
        } catch (error) {
            console.error(error);
            await ctx.reply('Вибачте, виникла помилка. Спробуйте ще раз.');
        }
    });
    //Визов списка корпусов после выбора университета
    bot.on("callback_query:data", async (ctx) => {
        const corpus = ctx.callbackQuery.data;
        try {
            ctx.session.corpus = corpus;
            await ctx.conversation.enter("ethernet_conv");
            console.log(ctx.callbackQuery)
        } catch (error) {
            console.error(error);
            await ctx.reply('Вибачте, виникла помилка. Спробуйте ще раз.');
        }
    });
}


const chatId = -1001954529652
//Бот спрашивает за номер кабинета + инвентарный номер (Виполняется проверка на: является ли текст числом + принудительное завершение на кнопку /start)
export function ethernetConversation() {
    
    return createConversation(
        async (conversation: Conversation<MyContext>, ctx: MyContext) => {
            let room_number;
            do {
                if (room_number === "/start") {
                    return ctx.reply("Дякую", {reply_markup: mainMenu});
                } else {
                    await ctx.reply("Введите номер кабинета. Только цифры")
                const room_number_message = await conversation.wait();
                room_number = room_number_message.message?.text;
                
                };
            } while (isNaN(Number(room_number)));

            let comp_number
            do {
                if (comp_number === "/start") {
                    return ctx.reply("Дякую", {reply_markup: mainMenu});
                } else {
                    await ctx.reply("Також вкажіть інвентарний номер системного блоку, де відсутній інтернет")
                    const comp_number_message = await conversation.wait();
                    comp_number = comp_number_message.message?.text;
                }
            } while (isNaN(Number(comp_number)));
            console.log({comp_number})
            console.log({room_number})
            const username = ctx.from?.username;
            const first_name = ctx.from?.first_name;
            const last_name= ctx.from?.last_name;
            const problem ="Інтернет підключення"
            const message = replyEthernet(problem, ctx.session.institut, ctx.session.corpus, room_number, comp_number, username, first_name, last_name,);
            //await ctx.reply("Дякуємо за інформацію. Незабаром до вас завітає системний адміністратор. Гарного дня!😊");
            await ctx.answerCallbackQuery({text:"✅ Звернення було передано до розгляду", show_alert: true});
            await ctx.reply("Вы були повернені до головного меню", {reply_markup: mainMenu})
            await ctx.api.sendMessage(chatId, await message, { parse_mode: 'Markdown' });
            return;
        },"ethernet_conv"
    );
};




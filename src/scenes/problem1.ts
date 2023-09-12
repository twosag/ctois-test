import { MyContext } from '../bot';
import { ethernetMenuCampus, ethernetCorpusSumdu, ethernetCorpusMed,ethernetCorpusUabs, mainMenu } from '../buttons';
import { Bot} from "grammy";
import {Conversation,conversations,createConversation} from "@grammyjs/conversations";
import { replyEthernet } from '../handlers/reply'; 


//Вызов меню "Інтернет підключення" с выбором университета
export function setupProblem1Handlers(bot: Bot<MyContext>) {
    bot.errorBoundary(
        (err) => console.error("Розмова викинула помилку!", err),
        createConversation(ethernetConversation),
      );
    bot.callbackQuery(["ethernet"], async (ctx) => {
        try {
            await ctx.editMessageText('Для більш детальної інформації, вкажіть будь ласка кампус університету:', { reply_markup: ethernetMenuCampus });
        } catch (error) {
            console.error(error);
            await ctx.reply('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    });
    
    bot.callbackQuery(["СумДУ","ethernet_med", "ethernet_uabs"], async (ctx) => {
        try {
            const institut = ctx.callbackQuery.data;
            let menu;
            if (institut === 'СумДУ') {
                menu = ethernetCorpusSumdu;
            } else if (institut === 'ethernet_med') {
                menu = ethernetCorpusMed;
            } else if (institut === 'ethernet_uabs') {
                menu = ethernetCorpusUabs;
            }
            ctx.session.institut = institut
            await ctx.editMessageText('Выберіть корпус вашого університету в якому ви перебуваєте:', { reply_markup: menu });
        } catch (error) {
            console.error(error);
            await ctx.reply('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    });
    
    //Визов списка корпусов после выбора университета
    bot.callbackQuery(/^button[0-9]+$/, async (ctx) => {
        try {
            const corpus = ctx.callbackQuery.data;
            ctx.session.corpus = corpus;
            await ctx.conversation.enter("ethernet_conv");
        } catch (error) {
            console.error(error);
            await ctx.reply('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.');
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
            const username: any = ctx.from?.username;
            const first_name: any = ctx.from?.first_name;
            const last_name: any = ctx.from?.last_name;
            const date = new Date();
            const formattedDay = String(date.getDate()).padStart(2, '0');
            const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
            const formattedHours = String(date.getHours()).padStart(2, '0');
            const formattedMinutes = String(date.getMinutes()).padStart(2, '0');
            const dateTime = `Дата: ${formattedDay}.${formattedMonth}, Время: ${formattedHours}:${formattedMinutes}`;
            const problem ="Інтернет підключення"
            const message = replyEthernet(problem, ctx.session.institut, ctx.session.corpus, room_number, comp_number, username, first_name, last_name, dateTime);
            await ctx.reply("Дякуємо за інформацію. Незабаром до вас завітає системний адміністратор. Гарного дня!");
            await ctx.api.sendMessage(chatId, await message, { parse_mode: 'Markdown' });
            return;
        },"ethernet_conv"
    );
}



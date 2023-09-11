import { MyContext } from '../bot';
import { ethernetMenuCampus, ethernetCorpusSumdu, ethernetCorpusMed,ethernetCorpusUabs, mainMenu } from '../buttons';
import { Bot} from "grammy";
import {Conversation,createConversation} from "@grammyjs/conversations";


//Вызов меню "Інтернет підключення" с выбором университета
export function setupProblem1Handlers(bot: Bot<MyContext>) {
    bot.errorBoundary(
        (err) => console.error("Розмова викинула помилку!", err),
        createConversation(ethernetConversation),
      );
    bot.callbackQuery(["ethernet","site","templates","other"], async (ctx) => {
        try {
            await ctx.editMessageText('Для більш детальної інформації, вкажіть будь ласка кампус університету:', { reply_markup: ethernetMenuCampus });
        } catch (error) {
            console.error(error);
            await ctx.reply('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    });
    
    bot.callbackQuery(["ethernet_sumdu","ethernet_med", "ethernet_uabs"], async (ctx) => {
        try {
            const campus = ctx.callbackQuery.data;
            let menu;
            if (campus === 'ethernet_sumdu') {
                menu = ethernetCorpusSumdu;
            } else if (campus === 'ethernet_med') {
                menu = ethernetCorpusMed;
            } else if (campus === 'ethernet_uabs') {
                menu = ethernetCorpusUabs;
            }
            await ctx.editMessageText('Выберіть корпус вашого університету в якому ви перебуваєте:', { reply_markup: menu });
        } catch (error) {
            console.error(error);
            await ctx.reply('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    });
    
    //Визов списка корпусов после выбора университета
    bot.callbackQuery(/^button[0-9]+$/, async (ctx) => {
        try {
            const button = ctx.callbackQuery.data;
            ctx.session.button = button;
            await ctx.conversation.enter("ethernet_conv");
        } catch (error) {
            console.error(error);
            await ctx.reply('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    });
}

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
            await ctx.reply("Дякуємо за інформацію. Незабаром до вас завітає системний адміністратор. Гарного дня!");
            return;
        },"ethernet_conv"
    );
}




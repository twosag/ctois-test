import { MyContext } from '../bot';
import { ethernetMenuCampus, ethernetCorpusSumdu, ethernetCorpusMed,ethernetCorpusUabs } from '../buttons';
import { Bot, Context} from "grammy";
import {Conversation,conversations,createConversation} from "@grammyjs/conversations";

//export const ETHERNET_CONVERSATION = "ethernet_conv";
type MyConversation = Conversation<MyContext>;

//Вызов меню "Інтернет підключення" с выбором университета
export function setupProblem1Handlers(bot: Bot<MyContext>) {
    bot.callbackQuery(["ethernet","site","templates","other"], (ctx) => 
    ctx.editMessageText('Для більш детальної інформації, вкажіть будь ласка кампус університету:', { reply_markup: ethernetMenuCampus }));
    
    bot.callbackQuery(["ethernet_sumdu","ethernet_med", "ethernet_uabs"], async (ctx) => {
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
    });
    
    //Визов списка корпусов после выбора университета
    bot.callbackQuery(/^button[0-9]+$/, async (ctx) => {
        const button = ctx.callbackQuery.data;
        ctx.session.button = button;
        const conversation = ethernetConversation();
        await ctx.editMessageText(`Дякую. Напишіть номер приміщення в якому відсутній інтернет:`, conversation);
    });
    
    function ethernetConversation() {
        return createConversation(
            async (conversation: Conversation<MyContext>, ctx: MyContext) => {
                await ctx.reply("Дякую. Напишіть номер приміщення в якому відсутній інтернет:")
                const room_number = await conversation.wait();
                await ctx.reply("Також вкажіть інвентарний номер системного блоку, де відсутній інтернет")
                const comp_number = await conversation.wait();
                await ctx.reply("Дякуємо за інформацію. Незабаром до вас завітає системний адміністратор. Гарного дня!");
            },"ethernet_conv"
        );
    }
}



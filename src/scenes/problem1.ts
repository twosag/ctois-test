import { MyContext } from '../bot';
import { problem1Menu, choice1Menu, choice2Menu,choice3Menu } from '../buttons';
import { Bot} from "grammy";
export function setupProblem1Handlers(bot: Bot<MyContext>) {
bot.callbackQuery(/^problem1$/, (ctx) => ctx.editMessageText('Выберите:', { reply_markup: problem1Menu }));
  
  bot.callbackQuery(/^choice[123]$/, async (ctx) => {
      const choice = ctx.callbackQuery.data;
      let menu;
      if (choice === 'choice1') {
          menu = choice1Menu;
      } else if (choice === 'choice2') {
          menu = choice2Menu;
      } else if (choice === 'choice3') {
          menu = choice3Menu;
      }
      await ctx.editMessageText('Выберите кнопку:', { reply_markup: menu });
  });
  
  bot.callbackQuery(/^button[0-9]+$/, async (ctx) => {
      const button = ctx.callbackQuery.data;
      ctx.session.button = button;
      await ctx.editMessageText(`Вы выбрали ${button}. Напишите текст первый раз:`);
  });
  
  bot.on(':text', async (ctx, next) => {
      if (!ctx.session.button || !ctx.message) return next();
      if (!ctx.session.textFirst_problem1) {
          ctx.session.textFirst_problem1 = ctx.message.text;
          await ctx.reply(`Вы написали: ${ctx.message.text}. Напишите текст второй раз:`);
      } else {
          ctx.session.textSecond_problem1 = ctx.message.text;
          await ctx.reply(`Вы написали: ${ctx.message.text}. Спасибо! Ваш выбор и тексты сохранены.`);
          // Здесь вы можете добавить код для сохранения данных в базу данных
          // Например:
          // saveToDatabase(ctx.from.username, new Date(), ctx.session.button, ctx.session.firstText, ctx.session.secondText);
          ctx.session.button = null;
          ctx.session.textFirst_problem1 = null;
          ctx.session.textSecond_problem1 = null;
      }
  })};

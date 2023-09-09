import { InlineKeyboard, Keyboard } from "grammy";

export const mainMenu = new InlineKeyboard()
  .text('Інтернет підключення', 'ethernet').row()
  .text('Не працює сайт', 'site').row()
  .text('Проблема з шаблонами СумДУ', 'templates').row()
  .text('Інша проблема', 'other').row();

export const ethernetMenuCampus = new InlineKeyboard()
  .text('СумДу', 'ethernet_sumdu').row()
  .text('Мед', 'ethernet_med').row()
  .text('Уабс', 'ethernet_uabs').row();

export const ethernetCorpusSumdu = new InlineKeyboard()
  .text('Г', 'button1')
  .text('Ц', 'button2').row()
  .text('БІЦ', 'button3')
  .text('ЕТ', 'button4').row()
  .text('ЛА', 'button5')
  .text('ЛБ', 'button4').row()
  .text('T', 'button5')
  .text('М', 'button4').row()
  .text('Н', 'button5')

export const ethernetCorpusMed = new InlineKeyboard()
  .text('Кнопка 6', 'button6').row()
  .text('Кнопка 7', 'button7').row()
  .text('Кнопка 8', 'button8').row()
  .text('Кнопка 9', 'button9').row()
  .text('Кнопка10', 'button10').row();

export const ethernetCorpusUabs = new InlineKeyboard()
  .text('Кнопка11', 'button11').row()
  .text('Кнопка12', 'button12').row()
  .text('Кнопка13', 'button13').row()
  .text('Кнопка14', 'button14').row()
  .text('Кнопка15', 'button15').row();

export const backButton = new Keyboard().text("Назад").resized().oneTime();
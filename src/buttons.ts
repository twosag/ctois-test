import { InlineKeyboard, Keyboard } from "grammy";
import { Context } from "grammy";

export const mainMenu = new InlineKeyboard()
  .text('🌐 Відсутнє інтернет підключення', 'ethernet').row()
  .text('🖥 Не працює сайт', 'site').row()
  .text('📄 Проблема з шаблонами СумДУ', 'templates').row()
  .text('✏️ Інша проблема', 'other')
  .text('📞 Телефоний довідник', 'phone').row()
  .text('⤴️ Головна сторінка ЦТОІС', 'ctois');

export const ethernetMenuCampus = new InlineKeyboard()
  .text('Головний кампус СумДУ', 'Головний кампус СумДУ').row()
  .text('Кампус Медичного інституту', 'Кампус Медичного інституту').row()
  .text('Кампус ННІ БТ "УАБС" та ННІП', 'Кампус ННІ БТ \"УАБС\" та ННІП').row();

export const ethernetCorpusSumdu = new InlineKeyboard()
  .text('Г', 'Г')
  .text('Ц', 'Ц').row()
  .text('БІЦ', 'БІЦ')
  .text('ЕТ', 'ЕТ').row()
  .text('ЛА', 'ЛА')
  .text('ЛБ', 'ЛБ').row()
  .text('T', 'T')
  .text('М', 'М').row()
  .text('Н', 'Н')

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

export const backButton = new InlineKeyboard().text("Головне меню","Головне меню");




import { InlineKeyboard} from "grammy";

export const mainMenu = new InlineKeyboard()
  .text('🌐 Відсутнє інтернет підключення', 'ethernet').row()
  .text('🖥 Не працює сайт', 'site').row()
  .text('📄 Проблема з шаблонами СумДУ', 'templates').row()
  //.text('✏️ Інша проблема', 'other')
  .text('📞 Телефоний довідник', 'phone').row()
  .text('⤴️ Головна сторінка ЦТОІС', 'ctois');

export const ethernetMenuCampus = new InlineKeyboard()
  .text('Головний кампус СумДУ', 'Головний кампус СумДУ').row()
  .text('Кампус Медичный інститут', 'Медичный інститут').row()
  .text('Кампус ННІ БТ \"УАБС\" та ННІП', 'Кампус ННІ БТ \"УАБС\" та ННІП').row();

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
  .text('Корпус \"Медичний інститут\"', 'Корпус \"Медичний інститут\"').row()
  .text('Стоматологічний корпус', 'Стоматологічний корпус').row()
  .text('Адміністративна будівля', 'Адміністративна будівля').row()
  .text('Теоретичний корпус', 'Теоретичний корпус').row();

export const ethernetCorpusUabs = new InlineKeyboard()
  .text('Конгрес ЦЕНТР', 'Конгрес ЦЕНТР').row()
  .text('Корпус 1', 'Корпус 1')
  .text('Корпус 2', 'Корпус 2').row()
  .text('Корпус 2А', 'Корпус 2А')
  .text('Корпус 3', 'Корпус 3').row()
  .text('Спортлайн', 'Спортлайн')
  .text('Манеж', 'Манеж').row()
  .text('Медичний корпус', 'Медичний корпус')

export const backButton = new InlineKeyboard().text("Головне меню","Головне меню");




import { InlineKeyboard } from "grammy";
import { Menu } from "@grammyjs/menu";


export const problemMenu = new InlineKeyboard ([
    [{ text: 'Інтернет підключення ', callback_data: 'wifi_problem' }],
    [{ text: 'Не працює сайт', callback_data: 'site_problem' }],
    [{ text: 'Шаблони СумДУ', callback_data: 'templates_problem' }],
    [{ text: 'Інше питання', callback_data: 'another_problem' }],
])

export const institutionsMenu = new InlineKeyboard ([
  [{ text: 'Головна площадка СумДУ', callback_data: 'sumdu' }],
  [{ text: 'Медичний інститут', callback_data: 'med' }],
  [{ text: 'Інститут \"Уабс\"', callback_data: 'uabs' }],
])

export const sumduMenu = new InlineKeyboard ([
    [{ text: 'Г', callback_data: 'G' }],
    [{ text: 'БІЦ', callback_data: 'BIC' }],
    [{ text: 'Ц', callback_data: 'C' }],
    [{ text: 'ЕТ', callback_data: 'ET' }],
    [{ text: 'ЛА', callback_data: 'LA' }],
    [{ text: 'ЛБ', callback_data: 'LB' }],
    [{ text: 'Т', callback_data: 'T' }],
    [{ text: 'М', callback_data: 'M' }],
    [{ text: 'Н', callback_data: 'N' }],
    [{ text: 'Басейн', callback_data: 'Basein' }],
    [{ text: 'Їдальня', callback_data: 'Idalnya' }],
])
export const medMenu = new InlineKeyboard ([
    [{ text: 'Корпус \"Медичний інститут\" ', callback_data: 'med_inst' }],
    [{ text: 'Науково-виробничий центр \"Стоматологія\"', callback_data: 'med_stomat' }],
    [{ text: 'Адміністративна будівля', callback_data: 'med_admin_buld' }],
])
export const uabsMenu = new InlineKeyboard ([
    [{ text: 'Конгрес Центр', callback_data: 'kongres_center' }],
    [{ text: 'Медичний корпус', callback_data: 'uabs_med_corpus' }],
    [{ text: 'Корпус 1', callback_data: 'uabs_corpus_1' }],
    [{ text: 'Корпус 2', callback_data: 'uabs_corpus_2' }],
    [{ text: 'Копус 2А', callback_data: 'uabs_corpus_2a' }],
    [{ text: 'Корпус 3', callback_data: 'uabs_corpus_3' }],
    
])







import * as button from "./buttons";


export const first_menu = new Menu("first_menu")
  .submenu("Інтернет підключення", button.INTERNET_CONNECTION).row()
  .submenu("Не працює сайт", button.SITE_PROBLEM).row()
  .submenu("Шаблони СумДУ", button.TEMPLATES_PROBLEM).row()
  .submenu("Інше питання", button.ANOTHER_PROBLEM).row()

 const institut_menu  = new Menu("institut_menu")
  .submenu("Головна площадка СумДУ", "sumdu_menu")
  .submenu("Медичний інститут", "institut_menu1")
  .submenu("Інститут \"Уабс\"", "institut_menu1")
  .back("Повернутися назад");

 const sumdu_menu  = new Menu("sumdu_menu")
  .submenu("Реквізити", "credits-menu")
  .back("Повернутися назад");

  
first_menu.register(institut_menu);
institut_menu.register(sumdu_menu);





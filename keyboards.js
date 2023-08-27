/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uabsMenu = exports.medMenu = exports.sumduMenu = exports.institutionsMenu = exports.problemMenu = void 0;
const grammy_1 = require("grammy");
exports.problemMenu = new grammy_1.InlineKeyboard([
    [{ text: 'Інтернет підключення', callback_data: 'wifi_problem' }],
    [{ text: 'Не працює сайт', callback_data: 'site_problem' }],
    [{ text: 'Шаблони СумДУ', callback_data: 'templates_problem' }],
    [{ text: 'Інше питання', callback_data: 'another_problem' }],
]);
exports.institutionsMenu = new grammy_1.InlineKeyboard([
    [{ text: 'Головна площадка СумДУ', callback_data: 'sumdu' }],
    [{ text: 'Медичний інститут', callback_data: 'med' }],
    [{ text: 'Інститут \"Уабс\"', callback_data: 'uabs' }],
]);
exports.sumduMenu = new grammy_1.InlineKeyboard([
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
]);
exports.medMenu = new grammy_1.InlineKeyboard([
    [{ text: 'Корпус \"Медичний інститут\" ', callback_data: 'med_inst' }],
    [{ text: 'Науково-виробничий центр \"Стоматологія\"', callback_data: 'med_stomat' }],
    [{ text: 'Адміністративна будівля', callback_data: 'med_admin_buld' }],
]);
exports.uabsMenu = new grammy_1.InlineKeyboard([
    [{ text: 'Конгрес Центр', callback_data: 'kongres_center' }],
    [{ text: 'Медичний корпус', callback_data: 'uabs_med_corpus' }],
    [{ text: 'Корпус 1', callback_data: 'uabs_corpus_1' }],
    [{ text: 'Корпус 2', callback_data: 'uabs_corpus_2' }],
    [{ text: 'Копус 2А', callback_data: 'uabs_corpus_2a' }],
    [{ text: 'Корпус 3', callback_data: 'uabs_corpus_3' }],
]);
*/
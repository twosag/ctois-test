import { InlineKeyboard, Keyboard } from "grammy";

export const mainMenu = new InlineKeyboard()
  .text('Проблема 1', 'problem1').row()
  .text('Проблема 2', 'problem2').row()
  .text('Проблема 3', 'problem3').row()
  .text('Проблема 4', 'problem4').row();

export const problem1Menu = new InlineKeyboard()
  .text('Выбор1', 'choice1').row()
  .text('Выбор2', 'choice2').row()
  .text('Выбор3', 'choice3').row();

export const choice1Menu = new InlineKeyboard()
  .text('Кнопка 1', 'button1').row()
  .text('Кнопка 2', 'button2').row()
  .text('Кнопка 3', 'button3').row()
  .text('Кнопка 4', 'button4').row()
  .text('Кнопка 5', 'button5').row();

export const choice2Menu = new InlineKeyboard()
  .text('Кнопка 6', 'button6').row()
  .text('Кнопка 7', 'button7').row()
  .text('Кнопка 8', 'button8').row()
  .text('Кнопка 9', 'button9').row()
  .text('Кнопка10', 'button10').row();

export const choice3Menu = new InlineKeyboard()
  .text('Кнопка11', 'button11').row()
  .text('Кнопка12', 'button12').row()
  .text('Кнопка13', 'button13').row()
  .text('Кнопка14', 'button14').row()
  .text('Кнопка15', 'button15').row();

export const backButton = new Keyboard().text("Назад").resized().oneTime();
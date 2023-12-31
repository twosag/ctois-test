
import dotenv from "dotenv";
dotenv.config();

const site_admin = process.env.SITE_ADMIN as string;

export async function replyEthernet(
    problem: string, 
    institut?: string, 
    corpus?: string,
    kafedra?: string, 
    room_number?: string, 
    comp_number?: string, 
    username?: string, 
    first_name?: any,) {
        return `🚩*Нове повідомлення про проблему від:* ${username ? '@' + username : first_name}\n
*Дані від користувача:*
*- Проблема:* \`${problem}\`
*- Інститут:* ${institut}
*- Корпус:* ${corpus}
*- Кафедра:* ${kafedra}
*- Кабінет* ${room_number}
*- Інвентарний номер комп'ютера:* ${comp_number}\n
@${site_admin}`;
}

export async function replySite(
    problem: string, 
    url: string, 
    username?: string, 
    first_name?: any, ) {
        return `🚩*Нове повідомлення про проблему від:* ${username ? '@' + username : first_name}\n
*Дані від користувача:*
*- Проблема:* \`${problem}\`
*- Домен сайту:* ${url}\n
@${site_admin}`;
}
import { MyContext } from "../bot";
import dotenv from "dotenv";
dotenv.config();

const site_admin = process.env.SITE_ADMIN as string;

export async function replyEthernet(
    problem: string, 
    institut: string | undefined, 
    corpus: string | undefined, 
    room_number?: string, 
    comp_number?: string, 
    username?: string, 
    first_name?: any, 
    last_name?: any,) {
        return `😊*Повідомлення від користувача:* @${username}\n*Проблема:* \`${problem}\`\n*Інститут:* ${institut}\n*Корпус:* ${corpus}\n*Кабінет* ${room_number}\n*Інвентарний номер комп'ютера:* ${comp_number}\n@${site_admin}`;
}

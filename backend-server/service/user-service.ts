import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "../supabase";
import mailService from "./mail-service";
import tokenService from "./token-service";
import userDTO from '../dtos/user-dto';

class UserService {
    async registration(email: string, password: string) {
        // Проверка существующего пользователя
        const { data: existingUser, error: findError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) throw new Error(`Пользователь с email ${email} уже существует`);

        // Создание пользователя
        const hashedPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([{
                email,
                password: hashedPassword,
                activation_link: activationLink
            }])
            .select()
            .single();

        if (createError) throw new Error(createError.message);

        // Отправка письма активации
        await mailService.sendActivationEmail(email, activationLink);

        // Генерация токенов
        const userDto = new userDTO(newUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(newUser.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink: string) {
        const { data: user, error } = await supabase
            .from('users')
            .update({ is_activated: true })
            .eq('activation_link', activationLink)
            .select()
            .single();

        if (error || !user) throw new Error('Некорректная ссылка активации');
        return user;
    }
}

export default new UserService();
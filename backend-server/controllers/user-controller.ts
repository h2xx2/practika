import { Request, Response, NextFunction } from 'express';
import userService from "../service/user-service";
import mailService from "../service/mail-service";
import tokenService from "../service/token-service";
import UserDTO from "../dtos/user-dto";
import bcrypt from "bcrypt";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from 'uuid';

class UserController {
    // Изменили сигнатуру метода registration для использования Express‑объектов
    async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Извлекаем данные из тела запроса
            const { email, password } = req.body;
            console.log('Request body:', req.body);

            // 1. Проверка существующего пользователя
            const { data: existingUsers, error: findError } = await supabase
                .from('users')
                .select('id')
                .eq('email', email);

            if (existingUsers?.length) {
                // Можно отправлять ошибку с кодом 400 или 409 (Conflict)
                res.status(409).json({ error: `User ${email} already exists` });
                return;
            }

            // 2. Подготовка данных
            const hashedPassword = await bcrypt.hash(String(password), 10);
            const activationLink = uuidv4();

            // 3. Создаем простой объект для вставки
            const userData = {
                email,
                password: hashedPassword,
                activation_link: activationLink,
                is_activated: false
            };
            console.log('User data to insert:', userData);
            // Можно временно использовать util.inspect для логирования без ошибок сериализации:
            // import util from 'util';
            // console.log('User data to insert:', util.inspect(userData, { depth: null }));

            // 4. Вставка данных с явным указанием возвращаемых полей
            const { data: newUser, error } = await supabase
                .from('users')
                .insert([userData])
                .select(`
                    id,
                    email,
                    is_activated
                `)
                .single();

            if (error) {
                throw error;
            }

            // 5. Генерация токенов с безопасным payload
            const tokens = tokenService.generateTokens({
                id: newUser.id,
                email: newUser.email
            });

            // 6. Возвращаем только простые данные
            res.json({
                ...tokens,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    isActivated: newUser.is_activated
                }
            });
        } catch (error) {
            console.error('Registration error:', error instanceof Error ? error.message : error);
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Реализуйте логику логина здесь
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Реализуйте логику логаута здесь
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    async activate(req: Request<{ link: string }>, res: Response, next: NextFunction): Promise<void> {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            res.redirect(process.env.CLIENT_URL!);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Реализуйте логику обновления токенов здесь
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.json(['123', '456']);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}

export default new UserController();

import { createClient } from "@supabase/supabase-js";
import express, { Request, Response } from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://gkkkrbaozpliebuwierr.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials in environment variables!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

const corsOptions = {
    origin: 'http://localhost:5174', // Разрешаем запросы с этого источника (из вашего фронтенда)
    methods: ['GET', 'POST'], // Разрешаем только определенные методы
    allowedHeaders: ['Content-Type'], // Разрешаем только необходимые заголовки
};

app.use(cors(corsOptions)); // Применяем настройки CORS

app.use(express.json()); // Для парсинга JSON в теле запроса

app.use(express.json());

app.get('/user', async (req: Request, res: Response): Promise<void> => {
    try {
        const {login, password} = req.body;
        let { data: usersResultUnivercity, error } = await supabase
            .from('usersResultUnivercity')
            .select('*')
            .eq('login', login)
            .eq('password', password)

        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
            return;
        }

        console.log('Users:', usersResultUnivercity);
        res.json(usersResultUnivercity);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).send('Unexpected error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

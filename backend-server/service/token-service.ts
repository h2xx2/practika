import jwt from "jsonwebtoken";
import { supabase } from "../supabase";

class TokenService {
    generateTokens(payload: object) {
        const safePayload = JSON.parse(JSON.stringify(payload, (_, value) => {
            // Удаляем циклические ссылки
            if (typeof value === 'object' && value !== null) {
                return Object.fromEntries(
                    Object.entries(value).filter(([key]) => !key.startsWith('_'))
                );
            }
            return value;
        }));

        return {
            accessToken: jwt.sign(safePayload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30m' }),
            refreshToken: jwt.sign(safePayload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' })
        };
    }

    async saveToken(userId: string, refreshToken: string) {
        const { data, error } = await supabase
            .from('tokens')
            .upsert({ user_id: userId, refresh_token: refreshToken });

        if (error) throw new Error(error.message);
        return data;
    }

    async removeToken(refreshToken: string) {
        const { error } = await supabase
            .from('tokens')
            .delete()
            .eq('refresh_token', refreshToken);

        if (error) throw new Error(error.message);
    }
}

export default new TokenService();
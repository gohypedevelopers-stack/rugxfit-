import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
    userId: number;
}

export async function getUserFromRequest(
    req: NextRequest
): Promise<AuthPayload | null> {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return null;
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET || 'secret'
        ) as AuthPayload;
        return payload;
    } catch (error) {
        return null;
    }
}

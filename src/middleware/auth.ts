import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../types/user';

const authPaths = ['/api/auth/profile'];

const pathBasedAuth = (req: Request, res: Response, next: NextFunction) => {
    if (authPaths.includes(req.originalUrl)) {
        auth(req, res, next);
    }
    else {
        next();
    }
};

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] as string;
    if (!token) {
        res.status(401).json({
            message: 'Unauthenticated.',
            data: [],
            errors: []
        });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as User;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Unauthenaticated.',
            data: [],
            errors: []
        });
    }
};

export default pathBasedAuth;
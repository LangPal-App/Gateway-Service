import { IncomingMessage } from 'http';
import { Request, RequestHandler, Response } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const CORS_ORIGIN = process.env.FRONTEND_ORIGIN || '*';

const handleProxyResponse = (proxyRes: IncomingMessage, req: Request, res: Response): void => {
    for (const [key, value] of Object.entries(proxyRes.headers)) {
        if (value !== undefined) {
            res.setHeader(key, value as string | string[]);
        }
    }

    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.status(proxyRes.statusCode || 500);

    proxyRes.pipe(res);
};

export const createServiceProxy = (service: string): RequestHandler => {
    return createProxyMiddleware({
        target: service,
        changeOrigin: true,
        selfHandleResponse: true,
        on: {
            proxyReq: fixRequestBody,
            proxyRes: handleProxyResponse,
        },
    });
}
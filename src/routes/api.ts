import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import pathBasedAuth from '../middleware/auth';
import services from '../config/services';

const router = express.Router();

router.use('/auth', pathBasedAuth, createProxyMiddleware({
    target: services.authService,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: { '^/': '/api/' },
    on: {
        proxyReq: fixRequestBody,
        proxyRes: (proxyRes, req, res) => {
            res.status(proxyRes.statusCode || 500);
            res.setHeader('Content-Type', 'application/json');
            proxyRes.pipe(res);
        },
    },
}));

export default router;
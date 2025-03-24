import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import pathBasedAuth from '../middleware/auth';
import services from '../config/services';

const router = express.Router();

router.use('/auth', pathBasedAuth, createProxyMiddleware({
    target: services.authService,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/' },
    on: {
        proxyReq: fixRequestBody,
    },
}));

export default router;
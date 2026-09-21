import express from 'express';
import pathBasedAuth from '../middleware/auth';
import services from '../config/services';
import { createServiceProxy } from '../middleware/proxy';

const router = express.Router();

router.use('/auth', pathBasedAuth, createServiceProxy(services.authService));

router.use('/chat-service', pathBasedAuth, createServiceProxy(services.palsService));

export default router;
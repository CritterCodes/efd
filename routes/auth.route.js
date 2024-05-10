import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);

export default router;

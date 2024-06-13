// [efd]/routes/auth.route.js
import { Router } from 'express';
import {
    login,
    signup
} from '../controllers/auth.controller.js';
import authenticateToken from '../middleware/authenticate.js';

const authRouter = Router();

authRouter.post('/auth/login', login);
authRouter.post('/auth/register', signup);
authRouter.get('/auth/status', authenticateToken, (req, res) => {
    res.json({ isAuthenticated: true });
});

export default authRouter;

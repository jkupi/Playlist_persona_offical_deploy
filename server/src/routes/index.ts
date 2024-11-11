import { Router } from 'express';
import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js';
// import { authenticateToken } from '../middleware/auth.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// router.get("/", (_req, res) => {
//     res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
// });

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

export default router;

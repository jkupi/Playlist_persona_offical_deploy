import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { playlistRouter } from './playlist-routes.js';
import { questionsRouter } from '../../routes/api/generateQuestionsRoute.js'

const router = Router();

router.use('/users', userRouter);
router.use('/playlists', playlistRouter);
router.use('/', questionsRouter);

export default router;

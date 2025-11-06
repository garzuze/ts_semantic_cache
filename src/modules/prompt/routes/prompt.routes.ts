import express from 'express';
import validateBody from '../../../shared/middlewares/body-validation.middleware';
import { createPrompt } from '../controllers/prompt.controller';
import { PromptDto } from '../dtos/prompt.dto';

const router = express.Router();
router.post('/prompt', validateBody(PromptDto), createPrompt);
export { router as promptRouter };


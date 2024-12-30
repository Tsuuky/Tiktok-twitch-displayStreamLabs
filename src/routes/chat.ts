import { Router } from 'express';
import path from 'path';

const chatRouter = Router();

chatRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'chat.html'));
});

export { chatRouter };

import { Router } from 'express';
import path from 'path';

const giftsRouter = Router();

giftsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'gifts.html'));
});

export { giftsRouter };

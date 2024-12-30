import { Router } from 'express';

const subscribersRouter = Router();

subscribersRouter.get('/', (req, res) => {
    res.sendFile('subscribers.html', { root: __dirname + '/../public' });
});

export { subscribersRouter };

import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { giftsRouter } from './routes/gifts';
import { subscribersRouter } from './routes/subscribers';
import { chatRouter } from './routes/chat';
import { setupTikTokConnection } from './tiktok';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.static('src/public'));

app.use('/gifts', giftsRouter);
app.use('/subscribers', subscribersRouter);
app.use('/chat', chatRouter);

io.on('connection', (socket) => {
    console.log('A user connected');

    // setTimeout(() => {
    //     socket.emit('gift', { username: 'User123', giftName: 'Rose' });
    //     socket.emit('new_subscriber', { username: 'NewSubscriber' });
    //     socket.emit('new_comment', { type: 'tiktok', username: 'ChatUser', comment: 'Hello world!' });
    // }, 2000);
});

setupTikTokConnection(io);

const PORT = 3150;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Server is running on http://localhost:${PORT}/subscribers`);
    console.log(`Server is running on http://localhost:${PORT}/chat`);
    console.log(`Server is running on http://localhost:${PORT}/gifts`);

});

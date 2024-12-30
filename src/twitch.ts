import tmi from 'tmi.js';
import { Server as SocketIOServer } from 'socket.io';
import { sendGiftToFiveM } from './sendToFiveM'; 
import { addLog } from './logs';

const twitchUsername = 'tsuky_76';

const client = new tmi.Client({
    connection: {
        reconnect: true,
        secure: true
    },
    channels: [twitchUsername]
});

export const connectTwitch = (io: SocketIOServer) => {
    client.connect()
        .then(() => {
            console.log(`Connecté à Twitch sur le canal ${twitchUsername}`);
        })
        .catch((err) => {
            console.error('Erreur de connexion Twitch:', err);
        });

    client.on('message', (channel, userstate, message, self) => {
        if (self) return;

        const subscriberData = { username: userstate.username, data: message, type: 'chat' };
    
        console.log('[TWITCH] ', subscriberData.username, subscriberData.data);
        io.emit('new_comment', { type: 'twitch', username: subscriberData.username, comment: subscriberData.data });
        addLog(`[TWITCH] ${subscriberData.username} : ${subscriberData.data}`)

    });

};

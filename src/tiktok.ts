import { WebcastPushConnection } from 'tiktok-live-connector';
import { Server as SocketIOServer } from 'socket.io';
import { sendGiftToFiveM } from './sendToFiveM'; 

const tiktokUsername = '@trippledx';

export const setupTikTokConnection = (io: SocketIOServer) => {
  const connection = new WebcastPushConnection(tiktokUsername);

  connection.connect().then(() => {
    console.log(`Connected to TikTok live stream as ${tiktokUsername}`);
  }).catch(err => {
    console.error('Failed to connect to TikTok:', err);
  });

  connection.on('subscribe', (data) => {
    const subscriberData = { username: data.uniqueId, data: data.uniqueId, type: 'gift' };

    console.log('New subscriber:', subscriberData.username);
    io.emit('new_subscriber', { username: subscriberData.username });
    sendGiftToFiveM(subscriberData);

  });

  connection.on('gift', (data) => {
    const subscriberData = { username: data.uniqueId, data: data.giftName, type: 'gift' };

    console.log('New gift:', subscriberData.username, subscriberData.data);
    io.emit('gift', { username: subscriberData.username, gift: subscriberData.data });
    sendGiftToFiveM(subscriberData);

  });

  connection.on('chat', (data) => {
    const subscriberData = { username: data.uniqueId, data: data.comment, type: 'chat' };

    console.log('[TIKTOK] ', subscriberData.username, subscriberData.data);
    io.emit('new_comment', { type: 'tiktok', username: subscriberData.username, comment: subscriberData.data });
    sendGiftToFiveM(subscriberData);

  });
};

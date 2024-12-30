import axios from 'axios';

export const sendGiftToFiveM = (giftData: { type: string, username: string, data: string }) => {
    const fivemURL = 'https://blaize76-57yg86.users.cfx.re/ts-interactionTiktok';

    axios.post(fivemURL, {
        type: giftData.type,
        username: giftData.username,
        data: giftData.data
    })
    .then(response => {
    })
    .catch(error => {
    });
};

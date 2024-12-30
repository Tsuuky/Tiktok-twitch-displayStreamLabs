import axios from 'axios';

export const sendGiftToFiveM = (giftData: { type: string, username: string, data: string }) => {
    const fivemURL = 'INSERT YOUR API KEY';

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

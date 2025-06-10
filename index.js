const qrcode = require('qrcode-terminal'); 
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();
const port = 3000;

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Client is ready!');
});

client.on('message', message => {
    const text = message.body.toLowerCase();
    const keywords = ['happy birthday', 'जन्मदिवस', 'जन्मदिन', 'शुभकामनाएं', 'happy birtday'];

    if (keywords.some(keyword => text.includes(keyword))) {
        message.reply('बहुत-बहुत धन्यवाद 😊🙏💐 आपकी शुभकामनाएँ अनमोल हैं! ✨');
    }
});

app.get('/', (req, res) => {
    res.send('WhatsApp Bot is running!');
});

app.listen(port, () => {
    console.log(`🚀 Express Server Running on port ${port}`);
});

client.initialize();

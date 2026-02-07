const { Client, GatewayIntentBits } = require('discord.js');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function updateStatus(isOnline) {
    await db.collection('bot_status').doc('status').set({
        online: isOnline,
        last_seen: Date.now(),
        server_count: client.guilds.cache.size || 0
    });
}

client.once('ready', () => {
    console.log('Bot is live!');
    updateStatus(true);
    // Send heartbeat every 1 minute
    setInterval(() => updateStatus(true), 60000);
});

client.login('MTM5MzIwMTUyMzk5OTM3NTQ2Mw.GPhgB5.TRa7Ber3X4C7fOEXTen26cNMU4RusWFDV_beUI');

// --- Keeping Render Awake Hack ---
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is Running!'));
app.listen(process.env.PORT || 3000);
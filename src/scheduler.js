const cron = require("node-cron");
const { checkShop } = require("./shop");

function scheduleShopCheck(client) {
    const channelId = process.env.CHANNEL_ID;
    console.log(`📋 Watchlist loaded`);
    console.log(`⏰ Auto-check daily at 5:05 AM PKT`);

    // Daily check at 5:05 AM PKT (00:05 UTC — right after shop reset)
    cron.schedule("5 5 * * *", async () => {
        const channel = client.channels.cache.get(channelId);
        if (channel) await checkShop(channel);
    });
}

module.exports = { scheduleShopCheck };

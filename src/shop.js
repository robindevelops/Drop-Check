const axios = require("axios");
const { watchlist } = require("./watchlist");
const API_URL = "https://fortnite-api.com/v2/shop";

async function checkShop(channel) {
    try {
        const res = await axios.get(API_URL);
        const entries = res.data.data.entries;

        if (!channel) return console.error("❌ Channel not found!");

        const items = watchlist.list();
        if (!items.length) {
            return channel.send("📋 Watchlist is empty. Use `!watch <item>` to add items.");
        }

        const results = items.map((item) => {
            const search = item.toLowerCase();
            const found = entries.some((entry) => {
                if (entry.layout?.name?.toLowerCase().includes(search)) return true;
                if (entry.bundle?.name?.toLowerCase().includes(search)) return true;
                const allItems = [
                    ...(entry.brItems || []),
                    ...(entry.cars || []),
                    ...(entry.tracks || []),
                ];
                return allItems.some((i) => i.name?.toLowerCase().includes(search));
            });
            return found ? `✅ **${item}** is in the shop!` : `❌ **${item}** — not today.`;
        });

        await channel.send(`🎮 **Item Shop Check**\n${results.join("\n")}`);
        console.log("📨 Results sent to Discord!");
    } catch (err) {
        console.error("Error checking shop:", err.message);
    }
}

module.exports = { checkShop };

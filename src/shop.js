const axios = require("axios");
const { watchlist } = require("./watchlist");
const { fuzzyMatch } = require("./fuzzy");
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

        // Collect ALL item names from the shop into one flat list
        const allShopNames = [];
        for (const entry of entries) {
            if (entry.layout?.name) allShopNames.push(entry.layout.name);
            if (entry.bundle?.name) allShopNames.push(entry.bundle.name);
            for (const i of [
                ...(entry.brItems || []),
                ...(entry.cars || []),
                ...(entry.tracks || []),
            ]) {
                if (i.name) allShopNames.push(i.name);
            }
        }

        const results = items.map((item) => {
            const found = fuzzyMatch(item, allShopNames);
            return found ? `✅ **${item}** is in the shop!` : `❌ **${item}** — not today.`;
        });

        await channel.send(`🎮 **Item Shop Check**\n${results.join("\n")}`);
        console.log("📨 Results sent to Discord!");
    } catch (err) {
        console.error("Error checking shop:", err.message);
    }
}

module.exports = { checkShop };

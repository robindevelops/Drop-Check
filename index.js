require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");
const { Client, GatewayIntentBits } = require("discord.js");

// ⚙️ Configuration
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// Watchlist
let watchlist = ["Star Wand"];

// Discord Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Bot Ready
client.on("ready", () => {
    console.log(`🤖 Bot online: ${client.user.tag}`);
    console.log(`📋 Watchlist: ${watchlist.join(", ")}`);
    console.log(`⏰ Auto-check daily at 5:05 AM PKT`);

    // Daily check at 5:05 AM PKT (00:05 UTC - right after shop reset)
    cron.schedule("5 5 * * *", () => checkShop());
});

// Commands
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const msg = message.content.trim();
    const cmd = msg.toLowerCase();

    if (cmd.startsWith("!watch ")) {
        const item = msg.slice(7).trim();
        if (!item) return message.reply("❌ Usage: `!watch Star Wand`");
        if (watchlist.some((w) => w.toLowerCase() === item.toLowerCase())) {
            return message.reply(`⚠️ **${item}** is already on your watchlist.`);
        }
        watchlist.push(item);
        message.reply(`✅ Added **${item}**\n📋 Watchlist: ${watchlist.join(", ")}`);
    } else if (cmd.startsWith("!unwatch ")) {
        const item = msg.slice(9).trim();
        const i = watchlist.findIndex((w) => w.toLowerCase() === item.toLowerCase());
        if (i === -1) return message.reply(`❌ **${item}** not found in watchlist.`);
        watchlist.splice(i, 1);
        message.reply(`🗑️ Removed **${item}**\n📋 Watchlist: ${watchlist.length ? watchlist.join(", ") : "Empty"}`);
    } else if (cmd === "!list") {
        if (!watchlist.length) return message.reply("📋 Watchlist is empty. Use `!watch <item>` to add.");
        message.reply(`📋 **Watchlist:**\n${watchlist.map((item, i) => `${i + 1}. ${item}`).join("\n")}`);
    } else if (cmd === "!check") {
        message.reply("🔍 Checking the Item Shop...");
        await checkShop(message.channel);
    } else if (cmd === "!help") {
        message.reply(
            "🎮 **Commands:**\n```\n!watch <item>   → Add to watchlist\n!unwatch <item> → Remove from watchlist\n!list           → View watchlist\n!check          → Check shop now\n!help           → Show commands\n```"
        );
    }
});

// Shop Checker
async function checkShop(channel) {
    try {
        const res = await axios.get("https://fortnite-api.com/v2/shop");
        const entries = res.data.data.entries;
        const target = channel || client.channels.cache.get(CHANNEL_ID);

        if (!target) return console.error("❌ Channel not found!");

        const results = watchlist.map((item) => {
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

        await target.send(`🎮 **Item Shop Check**\n${results.join("\n")}`);
        console.log("📨 Results sent to Discord!");
    } catch (err) {
        console.error("Error checking shop:", err.message);
    }
}

// Start
client.login(BOT_TOKEN);

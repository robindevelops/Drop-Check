const { checkShop } = require("./shop");
const { watchlist } = require("./watchlist");

function registerCommands(client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        const msg = message.content.trim();
        const cmd = msg.toLowerCase();

        if (cmd.startsWith("!watch ")) {
            const item = msg.slice(7).trim();
            if (!item) return message.reply("❌ Usage: `!watch Star Wand`");
            if (watchlist.has(item)) {
                return message.reply(`⚠️ **${item}** is already on your watchlist.`);
            }
            watchlist.add(item);
            message.reply(`✅ Added **${item}**\n📋 Watchlist: ${watchlist.list().join(", ")}`);
        } else if (cmd.startsWith("!unwatch ")) {
            const item = msg.slice(9).trim();
            if (!watchlist.has(item)) return message.reply(`❌ **${item}** not found.`);
            watchlist.remove(item);
            const items = watchlist.list();
            message.reply(`🗑️ Removed **${item}**\n📋 Watchlist: ${items.length ? items.join(", ") : "Empty"}`);
        } else if (cmd === "!list") {
            const items = watchlist.list();
            if (!items.length) return message.reply("📋 Watchlist is empty. Use `!watch <item>` to add.");
            message.reply(`📋 **Watchlist:**\n${items.map((item, i) => `${i + 1}. ${item}`).join("\n")}`);
        } else if (cmd === "!check") {
            message.reply("🔍 Checking the Item Shop...");
            await checkShop(message.channel);
        } else if (cmd === "!help") {
            message.reply(
                "🎮 **Commands:**\n```\n!watch <item>   → Add to watchlist\n!unwatch <item> → Remove from watchlist\n!list           → View watchlist\n!check          → Check shop now\n!help           → Show commands\n```"
            );
        }
    });
}

module.exports = { registerCommands };

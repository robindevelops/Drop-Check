require("dotenv").config();
const { client } = require("./src/bot");
const { registerCommands } = require("./src/commands");
const { scheduleShopCheck } = require("./src/scheduler");

// Register bot commands
registerCommands(client);

// Schedule daily shop check
client.on("ready", () => {
    console.log(`🤖 Bot online: ${client.user.tag}`);
    scheduleShopCheck(client);
});

// Start
client.login(process.env.BOT_TOKEN);

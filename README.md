<div align="center">

#Drop Check

### Fortnite Item Shop Tracker — Discord Bot

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord.js" />
  <img src="https://img.shields.io/badge/Fortnite_API-000000?style=for-the-badge&logo=epicgames&logoColor=white" alt="Fortnite API" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License" />
</p>

<p><strong>Never miss your favorite Fortnite item again.</strong><br/>
Drop Check automatically monitors the Fortnite Item Shop daily and alerts you on Discord when watched items appear.</p>

</div>

---

## ✨ Features

<table>
  <tr>
    <td>🔍</td>
    <td><strong>Watchlist System</strong></td>
    <td>Add, remove, and manage items you're tracking</td>
  </tr>
  <tr>
    <td>⏰</td>
    <td><strong>Auto Daily Check</strong></td>
    <td>Automatically checks the shop every day at reset (5:05 AM PKT / 00:05 UTC)</td>
  </tr>
  <tr>
    <td>🛒</td>
    <td><strong>On-Demand Check</strong></td>
    <td>Manually check the current shop anytime with a command</td>
  </tr>
  <tr>
    <td>📦</td>
    <td><strong>Bundle Support</strong></td>
    <td>Searches skins, bundles, cars, tracks, and more</td>
  </tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v16.9.0 or higher
- A [Discord Bot Token](https://discord.com/developers/applications)
- A Discord server with a text channel for notifications

### Installation

```bash
# Clone the repository
git clone https://github.com/robindevelops/Drop-Check.git
cd Drop-Check

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
BOT_TOKEN=your_discord_bot_token_here
CHANNEL_ID=your_discord_channel_id_here
```

| Variable     | Description                                      |
|-------------|--------------------------------------------------|
| `BOT_TOKEN`  | Your Discord bot token from the Developer Portal |
| `CHANNEL_ID` | The ID of the channel for shop notifications     |

### Run the Bot

```bash
# Production
npm start

# Development (auto-restart on changes)
npm run dev
```

---

## 🤖 Commands

| Command              | Description                          |
|----------------------|--------------------------------------|
| `!watch <item>`      | Add an item to your watchlist        |
| `!unwatch <item>`    | Remove an item from your watchlist   |
| `!list`              | View all items on your watchlist     |
| `!check`             | Manually check the shop right now    |
| `!help`              | Show all available commands          |

### Example Usage

```
You:   !watch Star Wand
Bot:   ✅ Added Star Wand
       📋 Watchlist: Star Wand

You:   !check
Bot:   🔍 Checking the Item Shop...
       🎮 Item Shop Check
       ✅ Star Wand is in the shop!
```

---

## 📁 Project Structure

```
Drop-Check/
├── index.js            # Entry point — boots the bot
├── src/
│   ├── bot.js          # Discord client setup
│   ├── commands.js     # Message command handlers
│   ├── scheduler.js    # Cron job for daily auto-check
│   ├── shop.js         # Fortnite API integration
│   └── watchlist.js    # In-memory watchlist manager
├── .env                # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><a href="https://discord.js.org/">discord.js</a></td>
    <td>Discord bot framework</td>
  </tr>
  <tr>
    <td><a href="https://axios-http.com/">axios</a></td>
    <td>HTTP client for API requests</td>
  </tr>
  <tr>
    <td><a href="https://github.com/node-cron/node-cron">node-cron</a></td>
    <td>Task scheduling for daily checks</td>
  </tr>
  <tr>
    <td><a href="https://fortnite-api.com/">Fortnite API</a></td>
    <td>Item shop data source</td>
  </tr>
  <tr>
    <td><a href="https://github.com/motdotla/dotenv">dotenv</a></td>
    <td>Environment variable management</td>
  </tr>
</table>



<div align="center">
  <p>Built with ❤️ by the localhost Academy</p>
  <p>
    <a href="https://github.com/robindevelops/Drop-Check/issues">Report Bug</a>
    ·
    <a href="https://github.com/robindevelops/Drop-Check/issues">Request Feature</a>
  </p>
</div>

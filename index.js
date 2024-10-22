const express = require("express");
const http = require("http");
const mineflayer = require('mineflayer')
const { pathfinder } = require('mineflayer-pathfinder');
const AutoAuth = require('mineflayer-auto-auth');
const app = express();

app.use(express.json());
app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.repl.co/`);
}, 224000);

function createBot () {
    const bot = mineflayer.createBot({
        host: '', 
        version: false, // }U can replace with 1.16.5 for example, remember to use ', = '1.16.5'
        username: 'UwU',
        port: , 
        plugins: [AutoAuth],
        AutoAuth: 'bot112022'
    })
    bot.loadPlugin(pathfinder);

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        switch (message) {
            case 'pos':
                const pos = bot.entity.position;
                bot.chat(`/tell ${username} Ma position est: X=${Math.floor(pos.x)}, Y=${Math.floor(pos.y)}, Z=${Math.floor(pos.z)}`);
                break;
            case 'drop':
                dropInventory();
                break;
            default:
        }
    });

    bot.once('spawn', () => {
      bot.chat("blurgh")
    });

  async function dropInventory() {
    bot.chat("/me commence à vider son inventaire.");

    for (const item of bot.inventory.items()) {
      await bot.toss(item.type, null, item.count);
    }

    bot.chat("/me vient de vider son inventaire.");
  }

    bot.on('kicked', console.log)
    bot.on('error', console.log, createBot)
    bot.on('end', createBot)
}

createBot()

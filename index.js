const Discord = require("discord.js");
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"], // évite les erreurs avec cache vide
    ws: {
        intents: [
            "GUILDS",
            "GUILD_MESSAGES",
            "GUILD_MEMBERS",
            "GUILD_BANS",
            "GUILD_VOICE_STATES",
            "GUILD_PRESENCES",
            "DIRECT_MESSAGES"
        ]
    }
});

const prefix = '+';

// Collections pour tes commandes et events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// Handlers
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// Quand le bot est prêt
client.once("ready", () => {
    console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
});

// Auto-role quand quelqu’un rejoint
/*client.on("guildMemberAdd", async (member) => {
    try {
        const role = member.guild.roles.cache.find(r => r.name === "开");
        if (!role) {
            console.log(`❌ Le rôle "开" n'existe pas sur ${member.guild.name}`);
            return;
        }
        await member.roles.add(role);
        console.log(`✅ ${member.user.tag} a reçu le rôle "开"`);
    } catch (err) {
        console.error("❌ Erreur en ajoutant le rôle :", err);
    }
});/*/

// Sécurité sur les messages
client.on("message", async (message) => {
    if (!message.guild) return; // ignore DM
    if (!message.author) return; // ignore si pas d'auteur
    if (message.author.bot) return; // ignore les bots
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    // Vérifie si la commande existe
    const command = client.commands.get(cmd);
    if (command) {
        try {
            await command.execute(client, message, args, Discord);
        } catch (err) {
            console.error(`[ERREUR COMMANDE] ${cmd} :`, err);
            message.reply("⚠️ Une erreur est survenue en exécutant cette commande.");
        }
    }
});

client.login(process.env.TOKEN);

const Discord = require("discord.js");
const { getWarns, getMutes } = require("./utils/sanctionsManager");

module.exports = {
    name: "sanctions",
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const { member, channel } = message;
        const tag = `<@${member.id}>`;
        const target = message.mentions.users.first() || (args[0] ? client.users.cache.get(args[0]) : null);

        if (!target) return channel.send(`${tag} mais tu veux voir les sanctions de qui ?`);

        const totalWarns = getWarns(target.id);
        const muteData = getMutes(target.id);

        const embed = new Discord.MessageEmbed()
            .setTitle(`📋 Sanctions pas uhq de ${target.tag}`)
            .setColor("#FEE75C")
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .addField("⚠️ Warns", `${totalWarns}`, true)
            .addField("🔇 Mutes", `${muteData.count}`, true)
            .addField("⏱️ Temps total mute", `${muteData.totalTime} minutes`, true)
            .setFooter(`Demandé par ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        channel.send(embed).catch(err => {
            console.error("[SANCTIONS] Erreur:", err);
            channel.send(`${tag} jarrive pas a voir les sanctions de pd a ${target.tag}`);
        });
    }
};

const Discord = require("discord.js");

module.exports = {
    name: "stats",
    description: "tu peux voir le nombre de gens en ligne et tout",
    execute(client, message) {
        const { guild, channel, member } = message;

        // Total des membres
        const totalMembers = guild.memberCount;

        // Compter les statuts
        const online = guild.members.cache.filter(m => m.presence?.status === "online").size;
        const idle = guild.members.cache.filter(m => m.presence?.status === "idle").size;
        const dnd = guild.members.cache.filter(m => m.presence?.status === "dnd").size;
        const offline = guild.members.cache.filter(m => !m.presence || m.presence.status === "offline").size;

        // Vocaux
        const voiceCount = guild.members.cache.filter(m => m.voice.channel).size;

        const embed = new Discord.MessageEmbed()
            .setTitle(`📊 Statistiques de ${guild.name}`)
            .setColor("#5865F2")
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addField("👥 Membres totaux", `${totalMembers}`, true)
            .addField("🟢 En ligne", `${online}`, true)
            .addField("🌙 Inactifs", `${idle}`, true)
            .addField("⛔ Ne pas déranger", `${dnd}`, true)
            .addField("⚫ Hors ligne", `${offline}`, true)
            .addField("🎙️ En vocal", `${voiceCount}`, true)
            .setFooter(`Demandé par ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        channel.send(embed).catch(err => {
            console.error("[STATS] Erreur:", err);
            channel.send("ca bug j'arrive pas '");
        });
    }
};

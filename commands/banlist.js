const Discord = require("discord.js");

module.exports = {
    name: 'banlist',
    description: 'c dans le nom fdp',
    async execute(client, message, args) {
        const { member, channel, guild } = message;
        const tag = `<@${member.id}>`;

        // Vérifie la permission
        if (!member.hasPermission('BAN_MEMBERS')) {
            return channel.send(`${tag} tu peux pas tocard :rofl:`);
        }

        try {
            const bans = await guild.fetchBans();

            if (bans.size === 0) {
                return channel.send(`${tag}  ya trop de mecs uhq wallah ya prsn de bl`);
            }

            // Liste propre des bannis
            const banList = bans.map((ban) => ` ${ban.user.tag} (ID: ${ban.user.id})`);

            // Split en pages de 20 (évite la limite de Discord)
            const chunks = [];
            while (banList.length) {
                chunks.push(banList.splice(0, 20).join("\n"));
            }

            // Embed de base
            const embed = new Discord.MessageEmbed()
                .setTitle(`blacklist du serv og ${guild.name}`)
                .setColor("#ED4245") // rouge "ban"
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setFooter(`demandé par ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            // Ajouter les pages
            chunks.forEach((chunk, i) => {
                embed.addField(`Page ${i + 1}`, chunk);
            });

            channel.send(embed);

        } catch (err) {
            console.error(err);
            channel.send(`${tag} wallah jarrive pas `);
        }
    }
};

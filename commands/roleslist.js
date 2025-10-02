const Discord = require("discord.js");

module.exports = {
    name: 'roles',
    description: 'liste de roles trdc',
    async execute(client, message, args) {
        const { member, channel, guild } = message;
        const tag = `<@${member.id}>`;

        try {
            // Trie les rôles par position (haut -> bas)
            const roles = guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => `${role}`);

            if (roles.length === 0) {
                return channel.send(`${tag} rajoute des roles sale merde`);
            }

            // Couper en morceaux de 50 rôles max (éviter la limite 1024 chars dans un field)
            const chunks = [];
            while (roles.length) {
                chunks.push(roles.splice(0, 50).join("\n"));
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`tout les roles uhq sur ${guild.name}`)
                .setColor("#5865F2") // couleur Discord "classy"
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setFooter(`demandé par ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

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

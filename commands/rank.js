const stringSimilarity = require("string-similarity");

module.exports = {
    name: 'rank',
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const { member } = message;

        if (!member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`<@${member.id}> tu peux pas rank tocard :rofl:`);
        }

        const target = message.mentions.members.first();
        if (!target) {
            return message.channel.send(`<@${member.id}> mais tu veux rank qui ?`);
        }

        args.shift(); // enlève la mention
        if (!args[0]) {
            return message.channel.send(`<@${member.id}> mais tu veux donner quel role ?`);
        }

        const roleName = args.join(" ");
        const roles = message.guild.roles.cache.map(r => r.name);
        const bestMatch = stringSimilarity.findBestMatch(roleName, roles).bestMatch;

        if (bestMatch.rating < 0.4) {
            return message.channel.send(`<@${member.id}> ya 0 roles comme ac fdp "${roleName}"`);
        }

        const role = message.guild.roles.cache.find(r => r.name === bestMatch.target);
        if (!role) return message.channel.send(`<@${member.id}> impossible de trouver ton role de merde`);

        if (target.roles.cache.has(role.id)) {
            return message.channel.send(`${target} il a dja le role **${role.name}** sale trdc 🤡`);
        }

        target.roles.add(role)
            .then(() => {
                message.channel.send(`${target} a enfin eu le role **${role.name}** `);
            })
            .catch(err => {
                console.error(err);
                message.channel.send(`<@${member.id}> ca marche pas fdp`);
            });
    }
}

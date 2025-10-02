const stringSimilarity = require("string-similarity");

module.exports = {
    name: 'derank',
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const executor = message.member;
        const authorTag = `<@${executor.id}>`;

        // Permission du lanceur
        if (!executor.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${authorTag} tu peux pas derank tocard :rofl:`);
        }

        // Permission du bot
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.channel.send(`${authorTag} g pas les perms wallah pardon`);
        }

        if (!args[0]) {
            return message.channel.send(`${authorTag} faut mettre son @ ou id et apres le role trdc`);
        }

        // Récupère la cible : mention préférée, sinon recherche par ID/nom partiel
        let target = message.mentions.members.first();
        if (target) {
            // si la première arg est la mention, on l'enlève des args pour garder le nom du rôle
            if (args[0] && args[0].includes('<@')) args.shift();
        } else {
            const possible = args[0];
            const found = message.guild.members.cache.get(possible) ||
                message.guild.members.cache.find(m => 
                    m.user.username.toLowerCase().includes(possible.toLowerCase()) ||
                    (m.nickname && m.nickname.toLowerCase().includes(possible.toLowerCase()))
                );
            if (found) {
                target = found;
                args.shift();
            } else {
                return message.channel.send(`${authorTag} mais tu veux derank qui ?`);
            }
        }

        const roleName = args.join(" ").trim();
        if (!roleName) {
            return message.channel.send(`${authorTag} mais tu veux enlever quel role frro ?`);
        }

        // Fuzzy match sur les noms de rôles
        const roleNames = message.guild.roles.cache.map(r => r.name);
        const bestMatch = stringSimilarity.findBestMatch(roleName, roleNames).bestMatch;

        if (bestMatch.rating < 0.3) { // seuil ajustable
            return message.channel.send(`${authorTag} ya rien qui ressemble a  "${roleName}" (${Math.round(bestMatch.rating * 100)}% match)`);
        }

        const role = message.guild.roles.cache.find(r => r.name === bestMatch.target);
        if (!role) {
            return message.channel.send(`${authorTag} j'arrive pas a prendre le rooooole'`);
        }

        // Vérifie que le bot peut gérer ce rôle (position dans la hiérarchie)
        if (role.position >= message.guild.me.roles.highest.position) {
            return message.channel.send(`${authorTag} g pas les perms wallah pardon **${role.name}** c au dessus de moi wallah`);
        }

        // Vérifie si la cible a déjà le rôle
        if (!target.roles.cache.has(role.id)) {
            return message.channel.send(`${target} il a meme pas le role **${role.name}** trdc 🤦`);
        }

        // Retire le rôle
        target.roles.remove(role)
            .then(() => {
                return message.channel.send(`${target} il a plus le role **${role.name}** :rofl:`);
            })
            .catch(err => {
                console.error('unrank error:', err);
                return message.channel.send(`${authorTag} c marche pas fdp ca bug wallah`);
            });
    }
};

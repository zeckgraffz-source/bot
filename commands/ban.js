module.exports = {
    name: 'bl',
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const { member } = message;
        const tag = `<@${member.id}>`;
        const target = message.mentions.users.first();

        if (!member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`${tag} tu peux pas tocard :rofl:`);
        }

        if (!target) {
            return message.channel.send(`${tag} mais tu veux ban qui ?`);
        }

        const memberTarget = message.guild.members.cache.get(target.id);

        if (!memberTarget) {
            return message.channel.send(`${tag} cette personne n'est pas sur le serveur.`);
        }

        // V�rif hi�rarchie des r�les
        if (member.roles.highest.position <= memberTarget.roles.highest.position) {
            return message.channel.send(`${tag} tu peux pas ban <@${memberTarget.user.id}> trdc il a le meme role ou est plus haut classe que toi`);
        }

        // V�rif si le bot peut ban (�viter le "Missing Permissions")
        if (!memberTarget.bannable) {
            return message.channel.send(`${tag} je peux pas ban <@${memberTarget.user.id}> il est au dessu de mwa wallah ctrop frr jai pas de perms `);
        }

        // Ex�cution du ban
        memberTarget.ban()
            .then(() => {
                message.channel.send(`${tag}, <@${memberTarget.user.id}> y c f ban ctocard`);
            })
            .catch(err => {
                console.error(err);
                message.channel.send(`${tag} ya une erreur jai pas reussie mfrr`);
            });
    }
};

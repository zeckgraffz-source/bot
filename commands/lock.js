module.exports = {
    name: 'lock',
    description: 'c dans le nom fdp',
    async execute(client, message, args) {
        const { member, channel, guild } = message;
        const tag = `<@${member.id}>`;

        // Vérifie que l'utilisateur a les perms
        if (!member.hasPermission('MANAGE_CHANNELS')) {
            return channel.send(`${tag} tu peux pas tocard :rofl:`);
        }

        // Rôles autorisés à écrire même quand c'est lock
        const allowedRoles = ['⭐', '👑', 'perm wlh'];

        try {
            // Empêche @everyone d'envoyer des messages
            await channel.updateOverwrite(guild.roles.everyone, {
                SEND_MESSAGES: false
            });

            // Autorise les rôles choisis à écrire
            allowedRoles.forEach(roleName => {
                const role = guild.roles.cache.find(r => r.name === roleName);
                if (role) {
                    channel.updateOverwrite(role, {
                        SEND_MESSAGES: true
                    });
                }
            });

            channel.send(`${tag}cbon jai lock wallah ya keu (${allowedRoles.join(', ')}) qui sont uhq qui ont ldroit fdp de MERDE TOCARD`);
        } catch (err) {
            console.error(err);
            channel.send(`${tag} ca marche pas wallah `);
        }
    }
};

module.exports = {
    name: 'unlock',
    description: 'c dans le nom fdp',
    async execute(client, message, args) {
        const { member, channel, guild } = message;
        const tag = `<@${member.id}>`;

        // Vérifie que l'utilisateur a les perms
        if (!member.hasPermission('MANAGE_CHANNELS')) {
            return channel.send(`${tag} tu peux pas tocard:rofl:`);
        }

        try {
            // Autorise @everyone à écrire de nouveau
            await channel.updateOverwrite(guild.roles.everyone, {
                SEND_MESSAGES: true
            });

            channel.send(`${tag} cbon c unlock bandes de trdc parlez`);
        } catch (err) {
            console.error(err);
            channel.send(`${tag} ca marche pas wallah`);
        }
    }
};

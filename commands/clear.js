module.exports = {
    name: 'clear',
    description: 'ca del les msg',
    async execute(client, message, args) {
        const { member } = message;
        const tag = `<@${member.id}>`;

        // Vérif des permissions
        if (!member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(`${tag} ta pas les perms trdc :rofl:`);
        }

        // Vérif de l'argument
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.channel.send(`${tag} faut mettre un nombre sale con`);
        }

        if (amount < 1 || amount > 100) {
            return message.channel.send(`${tag} tu dois mettre un nombre entre 1 et 100 gros mongol`);
        }

        // Supprime les messages
        try {
            await message.channel.bulkDelete(amount + 1, true); // +1 pour inclure la commande elle-même
            message.channel.send(`${tag} g supp ${amount} messages sale pd`)
                .then(msg => msg.delete({ timeout: 3000 })); // message disparaît après 3 sec
        } catch (err) {
            console.error(err);
            message.channel.send(`${tag}  wallah jarrive pas`);
        }
    }
};

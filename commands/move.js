module.exports = {
    name: "move",
    description: "move les gens ( met la cmd dans la voc ou tu veux qu'il soit move'",
    async execute(client, message, args) {
        const tag = `<@${message.author.id}>`;

        // Vérifie qu'un ID est donné
        if (!args[0]) {
            return message.channel.send(`${tag} mais tu veux move qui ?`);
        }

        const targetId = args[0];
        const targetMember = message.guild.members.cache.get(targetId);

        if (!targetMember) {
            return message.channel.send(`${tag} ya prsn qui a cet id frro`);
        }

        // Vérifie que la cible est dans un vocal
        if (!targetMember.voice.channel) {
            return message.channel.send(`${tag} pas en voc`);
        }

        // Vérifie que l'auteur est bien en vocal
        const authorMember = message.guild.members.cache.get(message.author.id);
        if (!authorMember.voice.channel) {
            return message.channel.send(`${tag} tu dois etre en vocal trdc`);
        }

        try {
            await authorMember.voice.setChannel(targetMember.voice.channel);
            message.channel.send(`${tag} a ete move dans la voc de ${targetMember.user.tag}`);
        } catch (err) {
            console.error(err);
            message.channel.send(`${tag} wallah jarrive pas`);
        }
    }
};

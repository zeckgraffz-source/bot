const { addMute } = require("./utils/sanctionsManager");

module.exports = {
    name: "mute",
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const { member, channel } = message;
        const tag = `<@${member.id}>`;

        if (!member.permissions.has("ADMINISTRATOR")) {
            return channel.send(`${tag} tu peux pas tocard :rofl:`);
        }

        const target = message.mentions.users.first();
        if (!target) {
            return channel.send(`${tag} mais tu veux mute qui ?`);
        }

        // Par défaut mute 5 minutes si aucune durée donnée
        const duration = parseInt(args[1]) || 5;

        const userId = target.id;
        const muteData = addMute(userId, duration);

        channel.send(`${tag}, <@${userId}> a pris un mute de ${duration} minutes ce fdp 
Total : **${muteData.count} mutes**, ${muteData.totalTime} minutes au total`);
    }
};

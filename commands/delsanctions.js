const { resetWarns, resetMutes } = require("./utils/sanctionsManager");

module.exports = {
    name: "delsanctions",
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const { member, channel } = message;
        const tag = `<@${member.id}>`;

        if (!member.hasPermission("ADMINISTRATOR")) {
            return channel.send(`${tag} tu peux pas tocard :rofl:`);
        }

        const target = message.mentions.users.first() || (args[0] ? { id: args[0] } : null);
        if (!target) return channel.send(`${tag} mais tu veux del les sanctions de qui ?`);

        const userId = target.id;
        resetWarns(userId);
        resetMutes(userId);

        channel.send(`${tag}, c'est bon <@${userId}> a plus rien il est uhq `);
    }
};

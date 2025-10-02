const { addWarn, getWarns } = require("./utils/sanctionsManager");

module.exports = {
    name: "warn",
    description: "c dans le nom fdp",
    execute(client, message, args) {
        const { member, channel } = message;
        const tag = `<@${member.id}>`;

        if (!member.hasPermission("ADMINISTRATOR")) {
            return channel.send(`${tag} tu peux pas tocard :rofl:`);
        }

        const target = message.mentions.users.first();
        if (!target) return channel.send(`${tag} mais tu veux warn qui ?`);

        const userId = target.id;
        const warns = addWarn(userId);

        if (warns >= 5) {
            message.guild.members.cache.get(userId)?.kick("a 5 warns jte kick ft belek")
                .catch(err => console.error(err));
            channel.send(`${tag}, <@${userId}> ntm fdp jte kick tas 5 warns`);
        } else {
            channel.send(`${tag}, <@${userId}> il a **${warns} warns** ⚠️`);
        }
    }
};

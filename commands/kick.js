
module.exports = {
    name: 'kick',
    description: "c dans le nom fdp",
    execute(client, message, args){
        const { member, mentions} = message
        const tag = `<@${member.id}>`
        const target = message.mentions.users.first();

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            if(target){
                const memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.kick();
                message.channel.send(`<@${member.id}>, <@${memberTarget.user.id}> cbon il est kick ce pd`);
            } else {
                message.channel.send( `<@${member.id}> mais tu veux kick qui?`);
            }
        } else {
            message.channel.send( `<@${member.id}> tu peux pas tocard :rofl:`);
        
        }
        }
    }

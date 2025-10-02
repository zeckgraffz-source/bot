const { member } = require("discord.js")

module.exports = {
    name: 'unmute',
    description: "c dans le nom fdp",
    execute(client, message, args){
        const { member, mentions} = message
        const tag = `<@${member.id}>`
        const target = message.mentions.users.first();
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('MANAGE_ROLES')
        ) {
        if (target) {
 
            let mainRole = message.guild.roles.cache.find(role => role.name === '开');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
           
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`${tag}, <@${memberTarget.user.id}> tlm il etait og il c f unmute`);

        }else{
            message.channel.send(`${tag} mais tu veux unmute qui ?`);
        }
     } else {
            message.channel.send( `${tag} tu peux pas tocard :rofl:`);
        
        }
    }
}

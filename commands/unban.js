
module.exports = {
    name: 'unbl',
    description: "c dans le nom fdp",
    async execute(client, message, args){
        const { member, mentions} = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        )
       if(!args[0]) return message.channel.send(`${message.author} mais tu veux unban qui ?`);
       {
           // Nettoyer l'argument pour récupérer uniquement l'ID
         const userId = args[0].replace(/[<@!>]/g, '');

         const user = await message.guild.members.unban(userId);
         return message.channel.send(`**${user.tag}** tlm il etait og et il s'est fait unban wallah`);

        

       }
    }
}

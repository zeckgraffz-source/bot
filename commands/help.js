module.exports = {
    name: 'help',
    description: "check les cmds lil boi",
    execute(client, message, args) {
        const commands = client.commands.map(cmd => `\`${cmd.name}\` → ${cmd.description}`).join("\n");

        const helpMessage = `
**📖 Liste des commandes :**

${commands}

💡 Utilise \`+help\` pour l’exécuter.
        `;

        message.channel.send(helpMessage);
    }
}

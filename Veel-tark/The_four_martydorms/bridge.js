const { minute, second } = world;
const settings = {
    triggerDistance: 75,
    position: {
        x: 0.0,
        y: 0.0,
        z: 72.0,
    },
    rotation: {
        x: -90,
    },
    translate: {
        y: -66.0,
        z: -66.0
    },
    font: {
        color: `#cc0000`, // red
    },
    key: {
        password: "f",
    },
    password: 'cmVkZW1wdGlvbg==', // used btoa() to encode (use atob() to decode)
    time: 30 * minute,
};

const content = {
    "EN": {
        defaultText: `Press \"${settings.key.password}\" to enter the password`,
        timerText: `Time remaining: `,
        wrongpasswordText: `Wrong password`,
        endedText: `You have run out of time`,
        promptText: `Enter the password:`,
        notStartedText: `Talk to the scarecrow to start the game`,
    },
    "ES": {
        defaultText: `Presione \"${settings.key.password}\" para ingresar la contraseña`,
        timerText: `Tiempo restante: `,
        wrongpasswordText: `Contraseña incorrecta`,
        endedText: `Se te acabó el tiempo`,
        promptText: `Ingrese la contraseña:`,
        notStartedText: `Hable con el espantapájaros para comenzar el juego`,
    },
    "KO": {
        defaultText: `\"${settings.key.password}\"를 눌러 비밀번호를 입력하십시오`,
        timerText: `남은 시간: `,
        wrongpasswordText: `잘못된 비밀번호`,
        endedText: `시간이 다 됐어요`,
        promptText: `비밀번호를 입력하십시오:`,
        notStartedText: `허수아비와 이야기를 나누어 게임을 시작하십시오`,
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
            text: content[world.lang].endedText,
            position: settings.position
        });
        i++;
        return;
    };

    if (world.isStarted) {
        const delta = settings.time - (Date.now() - world.starttime);
        const minutes = Math.floor(delta / minute);
        const seconds = Math.floor((delta - minutes * minute) / second);
        const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        updateText({
            self,
            text: `${content[world.lang].defaultText}\n${content[world.lang].timerText + time}`,
            position: settings.position
        });

        if (delta <= 0) {
            i = 2
            p = null;
        };

    }
    else {
        updateText({
            self,
            text: content[world.lang].notStartedText,
            position: settings.position
        });
    };
});

self.on('keydown', async event => {
    if (self.distanceToPlayer < settings.triggerDistance
    ) {
        const k = event.key.toLowerCase();

        if (world.isStarted
            && i == 1
            && k === settings.key.password
        ) {
            const input = window.prompt(content[world.lang].promptText);
            if (input != atob(settings.password)) {
                updateText({
                    self,
                    text: content[world.lang].wrongpasswordText,
                    position: settings.position
                });
                return;
            };

            i++;
            self.translateZ(settings.translate.z * -1);
            self.translateY(settings.translate.y * -1);
            self.rotateX(toRad(settings.rotation.x) * -1);
            await self.hideText();
            t = null;
            world.isStarted = false;
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
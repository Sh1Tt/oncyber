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
        color: `#ffffff`,
    },
    defaultText: "Press \"e\" to enter the password",
    wrongpasswordText: "Wrong password",
    endedText: "You have run out of time",
    password: "a",
    time: 30 * 60_000,
};

let
    t = null,
    e = null,
    i = 0;

self.on('update', async d => {
    if (i === 3)
        return;

    if (i === 0) {
        e = Date.now() + settings.time;
        self.rotateX(toRad(settings.rotation.x));
        self.translateY(settings.translate.y);
        self.translateZ(settings.translate.z);
        i++;
    };

    if (i === 2) {
        updateText({
            self,
            text: settings.endedText,
            position: settings.position
        });
        i++;
        return;
    };

    if (e) {
        const delta = e - Date.now();
        const minutes = Math.floor(delta / 60_000);
        const seconds = Math.floor((delta - minutes * 60_000) / 1000);
        const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        const text = `${settings.defaultText}.\nTime remaining: ${time}`;

        updateText({
            self,
            text,
            position: settings.position
        });

        if (delta <= 0) {
            i = 2
            e = null;
        };

    };
});

self.on('keydown', async e => {
    if (self.distanceToPlayer < settings.triggerDistance
    ) {
        if (i !== 1)
            return;

        const k = e.key.toLowerCase();

        switch (true) {
            case k === "e":
                p = window.prompt("Enter the password:");
                if (p != settings.password) {
                    updateText({
                        self,
                        text: settings.wrongpasswordText,
                        position: settings.position
                    });
                    return;
                };

                i++;
                self.translateZ(settings.translate.z * -1);
                self.translateY(settings.translate.y * -1);
                self.rotateX(toRad(settings.rotation.x) * -1);
                break;

            default:
                break;
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
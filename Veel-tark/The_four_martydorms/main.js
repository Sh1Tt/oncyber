const second = 1_000;
const minute = 60 * second;

const game = {
    password: 'cmVkZW1wdGlvbg==',
    time: 30 * minute,
    hint_time: 5 * minute,
    key: {
        start: "e",
        encrypt_password: "t",
        password: "f",
        language: "r",
    },
};

const API = {
    audio: file => `https://mauricestolk.nl/api/oncyber/audio/veel-tark/haunted_house/amado/${file}`,
};

let language = "EN";
let isStarted = false;

world.second = second;
world.minute = minute;
world.language = language;
world.game = game;
world.isStarted = isStarted;
world.starttime = null;
world.API = API;

world.on("keydown", e => {
    const k = e.key.toLowerCase();

    if (k === game.key.language) {
        language = (window.prompt("Select language / Selecciona idioma (EN, ES)", language)).toUpperCase();
        world.language = language;
    };

    if (k === game.key.encrypt_password) {
        const input = window.prompt("Enter the password / Introduce la contraseña");
        window.alert(btoa(input));
    };
});
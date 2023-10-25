const second = 1_000;
const minute = 60 * second;

let lang = "EN";
let isStarted = false;

world.second = second;
world.minute = minute;
world.lang = lang;
world.isStarted = isStarted;

world.on("keydown", e => {
    const k = e.key.toLowerCase();

    if (k === "l") {
        lang = window.prompt("Select language / Selecciona idioma (EN, ES)", lang);
        world.lang = lang;
    };

    if (k === "t") {
        const input = window.prompt("Enter the password / Introduce la contraseña");
        window.alert(btoa(input));
    };
});
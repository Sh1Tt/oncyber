const __game = {
    stage: {
        "1": {
            password: "password",
            key: "e",
        },
        "2": {
            password: "password",
            key: "e",
        },
    },
};
const toRad = deg => deg * Math.PI / 180;
const second = 1_000;
const minute = 60 * second;
world.__game = __game;
world.toRad = toRad;
world.second = second;
world.minute = minute;
const stage = "1";

const { toRad } = world;

const glb_settings = {
    triggerDistance: 10,
    step: 0.01,
    translate: 0.006,
};

const __state = {};

__state.angle = 0.182;
__state.x = 0;
__state.z = 0;

const RotateOnLeftY = self => {
    self.rotateY(__state.angle -= glb_settings.step);
    const dx = Math.cos(toRad(__state.angle)) * glb_settings.translate - Math.sin(toRad(__state.angle)) * glb_settings.translate;
    const dz = Math.sin(toRad(__state.angle)) * glb_settings.translate + Math.cos(toRad(__state.angle)) * glb_settings.translate;
    self.translateX(__state.x += dx);
    self.translateZ(__state.z += dz);
};

self.RotateOnLeftY = () => RotateOnLeftY(self);

self.on("update", delta => {
    if (world.__game.stage[stage].isSolved
        && __state.angle > 0
    ) {
        self.RotateOnLeftY();
    };
});

self.on("keydown", async e => {
    if (self.distanceToPlayer < glb_settings.triggerDistance) {
        const k = e.key.toLowerCase();
        const { key, text, password } = world.__game.stage[stage];

        if (k === key) {
            const input = window.prompt(text);
            world.__game.stage[stage].isSolved = input === password;
        };
    };
});
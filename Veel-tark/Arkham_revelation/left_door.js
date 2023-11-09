const stage = "1";

const { toRad } = world;

const glb_settings = {
    step: 0.01,
    translate: 0.006
};

const __state = {};

__state.angle = 0;
__state.x = 0;
__state.z = 0;

const RotateOnRightY = self => {
    self.rotateY(__state.angle -= glb_settings.step);
    const dx = Math.cos(toRad(__state.angle)) * glb_settings.translate - Math.sin(toRad(__state.angle)) * glb_settings.translate;
    const dz = Math.sin(toRad(__state.angle)) * glb_settings.translate + Math.cos(toRad(__state.angle)) * glb_settings.translate;
    self.translateX(__state.x += dx * -1.8);
    self.translateZ(__state.z += dz * 0.5);
};

self.RotateOnRightY = () => RotateOnRightY(self);

self.on("update", delta => {
    if (world.__game.stage[stage].isSolved
        && __state.angle > -0.17
    ) {
        self.RotateOnRightY();
    };
});
// Glb specific settings (Uses self as startingpoint)
const settings = {
    triggerDistance: 5,
    position: {
        x: 2.75,
        y: 2.5,
        z: 0,
    },
    font: {
        color: 0x000000,
    },
};

let t = null; // ref to the objects text

/* Update text if it exists, otherwise create it.
Requires self, text, position and fontColor to be passed as props. */
const updateText = async props => {
    if (t) {
        t.__font.update(props.text);
    }
    else {
        t = await props.self.showText(props.text);
        t.__font.position.copy(new THREE.Vector3(props.position.x, props.position.y, props.position.z,));
        t.color = props.fontColor;
    };
};

// Exqample usage
self.on('update', async delta => {
    if (self.distanceToPlayer < settings.triggerDistance
    && self.isLookedAt
    ) {
        const text = "Hello World!";
        const { position, font } = settings;
        await updateText({ 
            self, 
            text, 
            position,
            fontColor: font.color,
        });
    }
    else if (t) {
        await self.hideText();
        t = null;
    };
});
const settings = {
    txid: `nDM_--R9pQd38LFCzYlKxrMMVsnTjKMsSGi6g0YnXhU`, // set transaction id of the image
    gateway: 'https://arweave.net', // gateway to fetch the image
    scaledown: 200, // scales down the original size (preserves the aspect ratio)
    color: 0x323232, // frame color
    size: null // if not null it will override the scaledown parameter
};

let isLoaded = false;

function deg(r) { return r * 180 / Math.PI };

function loadImage(params) {
    const { txid, gateway, scaledown, color, position, rotation, size } = params;
    const url = `${gateway}/${txid}`;

    world.addImage({
        url: url,
        color: color,
        scaledown: scaledown,
        position: position,
        rotation: rotation,
        needsUpdate: true,
        size: size || null,
    });
};

self.on('update', _d => {
    if (isLoaded)
        return;

    isLoaded = true;

    const { position, rotation } = self;
    const { x, y, z } = rotation;
    const rotationInDeg = { x: deg(x || 0), y: deg(y || 0), z: deg(z || 0) };

    loadImage({
        ...settings,
        position,
        rotation: rotationInDeg
    });
});
// Load a single image from Arweave and use this glb for it's position

// Adjust the settings to your requirements

const settings = {
    txid: `nDM_--R9pQd38LFCzYlKxrMMVsnTjKMsSGi6g0YnXhU`, // set transaction id of the image
    gateway_url: 'https://arweave.net', // gateway to fetch the image
    scaledown: 200, // scales down the original size (preserves the aspect ratio)
    color: 0x323232, // frame color
    size: null // if not null it will override the scaledown parameter
};

// Don't change anything below this line

let isLoaded = false; 

function deg(r) { return r * 180 / Math.PI };

function loadImage(params) {
    const { txid, gateway_url, scaledown, color, position, rotation, size } = params;
    const url = `${gateway_url}/${txid}`;

    world.addImage({
        url,
        color,
        scaledown,
        position,
        rotation,
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
// This code should be copied into the script named 'main.js' in the oncyber space

// Initializsation of images from Arweave
// I try to keep the settings in a separate object on the top of the scripts, so that non-coders can easily change them.
const settings = {
    gateway_url: 'https://arweave.net',
};

// Hardcoded list of images with Arweave txid as id, followed by oncyber (optional) settings ***Should be replaced with a more dynamic solution*** 
const images = [
    {
        id: `Zqphhn5P52zdGlTOWOjiVG3n24p12YKjTTfptjJXxa0`,
        scaledown: 105,
    },
    {
        id: `BOp7t9IOSlqPRTi8gVmqi8iFhsE0ClPkySUKWM1-9iA`,
        size: { w: 5, h: 5, d: 0.05 },
        position: { x: 0, y: 4, z: 9 },
        rotation: { y: 90 },
    }
];

function init() {
    images
        .forEach((image, i) => {
            const url = `${settings.gateway_url}/${image.id}`;
            world.addImage({
                url: url,
                color: 0x000000,
                scaledown: image.scaledown || 100,
                position: image.position || { x: 0, y: 4, z: i * 9 },
                rotation: { y: image.rotation?.y || 0 },
                needsUpdate: true,
                size: image.size || null,
            });
        });
};

init();
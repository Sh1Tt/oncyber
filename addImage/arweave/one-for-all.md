**JS Documentation: Arweave Image Display**

---

### `settings`

An object containing configuration settings for the Arweave gateway.

- **`gateway`** *(String)*: The URL of the Arweave gateway, set to `'https://arweave.net'` by default.

---

### `images`

An array of objects representing Arweave images to be displayed in a virtual world.

- **`id`** *(String)*: The Arweave transaction ID for the image.
- **`scaledown`** *(Number, optional)*: Percentage value to scale down the image (default is 100%).
- **`size`** *(Object, optional)*: An object representing the dimensions of the image (width, height, depth).
- **`position`** *(Object, optional)*: An object representing the initial position of the image in the virtual world.
- **`rotation`** *(Object, optional)*: An object representing the initial rotation of the image.
  
---

### `init()`

A function to initialize the virtual world and add Arweave images.

- Iterates through the `images` array and adds each image to the virtual world.
- Uses the Arweave gateway URL from `settings` to construct the complete image URL.
- Allows customization of image properties such as color, scaling, position, rotation, and size.
  
---

### Example Usage:

```javascript
// Initialize settings and images
const settings = {
    gateway: 'https://arweave.net',
};

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

// Initialize the virtual world with Arweave images
function init() {
    images.forEach((image, i) => {
        const url = `${settings.gateway}/${image.id}`;
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

// Call the init function to display Arweave images
init();
```
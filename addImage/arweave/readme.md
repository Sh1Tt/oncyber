**JS Documentation: Arweave Image Loader**

# main.js

---

### `settings`

An object containing configuration settings for loading an Arweave image.

- **`txid`** *(String)*: The transaction ID of the image on Arweave.
- **`gateway_url`** *(String)*: The URL of the Arweave gateway used to fetch the image.
- **`scaledown`** *(Number)*: Percentage value to scale down the original size (preserves the aspect ratio).
- **`color`** *(Hexadecimal Number)*: The frame color of the image.
- **`size`** *(Object, optional)*: If not null, it overrides the scaledown parameter.

---

### `isLoaded`

A flag indicating whether the image has already been loaded to avoid duplicate loading.

---

### `deg(r)`

A utility function that converts radians to degrees.

---

### `loadImage(params)`

A function to load an Arweave image into the virtual world.

- **Parameters**:
  - **`txid`** *(String)*: Transaction ID of the image.
  - **`gateway_url`** *(String)*: URL of the Arweave gateway.
  - **`scaledown`** *(Number)*: Percentage value to scale down the image.
  - **`color`** *(Hexadecimal Number)*: Frame color of the image.
  - **`position`** *(Object, optional)*: Initial position of the image in the virtual world.
  - **`rotation`** *(Object, optional)*: Initial rotation of the image.
  - **`size`** *(Object, optional)*: If not null, it overrides the scaledown parameter.

---

### `self.on('update', _d => { ... })`

An event listener triggered on the 'update' event. It loads the Arweave image into the virtual world when the image is not already loaded.

- Extracts position and rotation information from the current entity (`self`).
- Converts rotation from radians to degrees.
- Calls `loadImage()` with the provided settings, position, and rotation.

---

### Example Usage:

```javascript
// Initialize settings for Arweave image loading
const settings = {
    txid: `nDM_--R9pQd38LFCzYlKxrMMVsnTjKMsSGi6g0YnXhU`,
    gateway_url: 'https://arweave.net',
    scaledown: 200,
    color: 0x323232,
    size: null,
};

let isLoaded = false;

// Utility function to convert radians to degrees
function deg(r) { return r * 180 / Math.PI };

// Function to load Arweave image into the virtual world
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

// Event listener for the 'update' event
self.on('update', _d => {
    if (isLoaded)
        return;

    isLoaded = true;

    const { position, rotation } = self;
    const { x, y, z } = rotation;
    const rotationInDeg = { x: deg(x || 0), y: deg(y || 0), z: deg(z || 0) };

    // Load the Arweave image into the virtual world
    loadImage({
        ...settings,
        position,
        rotation: rotationInDeg
    });
});
```


**JS Documentation: Arweave Image Loader in GLB Frame**

---

### GLB Script loader:

This script facilitates the loading of a single image from Arweave and placing it on a GLB (glTF Binary) frame within the virtual world. Follow the instructions to integrate the script into your oncyber space and customize the settings to meet your specific needs.

---

### Instructions:

1. **Copy Main Script:**
   - Ensure that you have copied the main script to your oncyber space before using this script.

2. **Download GLB Frame:**
   - Download the frame in GLB format (or use your custom GLB).
   - Upload the GLB frame to oncyber.

3. **Insert Script:**
   - Copy this script and insert it into the script section of the GLB frame.

4. **Adjust Settings:**
   - Customize the settings object according to your preferences. Adjust the `txid`, `gateway_url`, `scaledown`, `color`, and `size` parameters as needed.



### Script Details:

```javascript
// Example code
// Load a single image from Arweave and use this glb to position it.
// Adjust the settings according to your needs.

const settings = {
    txid: `nDM_--R9pQd38LFCzYlKxrMMVsnTjKMsSGi6g0YnXhU`, // set transaction id of the image
    gateway_url: 'https://arweave.net', // gateway to fetch the image
    scaledown: 200, // scales down the original size (preserves the aspect ratio)
    color: 0x323232, // frame color
    size: null // if not null it will override the scaledown parameter
};

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
```

```javascript
// Settings object

# bulk load and placement of images

*Currently an example is available, yet it is depricated to my flavor of writing code. I will refactor it soon.*

---

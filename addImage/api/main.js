// // api magic
async function getData() {
    const api = 'https://example.com';
    const endpoint = 'api/v1/collection/';

    const searchParams = {
        page: 0,
        limit: 25,
    };

    const url = `${api}/${endpoint}?${new URLSearchParams(searchParams)}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((collection) => {
                resolve(collection);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

function init() {
    getData()
        .then((collection) => {
            console.log(collection); // remove before flight
            collection
                .forEach((nft, i) => {
                    world.addImage({
                        url: nft.image,
                        color: 0x000000,
                        scaledown: 125,
                        position: { x: 0, y: 4, z: i * 4.82 },
                        rotation: { y: 90 },
                        needsUpdate: true,
                        size: null,
                    });
                });
        })
        .catch((err) => {
            console.error(err);
        });
};

init();
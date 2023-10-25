// koinect api magic
async function getDeals() {
    const api = 'https://deals-prod.k8s-v2.trykoin.com';
    const endpoint = 'api/v1/deals';

    const url = `${api}/${endpoint}?${new URLSearchParams({
        page: 0,
        limit: 25,
    })}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((deals) => {
                resolve(deals);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

function init() {
    getDeals()
        .then((deals) => {
            console.log(deals); // remove before flight
            deals.forEach((_, i) => {
                world.addImage({
                    url: _.image,
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
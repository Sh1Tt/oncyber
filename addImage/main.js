function loadImageTexture(url, callback) {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (texture) => {
        callback(texture);
      },
      undefined,
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  
  function _constructCubeGeometry(params) {
    const { texture, color, scaledown, needsUpdate } = params;
  
    const 
      w = params.size?.w ? params.size.w : texture.image.width / scaledown,
      h = params.size?.h ? params.size.h : texture.image.height / scaledown,
      d = params.size?.d ? params.size.d : 0.05;
  
    const g = new THREE.BoxGeometry(w, h, d);
    
    const image = new THREE.MeshBasicMaterial({
      map: texture,
      lightMap: texture,
      needsUpdate,
    });
    
    const basicMaterial = new THREE.MeshBasicMaterial({
      color,
    });
  
    const m = [
      ...new Array(5).fill(0).map(() => basicMaterial), 
      image
    ];
  
    return new THREE.Mesh(g, m);
  };
  
  function addImageToScene(params) {
    const { texture, color, scaledown, position, rotation, needsUpdate, size } = params;
    const cube = _constructCubeGeometry({
      texture,
      color,
      scaledown,
      needsUpdate,
      size,
    });
  
    cube.position.set(position.x, position.y, position.z);
  
    cube.rotation.x = rotation.x ? (rotation.x * Math.PI) / 180 : 0;
    cube.rotation.y = rotation.y ? (rotation.y * Math.PI) / 180 : 0;
    cube.rotation.z = rotation.z ? (rotation.z * Math.PI) / 180 : 0;
  
    world.__scene.add(cube);
  };
  
  function addImage(params) {
    const {
      url, // image url
      color, // color of the cube's other sides
      scaledown, // original size / scaledown
      position, // { x, y, z } scene coordinates
      rotation, // { x, y, z } in degrees
      needsUpdate, // boolean,
      size, // set fixed size: { w, h, d } or set null to use sacaledown
    } = params;
  
    const callback = (texture) => {
      addImageToScene({
        texture,
        color,
        scaledown,
        position,
        rotation,
        needsUpdate,
        size,
      });
    };
  
    loadImageTexture(url, callback);
  };
  
  world.addImage = addImage;
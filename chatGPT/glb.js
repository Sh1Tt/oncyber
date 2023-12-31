const settings = {
  triggerDistance: 5,
  position: {
    x: 0.0,
    y: 4.0,
    z: 0.0,
  },
  defaultLine: "Press \"e\" to ask me a question",
  api: {
    url: "https://donna.hsd.services/chatgpt?x-api-key=ush88989-ahd986t-auhcd7787-x7&q=",
  },
};

let 
  t = null,
  a = "",
  p = "";

const updateText = async props => {
  if (t) {
    t.__font.update(props.text);
  }
  else {
    t = await props.self.showText(props.text);
    t.__font.position.copy(new THREE.Vector3(props.position.x, props.position.y, props.position.z,));
  };
};

self.on('update', async d => {
  if (self.distanceToPlayer < settings.triggerDistance
  && self.isLookedAt
  )
    displayText();
});

const displayText = async () => {
  const { position, defaultLine } = settings;
  const text = a === "" ? defaultLine : a;
  await updateText({ self, text, position });
};

self.on('keydown', async e => {
  if (self.distanceToPlayer < settings.triggerDistance
  && self.isLookedAt) {
    const k = e.key.toLowerCase();

    switch(true) {
      case k === "e":
        p = window.prompt("Prompt:");
        
        fetch(settings.api.url + p)
          .then(res => res.json())
          .then(data => {
            a = data.text;
            
          });
        break;
      
      case k === "r":
        a = "";
        break;
        
      default:
        break;
    };
  }
  else if (t) {
    await self.hideText();
    t = null;
  };
});

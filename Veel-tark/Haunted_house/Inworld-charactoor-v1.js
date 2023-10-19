const settings = {
    triggerDistance: 50,
    position: {
      x: 2.75,
      y: 2.5,
      z: 0.0,
    },
    font: {
      color: `#363636`,
    },
    defaultText: "Hello citizen! Press \"e\" to talk",
    character: "nimrod_the_gatekeeper"
  };
  
  // dont change code below this line
  let
    c = settings.character,
    t = null, 
    a = "", 
    p = "", 
    w = false;
  
  self.on('update', async d => {
    if (self.distanceToPlayer < settings.triggerDistance
    && self.isLookedAt
    )
      displayText();
  });
  
  self.on('keydown', async e => {
    if (self.distanceToPlayer < settings.triggerDistance
    && self.isLookedAt) {
      const k = e.key.toLowerCase();
  
      switch(true) {
        case k === "e":
          p = window.prompt("Type your message:");
          if (p.length == 0
          || p == null
          || p == undefined
          )
            return;
          
          w = true;
          const url = `https://donna.hsd.services/api/v1/veel-tark/${c}/?x-api-key=ush88989-ahd986t-auhcd7787-x7&input=${p}`
          
          fetch(url)
            .then(res => res.json())
            .then(data => {
              a = data.text;
            })
            .then(() => {
              setTimeout(() => {
                w = false;
              }, 1_000);
            });
          break;
        
        case k === "r":
          a = "";
          c = window.prompt("Enter the inworld character name as in the url");
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
  
  const displayText = async () => {
    const { position, defaultText } = settings;
    const text = w ? "..." : a === "" ? defaultText : a;
    await updateText({ 
      self, 
      text, 
      position 
    });
  };
  
  const updateText = async props => {
    if (t) {
      t.__font.update(props.text);
    }
    else {
      t = await props.self.showText(props.text);
      t.color = settings.font.color;
      t.__font.position.copy(new THREE.Vector3(props.position.x, props.position.y, props.position.z,));
    };
  };
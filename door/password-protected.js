const settings = {
    triggerDistance: 5,
    angle: 80,
    translate: 1.78,
    cooldown: 45_000,
    password: '9'
  };
  
  let
    isOpen = false, 
    time = null,
    text = null;
  
  self.on("update", delta => {
    if (!time)
      return;
  
    if ((Date.now() > time + settings.cooldown) 
    && isOpen
    ) {
        self.rotateY(settings.angle * -1);
        self.translateZ(settings.translate * -1);
        self.translateX(settings.translate);
        isOpen = false;
        time = null;
    };
  });
  
  self.on("keydown", async e => { 
    if (self.distanceToPlayer < settings.triggerDistance
    && self.isLookedAt
    ) {
      const k = e.key.toLowerCase(); 
      if (k === "e") {
        if (!!settings.password) {
          const p = window.prompt("Enter the code to open this door");
          if (p != settings.password)
            return;
        };
        
        if (isOpen) {
          self.rotateY(settings.angle * -1);
          self.translateZ(settings.translate * -1);
          self.translateX(settings.translate);
        }
        else {
          self.translateX(settings.translate * -1);
          self.translateZ(settings.translate);
          self.rotateY(settings.angle);
          time = Date.now();
        };
        
        isOpen = !isOpen;
      };
    };
  });
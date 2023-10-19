const settings = {
    triggerDistance: 15,
    angle: 80,
    translate: -3.88,
    cooldown: 45_000,
    password: '9'
  };
  
  let 
    isOpen = true,
    isHot = false;
  
  self.on("update", async delta => {
    if (!isHot
    && isOpen
    ) {
      self.rotateY(settings.angle * -1);
      self.translateZ(settings.translate);
      self.translateX(settings.translate);
      isOpen = false;
    };
  });
  
  self.on("keydown", async e => {
    if (self.distanceToPlayer < settings.triggerDistance
    && self.isLookedAt) {
      const k = e.key.toLowerCase();
      if (k === "e") {
        
        if (!isOpen
        && settings.password
        ) {
          const input = window.prompt("Enter the code:");
          if (input != settings.password)
            return;
        };
        
        if (isOpen) {
          self.rotateY(settings.angle * -1);
          self.translateZ(settings.translate);
          self.translateX(settings.translate);
        }
        else {
          self.translateX(settings.translate * -1);
          self.translateZ(settings.translate * -1);
          self.rotateY(settings.angle);
          
          isHot = true;
          setTimeout(() => {
            if (isHot)
              isHot = false;
          }, settings.cooldown);
        };
        
        isOpen = !isOpen;
      };
    };
  });
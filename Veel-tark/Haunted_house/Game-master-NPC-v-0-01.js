// Add some magic here...
const minute = 60 * 1_000;
const settings = {
  triggerDistance: 5,
  position: {
    x: 0.0,
    y: 2.0,
    z: 0.0,
  },
  font: {
    color:  `#f2e6e8`, // `#E1FACD`,
  },
  hint_time: 5 * minute,
  audio_url: `https://mauricestolk.nl/api/oncyber/audio/veel-tark/haunted_house/amado`,
};

const filenames = [
  `welcome-01.wav`,
  `started-00.wav`,
  `hint_one-00.wav`,
  `hint_two-00.wav`,
  `hint_three-00.wav`,
  `hint_four-00.wav`,
  `hint_five-00.wav`,
  `hint_six-00.wav`
];
const lines = [
  `Hi there player! I am your game master. I will provide you with hints! After you've watched the video, come to me and press \"e\" to start the game!`,
  `Your game has started! From this moment you'll receive a new hint every ${settings.hint_time / minute} minutes! You can press \"e\" to navigate them. Good luck!`,
  `HINT 1:\n\nRead the sentence in each bedroom carefully`,
  `HINT 2:\n\nCheck the time of death for each one`,
  `HINT 3:\n\nIt is not only important what each sentence says, but also how it is said.`,
  `HINT 4:\n\nNotice that on clocks there are letters instead of hours`,
  `HINT 5:\n\nThe verb tenses of each sentence are one of the keys`,
  `HINT 6:\n\nEach sentence offers one of the hours of the three clocks`
];

const l = lines.length - 1;

let
  s = null,
  t = null, // world reference to text object
  i = 0, // stage of the player in the game, controlled by keypresses and timer
  hint = 0, // number of hints that the user has unlocked
  hasPlayed = [];

const updateText = async props => {
  if (t) {
    t.__font.update(props.text);
  }
  else {
    t = await props.self.showText(props.text);
    t.__font.position.copy(new THREE.Vector3(props.position.x, props.position.y, props.position.z,));
    t.color = settings.font.color;
  };
};

self.on('update', async delta => {
  if (self.distanceToPlayer < settings.triggerDistance
  && self.isLookedAt
  ) {
    const text = lines[i];
    const url = `${settings.audio_url}/${filenames[i]}`;
    const n = Date.now();
    const d = !s ? 0 : (n - s);

    hint = hint >= l ? l : Math.floor(d / settings.hint_time) + 1;
    
    updateText({ 
      self,
      text,
      position: settings.position,
    });
    
    if (!hasPlayed[url]) {
      world.playSound(url);
      hasPlayed[url] = true;
    };
  }
  else if (t !== null) {
    await self.hideText();
    t = null;
    i = !s ? 0 : hint;
  };
});

self.on("keydown", async e => {
  if (self.distanceToPlayer < settings.triggerDistance
  && self.isLookedAt
  ) {
    const k = e.key.toLowerCase();
    if (k === "e") {
      if (i === 0
      && s === null
      )
        s = Date.now();

      i++;

      if (i > hint)
        i = hint > 1 ? 2 : 1;
    };
  };
});

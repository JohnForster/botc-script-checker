import type { ConsiderationsData } from "../types/considerations";

export const considerations: ConsiderationsData = {
  acrobat: {
    requirements: [
      {
        tag: ["causes-droisoning"],
        operator: ">",
        value: 0,
        message: "The Acrobat is useless in a script without droisoning.",
        severity: "high",
      },
    ],
    suggestions: [
      {
        tag: ["causes-droisoning"],
        operator: ">",
        value: 4,
        message:
          "The Acrobat doesn't function well in scripts without much droisoning.",
        severity: "medium",
      },
    ],
    tags: ["death-info", "each-night"],
    jinxes: [],
    setup: {},
  },
  alchemist: {
    tags: ["extra-ability"],
    jinxes: [
      "boffin",
      "marionette",
      "mastermind",
      "organgrinder",
      "spy",
      "summoner",
      "widow",
      "wraith",
    ],
    setup: {},
  },
  alhadikhia: {
    jinxes: [],
    tags: ["resurrection", "extra-kill"],
    setup: {},
  },
  alsaahir: {
    jinxes: ["vizier"],
    tags: ["declaration", "alt-good-win-con"],
    setup: {},
    clashes: [
      {
        characters: ["imp"],
        reason: "The Al Saahir struggles against moving demons like the Imp.",
        severity: "low",
      },
      {
        characters: ["fanggu"],
        reason:
          "The Al Saahir struggles against moving demons like the Fang Gu.",
        severity: "low",
      },
    ],
  },
  amnesiac: {
    jinxes: [],
    suggestions: [
      {
        tag: ["causes-droisoning"],
        operator: "<",
        value: 7,
        message:
          "In high-droisoning scripts, it is very difficult for the Amnesiac to guess their ability.",
        severity: "medium",
      },
    ],
    clashes: [
      {
        characters: ["vortox"],
        reason:
          "A Vortox makes it very difficult for the Amnesiac to guess their ability",
        severity: "high",
      },
    ],
    tags: [],
    setup: {},
  },
  angel: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  apprentice: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  artist: {
    jinxes: [],
    tags: ["once-per-game"],
    setup: {},
  },
  assassin: {
    jinxes: [],
    tags: ["extra-kill", "once-per-game"],
    setup: {},
  },
  atheist: {
    jinxes: [],
    tags: ["change-wincon", "chaotic"],
    setup: {},
  },
  balloonist: {
    jinxes: ["marionette"],
    clashes: [
      {
        characters: ["poisoner"],
        reason:
          "A single random poison at any time can be incredibly damaging to a Balloonist.",
        severity: "low",
      },
    ],
    tags: ["each-night", "ongoing-info"],
    setup: {
      outsiders: [0, 1],
    },
  },
  banshee: {
    jinxes: ["leviathan", "riot", "vortox"],
    tags: ["self-confirming", "wants-to-die-by-demon"],
    setup: {},
  },
  barber: {
    jinxes: [],
    tags: ["shy-outsider", "change-character"],
    setup: {},
  },
  barista: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  baron: {
    jinxes: ["heretic", "plaguedoctor"],
    requirements: [
      {
        tag: "outsider",
        operator: ">=",
        value: 4,
        message:
          "If there are fewer than 4 outsiders on a script, the Baron doesn't do anything in base 2 outsider games.",
        severity: "medium",
      },
    ],
    clashes: [
      {
        characters: ["kazali"],
        reason: "A Kazali-created Baron has no ability.",
        severity: "medium",
      },
    ],
    tags: ["quiet-minion"],
    setup: {
      outsiders: [2],
    },
  },
  beggar: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  bishop: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  boffin: {
    jinxes: [
      "alchemist",
      "cultleader",
      "drunk",
      "goon",
      "heretic",
      "ogre",
      "politician",
      "villageidiot",
    ],
    tags: ["extra-ability", "quiet-minion", "boffin"],
    setup: {},
  },
  bonecollector: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  boomdandy: {
    jinxes: ["plaguedoctor"],
    tags: ["quickening"],
    setup: {},
  },
  bootlegger: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  bountyhunter: {
    jinxes: ["kazali", "philosopher"],
    tags: ["extra-evil"],
    setup: {},
  },
  buddhist: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  bureaucrat: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  butcher: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  butler: {
    jinxes: ["cannibal", "organgrinder"],
    tags: [],
    setup: {},
  },
  cannibal: {
    jinxes: ["butler", "juggler", "poppygrower", "princess", "zealot"],
    tags: ["character-confirmation", "extra-ability"],
    setup: {},
  },
  cerenovus: {
    jinxes: ["goblin"],
    tags: ["madness", "causes-execution"],
    setup: {},
  },
  chambermaid: {
    jinxes: ["mathematician"],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  chef: {
    jinxes: [],
    tags: ["YSK"],
    setup: {},
  },
  choirboy: {
    jinxes: ["kazali"],
    requirements: [
      {
        tag: "king",
        operator: "==",
        value: 1,
        message: "The Choirboy needs a King on the script to function.",
        severity: "high",
      },
    ],
    clashes: [
      {
        characters: ["vortox"],
        reason: "The Vortox effectively renders the Choirboy useless.",
        severity: "high",
      },
    ],
    tags: [],
    setup: {},
  },
  clockmaker: {
    jinxes: ["summoner"],
    clashes: [
      {
        characters: ["investigator"],
        reason:
          "Without care, Investigator & Clockmaker together can sometimes produce game-solving info.",
        severity: "low",
      },
    ],
    tags: ["YSK"],
    setup: {},
  },
  courtier: {
    jinxes: ["summoner", "vizier"],
    clashes: [
      {
        characters: ["leviathan"],
        reason:
          "Without sufficient droisoning, a Courtier can extend a Leviathan game by 3 days.",
        severity: "medium",
      },
    ],
    tags: ["causes-droisoning"],
    setup: {},
  },
  cultleader: {
    jinxes: ["boffin", "pit-hag"],
    clashes: [
      {
        characters: ["chef"],
        reason: "Chef & Clockmaker can sometimes produce game-solving info.",
        severity: "medium",
      },
    ],
    tags: [],
    setup: {},
  },
  damsel: {
    jinxes: ["marionette", "pit-hag", "spy", "widow"],
    clashes: [
      {
        characters: ["spy"],
        reason:
          "The Spy/Damsel jinx causes the Damsel to be poisoned, making the Damsel effectively pointless.",
        severity: "high",
      },
      {
        characters: ["widow"],
        reason:
          "The Widow/Damsel jinx causes the Damsel to be poisoned, making the Damsel effectively pointless.",
        severity: "high",
      },
    ],
    tags: ["alt-evil-win-con"],
    setup: {},
  },
  deusexfiasco: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  deviant: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  devilsadvocate: {
    jinxes: [],
    tags: ["prevents-execution"],
    setup: {},
  },
  djinn: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  doomsayer: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  dreamer: {
    suggestions: [
      {
        tag: ["causes-droisoning"],
        operator: ">",
        value: 3,
        message: "The Dreamer is very powerful without sufficient droisoning",
        severity: "low",
      },
    ],
    jinxes: [],
    tags: ["each-night", "ongoing-info", "character-confirmation"],
    setup: {},
  },
  drunk: {
    jinxes: ["boffin"],
    tags: [
      "alters-bag",
      "causes-droisoning",
      "shy-outsider",
      "unknown-to-player",
    ],
    setup: {},
  },
  duchess: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  empath: {
    jinxes: [],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  engineer: {
    jinxes: ["legion", "summoner"],
    tags: ["change-character", "once-per-game"],
    setup: {},
  },
  eviltwin: {
    jinxes: ["plaguedoctor"],
    tags: ["public", "alt-evil-win-con"],
    setup: {},
  },
  exorcist: {
    jinxes: ["leviathan", "riot", "yaggababble"],
    tags: ["each-night", "prevents-demon-kills"],
    setup: {},
  },
  fanggu: {
    jinxes: ["scarletwoman"],
    tags: ["change-character", "extra-evil"],
    suggestions: [
      {
        tag: ["shy-outsider"],
        operator: ">=",
        value: 2,
        message:
          "The Fang Gu works best with multiple shy outsiders, such as the Mutant, Sweetheart or Politican.",
        severity: "low",
      },
    ],
    clashes: [
      {
        characters: ["drunk"],
        reason:
          "The Drunk makes every player a demon candidate in a Fang Gu game.",
        severity: "medium",
      },
    ],
    setup: {
      outsiders: [1],
    },
  },
  farmer: {
    jinxes: ["leviathan", "riot"],
    tags: ["self-confirming", "wants-to-die-at-night", "change-character"],
    setup: {},
  },
  fearmonger: {
    jinxes: ["plaguedoctor", "vizier"],
    tags: ["alt-evil-win-con"],
    setup: {},
  },
  ferryman: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  fibbin: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  fiddler: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  fisherman: {
    jinxes: [],
    tags: ["once-per-game"],
    setup: {},
  },
  flowergirl: {
    jinxes: [],
    clashes: [
      {
        characters: ["organgrinder"],
        reason: "The Organ Grinder can render the Flowergirl useless",
        severity: "high",
      },
    ],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  fool: {
    jinxes: [],
    tags: ["prevents-demon-kills", "prevents-execution"],
    setup: {},
  },
  fortuneteller: {
    jinxes: [],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  gambler: {
    jinxes: [],
    tags: ["death-info", "each-night", "extra-death"],
    setup: {},
  },
  gangster: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  gardener: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  general: {
    jinxes: [],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  gnome: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  goblin: {
    jinxes: ["cerenovus", "plaguedoctor"],
    tags: [],
    setup: {},
  },
  godfather: {
    jinxes: ["heretic"],
    tags: ["extra-kill"],
    setup: { outsiders: [-1, 1] },
  },
  golem: {
    jinxes: [],
    tags: ["day-death", "once-per-game", "self-confirming"],
    setup: {},
  },
  goon: {
    jinxes: ["boffin", "kazali", "pit-hag"],
    tags: ["change-alignment", "causes-droisoning", "shy-outsider"],
    setup: {},
  },
  gossip: {
    jinxes: [],
    tags: ["declaration", "extra-death"],
    setup: {},
  },
  grandmother: {
    jinxes: ["leviathan", "riot"],
    tags: ["character-confirmation", "extra-death", "day-death"],
    setup: {},
  },
  gunslinger: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  harlot: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  harpy: {
    jinxes: [],
    tags: ["madness", "day-death"],
    setup: {},
  },
  hatter: {
    jinxes: ["legion", "leviathan", "lilmonsta", "summoner"],
    tags: ["change-character"],
    setup: {},
  },
  hellslibrarian: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  heretic: {
    jinxes: [
      "baron",
      "boffin",
      "godfather",
      "lleech",
      "pit-hag",
      "spy",
      "widow",
    ],
    clashes: [
      {
        characters: ["atheist"],
        reason:
          "The Atheist allows the ST to break the rules, rendering the Heretic useless.",
        severity: "high",
      },
      {
        characters: ["spy"],
        reason:
          "A jinx prevents the Heretic and the Spy from being in play at the same time.",
        severity: "high",
      },
      {
        characters: ["widow"],
        reason:
          "A jinx prevents the Heretic and the Widow from being in play at the same time.",
        severity: "high",
      },
      {
        characters: ["godfather"],
        reason:
          "A jinx prevents the Heretic and the Godfather from being in play at the same time.",
        severity: "high",
      },
    ],
    tags: ["change-wincon"],
    setup: {},
  },
  hermit: {
    jinxes: [],
    tags: ["extra-ability"],
    setup: {
      outsiders: [-1, 0],
    },
  },
  highpriestess: {
    jinxes: [],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  huntsman: {
    jinxes: ["kazali", "marionette"],
    requirements: [
      {
        tag: "damsel",
        operator: "==",
        value: 1,
        message: "The Huntsman needs a Damsel on the script to function.",
        severity: "high",
      },
    ],
    tags: ["once-per-game", "change-character"],
    setup: {},
  },
  imp: {
    jinxes: [],
    tags: ["change-character"],
    setup: {},
  },
  innkeeper: {
    jinxes: ["leviathan", "riot"],
    tags: [
      "each-night",
      "causes-droisoning",
      "prevents-demon-kills",
      "prevents-night-death",
    ],
    setup: {},
  },
  investigator: {
    jinxes: ["vizier"],
    tags: ["YSK"],
    setup: {},
  },
  judge: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  juggler: {
    jinxes: ["cannibal"],
    tags: ["declaration", "character-confirmation"],
    setup: {},
  },
  kazali: {
    jinxes: [
      "bountyhunter",
      "choirboy",
      "goon",
      "huntsman",
      "marionette",
      "soldier",
      "summoner",
    ],
    clashes: [
      {
        characters: ["soldier"],
        reason: "The Soldier can cause the Kazali to be down one minion.",
        severity: "medium",
      },
    ],
    tags: [],
    setup: {
      outsiders: "arbitrary",
    },
  },
  king: {
    jinxes: ["leviathan", "riot"],
    tags: ["each-night", "character-confirmation"],
    setup: {},
  },
  klutz: {
    jinxes: [],
    tags: ["alt-evil-win-con"],
    setup: {},
  },
  knight: {
    jinxes: [],
    clashes: [
      {
        characters: ["lilmonsta"],
        reason: "The Lil Monsta renders the Knight effectively useless",
        severity: "medium",
      },
      {
        characters: ["summoner"],
        reason:
          "As there is no demon night 1, the Knight is effectively useless if there is a Summoner in play",
        severity: "medium",
      },
    ],
    tags: ["YSK"],
    setup: {},
  },
  legion: {
    jinxes: [
      "engineer",
      "hatter",
      "minstrel",
      "preacher",
      "summoner",
      "zealot",
    ],
    clashes: [
      {
        characters: ["bountyhunter"],
        reason:
          "Adding an extra evil player to a Legion game can make it significantly harder for the good team to win.",
        severity: "medium",
      },
      {
        characters: ["fearmonger"],
        reason: "The existence of a Fearmonger proves Legion is not in play",
        severity: "medium",
      },
      {
        characters: ["vizier"],
        reason: "The existence of a Vizier proves Legion is not in play",
        severity: "medium",
      },
      {
        characters: ["organgrinder"],
        reason:
          "The Organ Grinder must avoid using their ability to preserve Legion worlds",
        severity: "low",
      },
      {
        characters: ["psychopath"],
        reason:
          "The Psychopath must avoid using their ability to preserve Legion worlds",
        severity: "low",
      },
      {
        characters: ["artist"],
        reason: "The artist can hard-confirm Legion.",
        severity: "medium",
      },
      {
        characters: ["chambermaid"],
        reason: "The Chambermaid is very powerful in a Legion game.",
        severity: "low",
      },
      {
        characters: ["chef"],
        reason: "The Chef is very powerful in a Legion game.",
        severity: "low",
      },
      {
        characters: ["empath"],
        reason: "The Empath is very powerful in a Legion game.",
        severity: "low",
      },
      {
        characters: ["slayer"],
        reason: "The Slayer is very powerful in a Legion game.",
        severity: "low",
      },
      {
        characters: ["fortuneteller"],
        reason: "The Fortune Teller is very powerful in a Legion game.",
        severity: "low",
      },
    ],
    tags: ["extra-evil"],
    setup: {
      townsfolk: "arbitrary",
      outsiders: "arbitrary",
      minions: [0],
      demons: "arbitrary",
    },
  },
  leviathan: {
    jinxes: [
      "banshee",
      "exorcist",
      "farmer",
      "grandmother",
      "hatter",
      "innkeeper",
      "king",
      "mayor",
      "monk",
      "pit-hag",
      "ravenkeeper",
      "sage",
      "soldier",
    ],
    tags: ["alt-evil-win-con", "public"],
    setup: {},
  },
  librarian: {
    jinxes: [],
    tags: ["YSK", "character-confirmation"],
    setup: {},
  },
  lilmonsta: {
    jinxes: [
      "hatter",
      "magician",
      "marionette",
      "poppygrower",
      "scarletwoman",
      "vizier",
    ],
    tags: [],
    setup: {
      demons: [0],
      minions: [1],
    },
  },
  lleech: {
    jinxes: ["heretic", "mastermind", "slayer"],
    tags: ["causes-droisoning", "prevents-execution"],
    clashes: [
      {
        characters: ["sailor"],
        reason:
          "The game can end prematurely if the Lleech-host Sailor volunteers for execution.",
        severity: "low",
      },
      {
        characters: ["tealady"],
        reason:
          "The game can end prematurely if a Lleech-host neighbour of the Tea Lady volunteers for execution.",
        severity: "low",
      },
    ],
    setup: {},
  },
  lordoftyphon: {
    jinxes: ["summoner"],
    tags: ["alters-bag"],
    setup: {
      outsiders: "arbitrary",
    },
  },
  lunatic: {
    jinxes: ["mathematician"],
    tags: ["unknown-to-player", "shy-outsider"],
    setup: {},
  },
  lycanthrope: {
    jinxes: [],
    tags: ["causes-misregistration"],
    setup: {},
  },
  magician: {
    jinxes: ["lilmonsta", "spy", "vizier", "widow", "wraith"],
    tags: ["confuses-evil-info"],
    setup: {},
  },
  marionette: {
    jinxes: [
      "alchemist",
      "balloonist",
      "damsel",
      "huntsman",
      "kazali",
      "lilmonsta",
      "plaguedoctor",
      "poppygrower",
      "snitch",
      "summoner",
      "wraith",
    ],
    tags: ["unknown-to-player", "alters-bag"],
    setup: {},
  },
  mastermind: {
    jinxes: ["al-hadikhia", "alchemist", "lleech"],
    tags: ["alt-evil-win-con", "extending"],
    setup: {},
  },
  mathematician: {
    jinxes: ["chambermaid", "lunatic"],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  matron: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  mayor: {
    jinxes: ["leviathan", "riot"],
    tags: ["alt-good-win-con"],
    setup: {},
  },
  mezepheles: {
    jinxes: [],
    tags: ["change-alignment", "extra-evil"],
    setup: {},
  },
  minstrel: {
    jinxes: ["legion"],
    tags: ["causes-droisoning", "prevents-demon-kills"],
    setup: {},
  },
  monk: {
    jinxes: ["leviathan", "riot"],
    tags: ["prevents-demon-kills", "each-night"],
    setup: {},
  },
  moonchild: {
    jinxes: [],
    tags: ["extra-death"],
    setup: {},
  },
  mutant: {
    jinxes: [],
    tags: ["madness", "causes-execution"],
    setup: {},
  },
  nightwatchman: {
    jinxes: [],
    tags: ["self-confirming", "once-per-game"],
    setup: {},
  },
  noble: {
    jinxes: [],
    tags: ["YSK"],
    clashes: [
      {
        characters: ["investigator"],
        reason: "The Noble and Investigator together can be incredibly strong.",
        severity: "low",
      },
    ],
    setup: {},
  },
  nodashii: {
    jinxes: [],
    tags: ["causes-droisoning"],
    setup: {},
  },
  ogre: {
    jinxes: ["boffin", "pit-hag", "recluse", "spy"],
    tags: ["change-alignment", "extra-evil"],
    setup: {},
  },
  ojo: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  oracle: {
    jinxes: [],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  organgrinder: {
    jinxes: ["alchemist", "butler"],
    tags: ["public"],
    setup: {},
  },
  pacifist: {
    jinxes: [],
    tags: ["prevents-execution"],
    setup: {},
  },
  philosopher: {
    jinxes: ["bountyhunter"],
    tags: ["change-character", "causes-droisoning"],
    setup: {},
  },
  pithag: {
    jinxes: [
      "cultleader",
      "damsel",
      "goon",
      "ogre",
      "politician",
      "villageidiot",
    ],
    clashes: [
      {
        characters: ["drunk"],
        reason: "The Pit-Hag being able to create a drunk is very powerful.",
        severity: "low",
      },
    ],
    tags: ["change-character"],
    setup: {},
  },
  pixie: {
    jinxes: [],
    tags: ["YSK", "madness", "extra-ability"],
    setup: {},
  },
  plaguedoctor: {
    jinxes: [
      "baron",
      "boomdandy",
      "eviltwin",
      "fearmonger",
      "goblin",
      "marionette",
      "scarletwoman",
      "spy",
      "wraith",
    ],
    tags: ["extra-ability", "shy-outsider"],
    setup: {},
  },
  po: {
    jinxes: [],
    tags: ["extra-death", "prevents-demon-kills"],
    setup: {},
  },
  poisoner: {
    jinxes: [],
    tags: ["causes-droisoning"],
    setup: {},
  },
  politician: {
    jinxes: ["boffin", "pit-hag", "vizier"],
    tags: ["shy-outsider", "change-alignment", "extra-evil"],
    setup: {},
  },
  poppygrower: {
    jinxes: ["cannibal", "lilmonsta", "marionette", "spy", "summoner", "widow"],
    tags: ["confuses-evil-info"],
    setup: {},
  },
  preacher: {
    jinxes: ["legion", "summoner", "vizier"],
    tags: ["each-night"],
    setup: {},
  },
  princess: {
    jinxes: ["al-hadikhia", "cannibal"],
    clashes: [
      {
        characters: ["leviathan"],
        reason: "A Leviathan renders the Princess's ability useless.",
        severity: "high",
      },
    ],
    tags: ["prevents-demon-kills"],
    setup: {},
  },
  professor: {
    jinxes: [],
    tags: ["once-per-game", "resurrection"],
    setup: {},
  },
  psychopath: {
    jinxes: [],
    tags: ["day-death", "prevents-execution", "public"],
    clashes: [
      {
        characters: ["vigormortis"],
        reason: "A Vigormortis-killed Psychopath is incredibly powerful.",
        severity: "medium",
      },
    ],
    setup: {},
  },
  pukka: {
    jinxes: ["summoner"],
    tags: ["causes-droisoning"],
    setup: {},
  },
  puzzlemaster: {
    jinxes: [],
    tags: ["causes-droisoning", "once-per-game"],
    setup: {},
  },
  ravenkeeper: {
    jinxes: ["leviathan", "riot"],
    tags: ["wants-to-die-at-night", "character-confirmation"],
    setup: {},
  },
  recluse: {
    jinxes: ["ogre"],
    tags: ["causes-misregistration"],
    setup: {},
  },
  revolutionary: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  riot: {
    jinxes: [
      "banshee",
      "exorcist",
      "farmer",
      "grandmother",
      "innkeeper",
      "king",
      "mayor",
      "monk",
      "ravenkeeper",
      "sage",
      "soldier",
    ],
    tags: ["quickening"],
    setup: {},
  },
  sage: {
    jinxes: ["leviathan", "riot"],
    tags: ["wants-to-die-by-demon"],
    setup: {},
  },
  sailor: {
    jinxes: [],
    tags: ["causes-droisoning", "prevents-night-death", "prevents-execution"],
    setup: {},
  },
  saint: {
    jinxes: [],
    tags: ["alt-evil-win-con"],
    setup: {},
  },
  savant: {
    jinxes: [],
    tags: ["ongoing-info"],
    setup: {},
  },
  scapegoat: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  scarletwoman: {
    jinxes: ["al-hadikhia", "fanggu", "lilmonsta", "plaguedoctor"],
    tags: ["change-character"],
    setup: {},
  },
  seamstress: {
    jinxes: [],
    tags: ["once-per-game"],
    setup: {},
  },
  sentinel: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  shabaloth: {
    jinxes: [],
    tags: ["resurrection", "extra-death"],
    setup: {},
  },
  shugenja: {
    jinxes: ["YSK"],
    tags: [],
    setup: {},
  },
  slayer: {
    jinxes: ["lleech"],
    tags: ["once-per-game", "alt-good-win-con"],
    setup: {},
  },
  snakecharmer: {
    jinxes: [],
    tags: ["change-alignment", "change-character"],
    setup: {},
  },
  snitch: {
    jinxes: ["marionette"],
    tags: [],
    setup: {},
  },
  soldier: {
    jinxes: ["kazali", "leviathan", "riot"],
    tags: ["prevents-demon-kills"],
    setup: {},
  },
  spiritofivory: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  spy: {
    jinxes: [
      "alchemist",
      "damsel",
      "heretic",
      "magician",
      "ogre",
      "plaguedoctor",
      "poppygrower",
    ],
    tags: ["causes-misregistration", "see-grimoire"],
    setup: {},
  },
  steward: {
    jinxes: [],
    tags: ["YSK"],
    setup: {},
  },
  stormcatcher: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  summoner: {
    jinxes: [
      "alchemist",
      "clockmaker",
      "courtier",
      "engineer",
      "hatter",
      "kazali",
      "legion",
      "lordoftyphon",
      "marionette",
      "pit-hag",
      "poppygrower",
      "preacher",
      "pukka",
      "zombuul",
    ],
    clashes: [
      {
        characters: ["goon"],
        reason:
          "RAW, a Summoner who chooses the Goon becomes drunk, meaning no demon is created and Evil lose. A custom Bootlegger rule can prevent this.",
        severity: "medium",
      },
    ],
    tags: ["change-character", "change-alignment"],
    setup: { demons: [-1] },
  },
  sweetheart: {
    jinxes: [],
    tags: ["causes-droisoning", "shy-outsider"],
    setup: {},
  },
  tealady: {
    jinxes: [],
    tags: [
      "prevents-demon-kills",
      "prevents-execution",
      "prevents-night-death",
    ],
    setup: {},
  },
  thief: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  tinker: {
    jinxes: [],
    tags: ["extra-death", "day-death"],
    setup: {},
  },
  towncrier: {
    jinxes: [],
    tags: ["each-night", "ongoing-info"],
    setup: {},
  },
  toymaker: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  undertaker: {
    jinxes: [],
    tags: ["each-night", "ongoing-info", "character-confirmation"],
    setup: {},
  },
  vigormortis: {
    jinxes: [],
    tags: ["causes-droisoning"],
    setup: {
      outsiders: [-1],
    },
  },
  villageidiot: {
    jinxes: ["boffin", "pit-hag"],
    tags: ["causes-droisoning", "each-night", "ongoing-info"],
    setup: {},
  },
  virgin: {
    jinxes: [],
    tags: ["self-confirming", "causes-execution"],
    setup: {},
  },
  vizier: {
    jinxes: [
      "alsaahir",
      "courtier",
      "fearmonger",
      "investigator",
      "lilmonsta",
      "magician",
      "politician",
      "preacher",
      "zealot",
    ],
    tags: ["public", "prevents-execution", "causes-execution"],
    setup: {},
  },
  vortox: {
    jinxes: ["banshee"],
    tags: ["alt-evil-win-con"],
    setup: {},
  },
  voudon: {
    jinxes: [],
    tags: [],
    setup: {},
  },
  washerwoman: {
    jinxes: [],
    tags: ["YSK", "character-confirmation"],
    setup: {},
  },
  widow: {
    jinxes: ["alchemist", "damsel", "heretic", "magician", "poppygrower"],
    tags: ["causes-droisoning", "see-grimoire"],
    setup: {},
  },
  witch: {
    jinxes: [],
    tags: ["day-death", "noisy-minion"],
    setup: {},
  },
  wizard: {
    jinxes: [],
    tags: ["chaotic"],
    setup: {},
  },
  wraith: {
    jinxes: ["alchemist", "magician", "marionette", "plaguedoctor"],
    tags: [],
    setup: {},
  },
  xaan: {
    jinxes: [],
    tags: ["causes-droisoning"],
    setup: {
      outsiders: "arbitrary",
    },
  },
  yaggababble: {
    jinxes: ["exorcist"],
    tags: ["extra-kill"],
    setup: {},
  },
  zealot: {
    jinxes: ["cannibal", "legion", "vizier"],
    tags: [],
    setup: {},
  },
  zombuul: {
    jinxes: ["summoner"],
    tags: ["extending"],
    suggestions: [
      {
        tag: "po",
        operator: "==",
        value: 1,
        severity: "low",
        message:
          "The Zombuul works best paired with a Po, to provide cover for nights with no deaths.",
      },
      {
        tag: ["prevents-night-death", "prevents-demon-kills"],
        operator: ">=",
        value: 5,
        severity: "medium",
        message:
          "The Zombuul works best with multiple reasons for no deaths in the night, consider adding protection characters",
      },
      {
        tag: ["extra-death", "extra-kill"],
        operator: ">=",
        value: 3,
        severity: "medium",
        message:
          "The Zombuul works best when their existence can be hidden by other causes of death at night eg. with the Gossip, Assassin, Tinker",
      },
    ],
    setup: {},
  },
};

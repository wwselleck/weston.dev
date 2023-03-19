import { renderBestToWorstPage } from "../BestToWorst";

const rankings = [
  {
    name: "Ancient Hero of Zamor (Weeping Evergaol)",
    desc: `Felt like a good amount of difficulty for where they're placed, and overall just a fair and fun moveset to learn.`,
    difficulty: 2,
  },
  {
    // MOVE TO MINI BOSSES
    name: "Leonine Misbegotten",
    difficulty: 2,
  },
  {
    name: `Deathbird (Warmaster's Shack)`,
    desc: "Very cool design, but not too difficult once you kite them away from the trolls.",
    difficulty: 2,
  },
  {
    name: "Tree Sentinel (Limgrave)",
    desc: "Great music",
    difficulty: 2,
  },
  {
    name: "Night's Cavalry (Weeping Peninsula)",
    desc: `Pretty easy if you fight on the horse and just whack them whenever they're doing doing their 3-swing move, but still pretty fun.`,
    difficulty: 2,
  },
  {
    name: "Erdtree Avatar",
    desc: "I know you end up fighting a bunch of these, but this first one is pretty fun. Their hitbox when you're standing right in front of them is a bit weird, but otherwise a pretty standard, good fight.",
    difficulty: 2,
  },
  {
    name: "Runebear",
    difficulty: 1,
  },
  {
    name: "Tibia Mariner (Summonwater Village)",
    difficulty: 1,
  },
  {
    // MOVE TO MINI BOSSES
    name: "Cemetery Shade",
    desc: "",
    difficulty: 1,
  },
  {
    name: "Mad Pumpkin Head (Waypoint Ruins)",
    image: "/public/elden-ring/mad-pumpkin-head-waypoint.webp",
    difficulty: 1,
  },
  {
    name: "Scaly Misbegotten",
    desc: `The dungeon they're in is more difficult than the actual boss.`,
    difficulty: 1,
  },
  {
    name: "Black Knife Assassin (Limgrave)",
    difficulty: 1,
  },
  {
    name: `Erdtree Burial Watchdog (Impaler's Catacombs)`,
    desc: `I created this page solely so I could put this piece of shit in last. Maybe I made this too hard on myself by using the Reduiva Blood Dagger and getting here at a lower level, but this took me at least 30 attempts. The main boss on its own is kind of annoying; its attacks are hard to time, its overhead sword attack seems to magically snap onto you no matter where you are relative to the boss, and it's also a repeat boss. But in addition, they throw in 4 of the **WORST** enemies I've ever seen in a game: [Imps](https://eldenring.wiki.fextralife.com/Imp). I try to not use summons when fighting FromSoftware bosses, but I had to use the wolves summon for this one. Bad...bad...really bad.`,
    image: "/public/elden-ring/erdtree-burial-watchdog-impaler.webp",
    difficulty: 4,
  },
];

export const page = {
  title: "Best To Worst: Elden Ring Field Bosses",
  published: false,
  renderToHTML() {
    return renderBestToWorstPage(
      "Best To Worst: Elden Ring Field Bosses",
      rankings.map((r) => ({
        primaryText: `${r.name}`,
        desc: r.desc,
        image: r.image,
      }))
    );
  },
};

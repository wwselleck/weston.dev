import { renderBestToWorstPage } from "../BestToWorst";

const rankings = [
  {
    name: "Mad Pumpkin Head (Waypoint Ruins)",
    image: "/public/elden-ring/mad-pumpkin-head-waypoint.webp",
  },
  {
    name: `Erdtree Burial Watchdog (Impaler's Catacombs)`,
    desc: `I created this page solely so I could put this piece of shit in last. Maybe I made this too hard on myself by using the Reduiva Blood Dagger and getting here at a lower level, but this took me at least 30 attempts. The main boss on its own is kind of annoying; its attacks are hard to time, its overhead sword attack seems to magically snap onto you no matter where you are relative to the boss, and it's also a repeat boss. But in addition, they throw in 4 of the **WORST** enemies I've ever seen in a game: [Imps](https://eldenring.wiki.fextralife.com/Imp). I try to not use summons when fighting FromSoftware bosses, but I had to use the wolves summon for this one. Bad...bad...really bad.`,
    image: "/public/elden-ring/erdtree-burial-watchdog-impaler.webp",
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

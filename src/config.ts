export interface Config {
  github: {
    username: string;
    token: string;
  };
  google: {
    serviceAccount: {
      email: string;
      privateKey: string;
    };
  };
  writing: {
    repo: string
  };
  lists: {
    id: string;
    display: string;
    sheetId: string;
    sheetName: string;
  }[]
}

export const load = async () => {
  return {
    github: {
      username: process.env.GITHUB_USERNAME,
      token: process.env.GITHUB_TOKEN,
    },
    google: {
      serviceAccount: {
        email: process.env.GOOGLE_SERVICE_EMAIL,
        privateKey: process.env.GOOGLE_SERVICE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
    },
    writing: {
      repo: 'wwselleck/writing'
    },
    lists: [
      {
        id: 'games',
        display: 'Video Games',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Games',
        listType: 'custom'
      },
      {
        id: 'soda',
        display: 'Soda',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Soda',
        listType: 'tiered',
        description: "Soda is very bad for you and you shouldn't drink it, but on occasion I do and these are how much I like the different kinds.",
        scale: [
          {
            tier: 'S',
            desc: "The best of the best. I want to be buried with a can of each of these.",
            color: {
              type: 'grad-anim',
              gradient: ['#9e56fc', '#56b7fc', '#fc5688']
            }
          },
          {
            tier: 'A',
            desc: "Purchased frequently from the grocery store. ",
            color: {
              type: 'solid',
              hue: '#fc5664'
            }
          },
          {
            tier: 'B',
            desc: "Will buy from the grocery store every once in awhile.",
            color: {
              type: 'solid',
              hue: '#5672fc'
            }
          },
          {
            tier: 'C',
            desc: "Will buy at the gas station every once in awhile.",
            color: {
              type: 'solid',
              hue: '#fce156'
            }
          },
          {
            tier: 'D',
            desc: "Will never buy, but won't turn down if offered.",
            color: {
              type: 'solid',
              hue: '#fc9656'
            }
          },
          {
            tier: 'F',
            desc: "Bad, will never drink.",
            color: {
              type: 'solid',
              hue: '#424242'
            }
          },
        ]
      },
      {
        id: 'hint-flavors',
        display: 'Hint Water Flavors',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Hint Flavors',
        listType: 'tiered',
        description: "Soda is very bad for you and you shouldn't drink it, but on occasion I do and these are how much I like the different kinds.",
        scale: [
          {
            tier: 'S',
            desc: "Will usually have these in the fridge. These will almost always have a light to medium flavor intensity, and will honestly probably be mostly blackberry and strawberry adjacent flavors.",
            color: {
              type: 'grad-anim',
              gradient: ['#9e56fc', '#56b7fc', '#fc5688']
            }
          },
          {
            tier: 'A',
            desc: "Great flavors that I'll never not be in the mood for.",
            color: {
              type: 'solid',
              hue: '#fc5664'
            }
          },
          {
            tier: 'B',
            desc: "Might buy a 12 pack of these from time to time.",
            color: {
              type: 'solid',
              hue: '#5672fc'
            }
          },
          {
            tier: 'C',
            desc: "Will never buy a 12 pack of these, but if it's the only flavor available I'll drink it and likely enjoy it.",
            color: {
              type: 'solid',
              hue: '#fce156'
            }
          },
          {
            tier: 'F',
            desc: "Bad flavors. Even the worst Hint flavors are still just water, so I'll probably still drink most of these if it's the only thing available, but I'm not excited about it. This tier will probably mostly be very strong flavors, since I generally prefer flavored water to have a subtle flavor.",
            color: {
              type: 'solid',
              hue: '#424242'
            }
          },
        ]
      }
    ]
  };
};

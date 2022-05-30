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
    lists: [
      {
        id: 'games',
        display: 'Video Games',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Games',
        listType: 'custom'
      },
      {
        id: 'hint-flavors',
        display: 'Hint Water Flavors',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Hint Flavors',
        listType: 'scored',
        description: "I love Hint Water and I want everyone to know it. Here is the definitive and indisuptable rating for every flavor that I have tried."
      },
      {
        id: 'soda',
        display: 'Soda',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Soda',
        listType: 'scored',
        description: "Soda is very bad for you and you shouldn't drink it, but on occasion I do and these are how much I like the different kinds."
      },
      {
        id: 'soda2',
        display: 'Soda2',
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
      }
    ]
  };
};

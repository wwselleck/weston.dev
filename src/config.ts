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
        sheetName: 'Games'
      },
      {
        id: 'hint-flavors',
        display: 'Hint Water Flavors',
        sheetId: process.env.LISTS_SHEET_ID,
        sheetName: 'Hint Flavors'
      }
    ]
  };
};

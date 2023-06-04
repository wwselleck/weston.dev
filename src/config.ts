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
    sheetId: string;
  };
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
    lists: {
      sheetId: process.env.LISTS_SHEET_ID,
    },
  };
};

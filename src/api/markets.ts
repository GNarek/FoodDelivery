import axios from 'axios';

export const fetchMarkets = async () => {
  const response = await axios.get(
    'https://user-app-staging.haat-apis.com/api/user/main-page/by-area/1?type=Market',
    {
      headers: {
        'Accept-language': 'en-US',
      },
    },
  );
  return response.data;
};

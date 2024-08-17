import axios from 'axios';

export const fetchMarketById = async (id: number) => {
  const response = await axios.get(
    `https://user-app-staging.haat-apis.com/api/markets/${id}`,
    {
      headers: {
        'Accept-language': 'en-US',
      },
    },
  );
  return response.data;
};

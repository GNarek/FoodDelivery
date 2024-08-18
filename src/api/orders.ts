import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YzkxYzBkNy1mNjYxLTQ0NDMtOGY0MS0zZjdmNWFlYzE1MmQiLCJqdGkiOiIwM2JhY2IxOS1lN2JkLTRhYTAtODVjZi1jOTIzMjQyNjQxYzYiLCJleHAiOjE4Nzg3MTc5MTMsImF1ZCI6IjRjOTFjMGQ3LWY2NjEtNDQ0My04ZjQxLTNmN2Y1YWVjMTUyZCJ9.eDu2-yrPMiLt0ycfhSI4xehk6bGtRD6rhARF15nppXg';

export const fetchOrders = async ({pageParam = 1}) => {
  const response = await axios.get(
    `https://user-app-staging.haat-apis.com/api/Orders/v2/GetHistoryOrders/${pageParam}`,
    {
      headers: {
        'Accept-language': 'en-US',
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );
  return response.data;
};

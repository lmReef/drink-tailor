import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: cache responses

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/randomselection.php',
    headers: {
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': 'cd095dd235mshadd3945f9bfaac1p1347b1jsnb88073d8b4f0',
    },
  };

  const { data } = await axios.request(options);

  res.status(200).json(data.drinks);
};

export default handler;

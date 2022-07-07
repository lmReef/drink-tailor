import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: cache responses
  const s = req.query.name as string;

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
    params: { s },
    headers: {
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  };

  const { data } = await axios.request(options);

  if (typeof data.drinks === 'string') res.status(200).json([]);
  else res.status(200).json(data.drinks);
};

export default handler;

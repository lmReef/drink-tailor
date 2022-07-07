import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: cache responses
  const id = req.query.id;

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
    params: { i: id },
    headers: {
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  };

  const { data } = await axios.request(options);
  // TODO: catch 500 error + others
  res.status(200).json(data.drinks[0]);
};

export default handler;

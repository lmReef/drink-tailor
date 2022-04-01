import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addItem, query } from '../../../components/dynamodb';

const API_PATH = '/api/get/popular-drinks';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // query the db for cached api response
  const cachedResponse = await query(API_PATH);
  // check if db returned an item
  if (cachedResponse) {
    // if yes, return the cached item
    // console.log(typeof cachedResponse);
    console.log('Used cache', API_PATH);
    res.status(200).json(cachedResponse);
  } else {
    // if no, make axios request to the external api
    console.log('No cache found', API_PATH);
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': 'cd095dd235mshadd3945f9bfaac1p1347b1jsnb88073d8b4f0',
      },
    };
    const { data } = await axios.request(options);

    // then store the data from external api in the dynamodb for caching
    if (typeof data !== 'string') addItem(API_PATH, data.drinks);

    res.status(200).json(data.drinks);
  }
};

export default handler;

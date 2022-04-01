import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { QueryCommandInput } from '@aws-sdk/client-dynamodb';

const client = new DynamoDB({ region: 'ap-southeast-2' });

export const query = async (req: string) => {
  try {
    const results = await client.query({
      TableName: 'drink-tailor-cache',
      KeyConditionExpression: '#request = :req',
      ExpressionAttributeNames: { '#request': 'request' },
      ExpressionAttributeValues: {
        ':req': { S: req },
      },
    });

    const parsedResponse = JSON.parse(await results.Items[0].response.S);

    return parsedResponse;
  } catch (err) {
    console.error(err);
    console.log('Request string used was:', req);

    return null;
  }
};

export const addItem = async (req: string, res: object) => {
  try {
    const results = await client.putItem({
      TableName: 'drink-tailor-cache',
      Item: { request: { S: req }, response: { S: JSON.stringify(res) } },
    });

    console.log(await results);

    return true;
  } catch (err) {
    console.error(err);

    return null;
  }
};

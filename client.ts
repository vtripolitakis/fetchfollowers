import { TwitterApi } from "twitter-api-v2";

const createClient = (token: string) => {
  // Instantiate with desired auth type (here's Bearer v2 auth)
  const twitterClient = new TwitterApi(token);

  // Tell typescript it's a readonly app
  const readOnlyClient = twitterClient.readOnly;
  const client = readOnlyClient.v2;
  return client;
};

export default createClient;

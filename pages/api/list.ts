import { NextApiRequest, NextApiResponse } from "next";
import redis, { RedisClient, RedisError } from "redis";
import { promisify } from "util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client: RedisClient = redis.createClient({
    port: 30216,
    host: process.env.LAMBDA_STORE_REDIS_HOST,
    password: process.env.LAMBDA_STORE_REDIS_PASSWORD,
  });

  const zrevrangeAsync = promisify(client.zrevrange).bind(client);
  const hgetallAsync = promisify(client.hgetall).bind(client);

  client.on("error", (err: RedisError) => {
    throw new Error(err.message);
  });

  const mattersSetIds = await zrevrangeAsync("matters", 0, 50, "WITHSCORES");
  let data = [];

  for (let i = 0; i < mattersSetIds.length - 1; i += 2) {
    const matterId = mattersSetIds[i];
    const matterData = await hgetallAsync(matterId);

    matterData["id"] = matterId;
    matterData["score"] = mattersSetIds[i + 1];

    data.push(matterData);
  }

  client.quit();

  res.json(data);
};

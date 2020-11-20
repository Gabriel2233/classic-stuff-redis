import { NextApiRequest, NextApiResponse } from "next";
import redis, { RedisClient, RedisError } from "redis";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

type TBody = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client: RedisClient = redis.createClient({
    port: 30216,
    host: process.env.LAMBDA_STORE_REDIS_HOST,
    password: process.env.LAMBDA_STORE_REDIS_PASSWORD,
  });

  const hsetAsync = promisify(client.hset).bind(client);
  const zaddAsync = promisify(client.zadd).bind(client);

  client.on("error", (err: RedisError) => {
    throw new Error(err.message);
  });

  const id = uuidv4();
  const body: TBody = req.body;
  const name = body["name"];

  if (name) {
    await zaddAsync("matters", 0, id);
    const matterData = await hsetAsync(`${id}`, "name", name, "votes", 0);
    client.quit();
    res.status(200).json(matterData);
  } else {
    client.quit();
    res.json({
      message: "An unexpected Error ocurred. PLease try again.",
    });
  }
};

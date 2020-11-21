import { NextApiRequest, NextApiResponse } from "next";
import redis, { RedisClient, RedisError } from "redis";
import { promisify } from "util";

const PORT: number = Number(process.env.LAMBDA_STORE_REDIS_PORT);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client: RedisClient = redis.createClient({
    port: PORT,
    host: process.env.LAMBDA_STORE_REDIS_HOST,
    password: process.env.LAMBDA_STORE_REDIS_PASSWORD,
  });

  client.on("error", (err: RedisError) => {
    throw new Error(err.message);
  });

  const body: { id: string } = req.body;
  const id = body["id"];
  const userIp = req.headers["x-forwarded-for"];

  const saadAsync = promisify(client.sadd).bind(client);

  const voteRegister = await saadAsync(`v:${id}`, userIp ? userIp : "-");

  if (voteRegister === 0) {
    client.quit();

    res.json({ body: "You cannot vote twice on a same todo" });
  } else {
    const zincrbyAsync = promisify(client.zincrby).bind(client);

    const upvotedTodo = await zincrbyAsync("todos", 1, id);

    client.quit();

    res.json({ body: upvotedTodo });
  }
};

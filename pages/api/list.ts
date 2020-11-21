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

  const zrevrangeAsync = promisify(client.zrevrange).bind(client);
  const hgetallAsync = promisify(client.hgetall).bind(client);

  client.on("error", (err: RedisError) => {
    throw new Error(err.message);
  });

  const todosSetIds = await zrevrangeAsync("todos", 0, 50, "WITHSCORES");
  let data = [];

  for (let i = 0; i < todosSetIds.length - 1; i += 2) {
    const todoId = todosSetIds[i];
    const todoData = await hgetallAsync(todoId);

    todoData["id"] = todoId;
    todoData["score"] = todosSetIds[i + 1];

    data.push(todoData);
  }

  client.quit();

  res.json(data);
};

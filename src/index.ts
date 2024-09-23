import dotenv from "dotenv";
import express, {Express, Request, Response} from "express";
import {users} from './data/mock';

const log = console.log;

// configures dotenv to work in your application
dotenv.config();
const app: Express = express();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/api/v1/", (_: Request, response: Response) => {
  log("Hello World");
  response.status(200).send("Hello World");
});

app.get("/api/v1/health", (_: Request, response: Response) => {
  log("I'm healthy");
  response.status(200).send("I'm healthy");
});

app.get("/api/v1/users", (_: Request, response: Response) => {
  log(users);
  response.status(200).send(users);
});

app.get("/api/v1/users/:id", (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    response.status(404).send("User not found");
    return;
  }

  response.status(200).send(user);
});

app.post("/api/v1/users", (request: Request, response: Response) => {
  const user = request.body;
  users.push(user);
  response.status(201).send(user);
});

app.put("/api/v1/users/:id", (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const user = request.body;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    response.status(404).send("User not found");
    return;
  }

  users[userIndex] = user;
  response.status(200).send(user);
});

app.delete("/api/v1/users/:id", (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    response.status(404).send("User not found");
    return;
  }

  users.splice(userIndex, 1);
  response.status(204).send();
  return;
});

app.patch("/api/v1/users/:id", (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const user = request.body;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    response.status(404).send("User not found");
    return;
  }

  users[userIndex] = {...users[userIndex], ...user};
  response.status(200).send(users[userIndex]);
  return;
});


app.listen(PORT, () => {
  console.log(`🌎 Server is running on http://localhost:${PORT} ⚡️`);
}).on("error", (error) => {
  throw new Error(error.message);
});
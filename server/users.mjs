import express from "express";

import * as db from "./db.mjs";

const userRoutes = express.Router();

userRoutes.get("/", async (request, response) =>
  response.json(await db.getUsers()),
);

userRoutes
  .get("/:userId", async (request, response) =>
    response.json(await db.getUser(request.params.userId)),
  )
  .delete("/:userId", async (request, response) => {
    await db.deleteUser(request.params.userId);
    response.status(204).end();
  });

userRoutes.use(express.json());
userRoutes.post("/", async (request, response) => {
  response.status(201).json(await db.addUser(request.body));
});

export default userRoutes;

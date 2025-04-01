import express from "express";

export default function startApiServer(_prod: boolean) {
  const app = express();
  const API_PORT = process.env.API_PORT || 6061;

  app.get("/api/ping", (_, res) => {
    res.send("pong");
  });

  app.listen(API_PORT, () => {
    console.log(`Server is running on http://localhost:${API_PORT}`);
  });
}

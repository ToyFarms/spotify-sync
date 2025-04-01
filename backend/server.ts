import express from "express";

const g = global as typeof global & {
  _BAKED_HTML_CONTENT: string;
  in_prod?: boolean;
};

// in dev the file is served by vite
if (g.in_prod) {
  const webserver = express();
  const WEB_PORT = process.env.WEB_PORT || 6060;

  webserver.get("*", (_, res) => {
    if (!g._BAKED_HTML_CONTENT) {
      res.status(500).send("There should be HTML here, but there's none.");
    } else {
      res.send(g._BAKED_HTML_CONTENT);
    }
  });

  webserver.listen(WEB_PORT, () => {
    console.log(`Server is running on http://localhost:${WEB_PORT}`);
  });
}

const apiserver = express();
const API_PORT = process.env.API_PORT || 6061;

apiserver.get("/api/ping", (_, res) => {
  res.send("pong");
});

apiserver.listen(API_PORT, () => {
  console.log(`Server is running on http://localhost:${API_PORT}`);
});

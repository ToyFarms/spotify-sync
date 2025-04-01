import express from "express";
import startApiServer from "@@/backend/api";

const g = global as typeof global & {
  _BAKED_HTML_CONTENT: string;
  in_prod?: boolean;
};

// in dev the file is served by vite
if (g.in_prod) {
  const app = express();
  const WEB_PORT = process.env.WEB_PORT || 6060;

  app.get("*", (_, res) => {
    if (!g._BAKED_HTML_CONTENT) {
      res.status(500).send("There should be HTML here, but there's none.");
    } else {
      res.send(g._BAKED_HTML_CONTENT);
    }
  });

  app.listen(WEB_PORT, () => {
    console.log(`Server is running on http://localhost:${WEB_PORT}`);
  });
}

startApiServer(!!g.in_prod);

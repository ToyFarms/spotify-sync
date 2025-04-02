import express from "express";
import startApiServer from "@/api";

declare global {
  var _BAKED_HTML_CONTENT: string;
  var in_prod: boolean;
}

// in dev the file is served by vite
if (global.in_prod) {
  const app = express();
  const WEB_PORT = parseInt(process.env.WEB_PORT || "") || 6060;

  app.get("*", (_, res) => {
    if (!global._BAKED_HTML_CONTENT) {
      res.status(500).send("There should be HTML here, but there's none.");
    } else {
      res.send(global._BAKED_HTML_CONTENT);
    }
  });

  app.listen(WEB_PORT, () => {
    console.log(`Server is running on http://localhost:${WEB_PORT}`);
  });
}

startApiServer(!!global.in_prod);

import express from "express";
import prisma from "@lib/prisma";

const app = express();
const PORT = process.env.PORT || 6060;

console.log(prisma);

app.get("*", (_, res) => {
  const g = global as typeof global & { _BAKED_HTML_CONTENT: string };

  if (!g._BAKED_HTML_CONTENT) {
    res.status(500).send("There should be HTML here, but there's none.");
  } else {
    res.send(g._BAKED_HTML_CONTENT);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

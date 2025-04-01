import { readFileSync, writeFileSync } from "fs";
import os from "os";

const outputPath = process.argv[2];
if (!outputPath) {
  console.error("Expected filename");
  process.exit(0);
}

const html = readFileSync("dist/index.html", "utf8");
const template = readFileSync("backend/server.ts", "utf8");

writeFileSync(
  outputPath,
  `global._BAKED_HTML_CONTENT = ${JSON.stringify(html)};${os.EOL}` +
    `global.in_prod = true;${os.EOL}` +
    `${template}`,
  "utf8",
);
console.log(`Baked index.html into ${outputPath}`);

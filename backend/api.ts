import express from "express";
import prisma from "@lib/prisma";
import cors from "cors";
import { LoginSchema } from "@lib/login";
import { fromZodError } from "zod-validation-error";

export default async function startApiServer(_prod: boolean) {
  const app = express();
  const API_PORT = parseInt(process.env.API_PORT || "") || 6061;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  app.post("/api/login", async (req, res) => {
    const loginData = LoginSchema.safeParse(req.body);
    if (!loginData.success) {
      console.log(loginData.error);
      res.status(400).json({ error: fromZodError(loginData.error).toString() });
      return;
    }

    console.log(loginData);

    res.status(200).json({ message: "Login Successfull" });
  });

  app.get("/api/ping", (_, res) => {
    res.status(200).send("pong");
  });

  app.listen(API_PORT, () => {
    console.log(`Server is running on http://localhost:${API_PORT}`);
  });
}

const storageState: { storage: Record<string, any> | null; dirty: boolean } = {
  storage: null,
  dirty: false,
};

async function storageInit() {
  const appState = await prisma.appState.upsert({
    where: { id: 0 },
    create: { storage: "{}" },
    update: {},
  });

  let storage = {};

  try {
    storage = JSON.parse(appState.storage) || {};
  } finally {
    storageState.storage = storage;
  }

  return storageState.storage;
}

async function storageAll() {
  if (!storageState.storage) {
    return storageInit();
  }

  return storageState.storage;
}

// @ts-ignore
async function storageGet(key: string) {
  const storage = await storageAll();
  return storage[key];
}

// @ts-ignore
async function storageSet(key: string, value: any, write: boolean = true) {
  const storage = await storageAll();
  storage[key] = value;
  storageState.dirty = true;

  if (write) {
    await flushStorage();
  }
}

async function flushStorage() {
  if (!storageState.dirty) {
    return;
  }

  await prisma.appState.update({
    where: { id: 0 },
    data: { storage: JSON.stringify(storageState.storage) },
  });
  storageState.dirty = false;
}

const handleExit = async (_signal: string) => {
  await flushStorage();
  process.exit(0);
};

process.on("SIGINT", () => handleExit("SIGINT"));
process.on("SIGTERM", () => handleExit("SIGTERM"));

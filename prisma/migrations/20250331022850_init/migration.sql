-- CreateTable
CREATE TABLE "RemoteTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "track_id" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "artists" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LocalTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "track_pos" INTEGER NOT NULL,
    "remote" INTEGER,
    "synced" BOOLEAN NOT NULL DEFAULT false,
    "ignore" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "LocalTrack_remote_fkey" FOREIGN KEY ("remote") REFERENCES "RemoteTrack" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RemoteTrack_id_key" ON "RemoteTrack"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LocalTrack_id_key" ON "LocalTrack"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LocalTrack_path_key" ON "LocalTrack"("path");

-- CreateIndex
CREATE UNIQUE INDEX "LocalTrack_track_pos_key" ON "LocalTrack"("track_pos");

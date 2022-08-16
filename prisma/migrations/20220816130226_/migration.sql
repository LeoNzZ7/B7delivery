/*
  Warnings:

  - You are about to drop the column `id_user` on the `tenants` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL,
    "secondColor" TEXT NOT NULL
);
INSERT INTO "new_tenants" ("id", "mainColor", "name", "secondColor", "slug") SELECT "id", "mainColor", "name", "secondColor", "slug" FROM "tenants";
DROP TABLE "tenants";
ALTER TABLE "new_tenants" RENAME TO "tenants";
CREATE UNIQUE INDEX "tenants_name_key" ON "tenants"("name");
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

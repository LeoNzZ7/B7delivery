/*
  Warnings:

  - You are about to drop the column `delivery` on the `bags` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    CONSTRAINT "bags_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bags_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bags" ("id", "id_tenant", "id_user") SELECT "id", "id_tenant", "id_user" FROM "bags";
DROP TABLE "bags";
ALTER TABLE "new_bags" RENAME TO "bags";
CREATE UNIQUE INDEX "bags_id_user_key" ON "bags"("id_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

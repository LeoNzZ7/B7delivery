/*
  Warnings:

  - Added the required column `active` to the `users_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" INTEGER,
    "house_number" INTEGER NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    "active" TEXT NOT NULL,
    CONSTRAINT "users_addresses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_addresses" ("city", "complement", "house_number", "id", "id_user", "state", "street", "street_number", "zipcode") SELECT "city", "complement", "house_number", "id", "id_user", "state", "street", "street_number", "zipcode" FROM "users_addresses";
DROP TABLE "users_addresses";
ALTER TABLE "new_users_addresses" RENAME TO "users_addresses";
CREATE UNIQUE INDEX "users_addresses_id_user_key" ON "users_addresses"("id_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

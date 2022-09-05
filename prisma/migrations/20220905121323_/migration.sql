/*
  Warnings:

  - You are about to drop the column `street_number` on the `users_addresses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" INTEGER NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    "active" TEXT NOT NULL,
    CONSTRAINT "users_addresses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_addresses" ("active", "city", "complement", "house_number", "id", "id_user", "state", "street", "zipcode") SELECT "active", "city", "complement", "house_number", "id", "id_user", "state", "street", "zipcode" FROM "users_addresses";
DROP TABLE "users_addresses";
ALTER TABLE "new_users_addresses" RENAME TO "users_addresses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

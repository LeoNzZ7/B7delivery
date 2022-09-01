/*
  Warnings:

  - You are about to alter the column `street_number` on the `users_addresses` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `zipcode` on the `users_addresses` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `house_number` to the `users_addresses` table without a default value. This is not possible if the table is not empty.
  - Made the column `zipcode` on table `users_addresses` required. This step will fail if there are existing NULL values in that column.

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
    CONSTRAINT "users_addresses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_addresses" ("city", "complement", "id", "id_user", "state", "street", "street_number", "zipcode") SELECT "city", "complement", "id", "id_user", "state", "street", "street_number", "zipcode" FROM "users_addresses";
DROP TABLE "users_addresses";
ALTER TABLE "new_users_addresses" RENAME TO "users_addresses";
CREATE UNIQUE INDEX "users_addresses_id_user_key" ON "users_addresses"("id_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

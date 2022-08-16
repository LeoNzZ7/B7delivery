/*
  Warnings:

  - You are about to drop the column `id_products` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `id_district` on the `users_addresses` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL,
    "secondColor" TEXT NOT NULL
);
INSERT INTO "new_tenants" ("id", "id_user", "mainColor", "name", "secondColor", "slug") SELECT "id", "id_user", "mainColor", "name", "secondColor", "slug" FROM "tenants";
DROP TABLE "tenants";
ALTER TABLE "new_tenants" RENAME TO "tenants";
CREATE UNIQUE INDEX "tenants_id_user_key" ON "tenants"("id_user");
CREATE UNIQUE INDEX "tenants_name_key" ON "tenants"("name");
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "delivery" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "total" REAL NOT NULL,
    CONSTRAINT "orders_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "producst" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("category", "date", "delivery", "id", "id_product", "id_tenant", "price", "quantity", "subtotal", "total") SELECT "category", "date", "delivery", "id", "id_product", "id_tenant", "price", "quantity", "subtotal", "total" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE UNIQUE INDEX "orders_id_user_key" ON "orders"("id_user");
CREATE UNIQUE INDEX "orders_id_product_key" ON "orders"("id_product");
CREATE UNIQUE INDEX "orders_id_tenant_key" ON "orders"("id_tenant");
CREATE TABLE "new_users_addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" TEXT,
    "zipcode" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    CONSTRAINT "users_addresses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_addresses" ("city", "complement", "id", "id_user", "state", "street", "street_number", "zipcode") SELECT "city", "complement", "id", "id_user", "state", "street", "street_number", "zipcode" FROM "users_addresses";
DROP TABLE "users_addresses";
ALTER TABLE "new_users_addresses" RENAME TO "users_addresses";
CREATE UNIQUE INDEX "users_addresses_id_user_key" ON "users_addresses"("id_user");
CREATE TABLE "new_producst" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "img" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "producst_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_producst" ("category", "description", "id", "id_tenant", "img", "name", "price") SELECT "category", "description", "id", "id_tenant", "img", "name", "price" FROM "producst";
DROP TABLE "producst";
ALTER TABLE "new_producst" RENAME TO "producst";
CREATE UNIQUE INDEX "producst_id_tenant_key" ON "producst"("id_tenant");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

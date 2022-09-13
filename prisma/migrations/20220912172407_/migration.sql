/*
  Warnings:

  - Added the required column `id_products` to the `order_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_products` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id_products") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_product" ("id", "id_order", "quantity") SELECT "id", "id_order", "quantity" FROM "order_product";
DROP TABLE "order_product";
ALTER TABLE "new_order_product" RENAME TO "order_product";
CREATE UNIQUE INDEX "order_product_id_products_key" ON "order_product"("id_products");
CREATE TABLE "new_Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_address" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_money_return" REAL NOT NULL,
    "delivery" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Orders_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "users_addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("id", "id_address", "id_tenant", "id_user", "payment_method", "payment_money_return", "status", "subtotal", "total") SELECT "id", "id_address", "id_tenant", "id_user", "payment_method", "payment_money_return", "status", "subtotal", "total" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE UNIQUE INDEX "Orders_id_user_key" ON "Orders"("id_user");
CREATE UNIQUE INDEX "Orders_id_products_key" ON "Orders"("id_products");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

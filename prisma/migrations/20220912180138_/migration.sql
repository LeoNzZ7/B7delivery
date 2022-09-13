/*
  Warnings:

  - You are about to drop the column `id_products` on the `Orders` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_address" INTEGER NOT NULL,
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
INSERT INTO "new_Orders" ("delivery", "id", "id_address", "id_tenant", "id_user", "payment_method", "payment_money_return", "status", "subtotal", "total") SELECT "delivery", "id", "id_address", "id_tenant", "id_user", "payment_method", "payment_money_return", "status", "subtotal", "total" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE UNIQUE INDEX "Orders_id_user_key" ON "Orders"("id_user");
CREATE TABLE "new_orders_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "orders_products_id_products_fkey" FOREIGN KEY ("id_products") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_products_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders_products" ("id", "id_order", "id_products", "quantity") SELECT "id", "id_order", "id_products", "quantity" FROM "orders_products";
DROP TABLE "orders_products";
ALTER TABLE "new_orders_products" RENAME TO "orders_products";
CREATE UNIQUE INDEX "orders_products_id_products_key" ON "orders_products"("id_products");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

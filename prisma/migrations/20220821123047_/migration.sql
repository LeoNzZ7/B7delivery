/*
  Warnings:

  - Added the required column `id_product` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "products_prices" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_product" ("id", "id_order", "products_prices", "quantity") SELECT "id", "id_order", "products_prices", "quantity" FROM "order_product";
DROP TABLE "order_product";
ALTER TABLE "new_order_product" RENAME TO "order_product";
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "id_bag" INTEGER,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    CONSTRAINT "Products_id_bag_fkey" FOREIGN KEY ("id_bag") REFERENCES "bags" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Products_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("category", "description", "id", "id_bag", "id_tenant", "image", "name", "order", "price", "quantity") SELECT "category", "description", "id", "id_bag", "id_tenant", "image", "name", "order", "price", "quantity" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

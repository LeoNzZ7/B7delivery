/*
  Warnings:

  - You are about to drop the column `order` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `id_product` on the `order_product` table. All the data in the column will be lost.
  - Added the required column `id_products` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "id_bag" INTEGER,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "multiplePrice" REAL,
    "description" TEXT,
    CONSTRAINT "Products_id_bag_fkey" FOREIGN KEY ("id_bag") REFERENCES "bags" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Products_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("category", "description", "id", "id_bag", "id_tenant", "image", "multiplePrice", "name", "price", "quantity") SELECT "category", "description", "id", "id_bag", "id_tenant", "image", "multiplePrice", "name", "price", "quantity" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE TABLE "new_order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "products_prices" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_product" ("id", "id_order", "products_prices", "quantity") SELECT "id", "id_order", "products_prices", "quantity" FROM "order_product";
DROP TABLE "order_product";
ALTER TABLE "new_order_product" RENAME TO "order_product";
CREATE UNIQUE INDEX "order_product_id_products_key" ON "order_product"("id_products");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

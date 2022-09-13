/*
  Warnings:

  - You are about to drop the column `id_products` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `products_prices` on the `order_product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_product" ("id", "id_order", "quantity") SELECT "id", "id_order", "quantity" FROM "order_product";
DROP TABLE "order_product";
ALTER TABLE "new_order_product" RENAME TO "order_product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

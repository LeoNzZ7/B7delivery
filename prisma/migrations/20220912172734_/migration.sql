/*
  Warnings:

  - You are about to drop the `order_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "order_product";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "orders_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "orders_products_id_products_fkey" FOREIGN KEY ("id_products") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_products_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id_products") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_products_id_products_key" ON "orders_products"("id_products");

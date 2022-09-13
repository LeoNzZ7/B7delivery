-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "products_prices" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_products_fkey" FOREIGN KEY ("id_products") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_product" ("id", "id_order", "id_products", "products_prices", "quantity") SELECT "id", "id_order", "id_products", "products_prices", "quantity" FROM "order_product";
DROP TABLE "order_product";
ALTER TABLE "new_order_product" RENAME TO "order_product";
CREATE UNIQUE INDEX "order_product_id_products_key" ON "order_product"("id_products");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "main_color" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "tenants_id_fkey" FOREIGN KEY ("id") REFERENCES "products" ("id_tenant") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tenants" ("email", "id", "main_color", "name", "password", "slug", "status") SELECT "email", "id", "main_color", "name", "password", "slug", "status" FROM "tenants";
DROP TABLE "tenants";
ALTER TABLE "new_tenants" RENAME TO "tenants";
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");
CREATE UNIQUE INDEX "tenants_email_key" ON "tenants"("email");
CREATE TABLE "new_order_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_orders" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "product_price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_products" ("id", "id_orders", "id_product", "product_price", "quantity") SELECT "id", "id_orders", "id_product", "product_price", "quantity" FROM "order_products";
DROP TABLE "order_products";
ALTER TABLE "new_order_products" RENAME TO "order_products";
CREATE UNIQUE INDEX "order_products_id_orders_key" ON "order_products"("id_orders");
CREATE UNIQUE INDEX "order_products_id_product_key" ON "order_products"("id_product");
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_products" ("description", "id", "id_category", "id_tenant", "img", "name", "price") SELECT "description", "id", "id_category", "id_tenant", "img", "name", "price" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_id_tenant_key" ON "products"("id_tenant");
CREATE UNIQUE INDEX "products_id_category_key" ON "products"("id_category");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

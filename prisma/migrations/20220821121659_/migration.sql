-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users_addresses" (
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

-- CreateTable
CREATE TABLE "tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL,
    "secondColor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "banners" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "banners_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
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
    CONSTRAINT "Products_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Products_order_fkey" FOREIGN KEY ("order") REFERENCES "order_product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "delivery" REAL NOT NULL,
    CONSTRAINT "bags_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bags_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_address" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_money_return" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "total" REAL NOT NULL,
    CONSTRAINT "Orders_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "users_addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "products_prices" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_statues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_statues_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_addresses_id_user_key" ON "users_addresses"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_name_key" ON "tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_mainColor_key" ON "tenants"("mainColor");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_secondColor_key" ON "tenants"("secondColor");

-- CreateIndex
CREATE UNIQUE INDEX "bags_id_user_key" ON "bags"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_user_key" ON "Orders"("id_user");

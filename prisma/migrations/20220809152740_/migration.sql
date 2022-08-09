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
    "id_district" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    CONSTRAINT "users_addresses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_addresses_id_district_fkey" FOREIGN KEY ("id_district") REFERENCES "districts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "districts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "districts_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "main_color" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_address" INTEGER NOT NULL,
    "payment_method" REAL NOT NULL,
    "payment_method_return" REAL NOT NULL,
    "delivery_price" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "users_addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_fkey" FOREIGN KEY ("id") REFERENCES "order_products" ("id_orders") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_fkey" FOREIGN KEY ("id") REFERENCES "orders_statused" ("id_order") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders_statused" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_order" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceled" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "order_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_orders" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "product_price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "products_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_id_fkey" FOREIGN KEY ("id") REFERENCES "order_products" ("id_product") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "banners" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_addresses_id_user_key" ON "users_addresses"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "districts_id_tenant_key" ON "districts"("id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_email_key" ON "tenants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_user_key" ON "orders"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_tenant_key" ON "orders"("id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_address_key" ON "orders"("id_address");

-- CreateIndex
CREATE UNIQUE INDEX "orders_statused_id_order_key" ON "orders_statused"("id_order");

-- CreateIndex
CREATE UNIQUE INDEX "order_products_id_orders_key" ON "order_products"("id_orders");

-- CreateIndex
CREATE UNIQUE INDEX "order_products_id_product_key" ON "order_products"("id_product");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_tenant_key" ON "products"("id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_category_key" ON "products"("id_category");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_tenant_key" ON "categories"("id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "banners_id_tenant_key" ON "banners"("id_tenant");

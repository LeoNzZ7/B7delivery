-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_product" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "delivery" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "total" REAL NOT NULL,
    CONSTRAINT "orders_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "producst" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_product_key" ON "orders"("id_product");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_tenant_key" ON "orders"("id_tenant");

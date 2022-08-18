/*
  Warnings:

  - Added the required column `status` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `bags` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    CONSTRAINT "Orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("id", "id_products", "id_tenant", "id_user", "subtotal", "total") SELECT "id", "id_products", "id_tenant", "id_user", "subtotal", "total" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE UNIQUE INDEX "Orders_id_user_key" ON "Orders"("id_user");
CREATE TABLE "new_bags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_products" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "delivery" INTEGER NOT NULL,
    CONSTRAINT "bags_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bags_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bags_id_products_fkey" FOREIGN KEY ("id_products") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bags" ("id", "id_products", "id_tenant", "id_user") SELECT "id", "id_products", "id_tenant", "id_user" FROM "bags";
DROP TABLE "bags";
ALTER TABLE "new_bags" RENAME TO "bags";
CREATE UNIQUE INDEX "bags_id_user_key" ON "bags"("id_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

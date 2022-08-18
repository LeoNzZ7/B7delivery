-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_products" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    CONSTRAINT "bags_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bags_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bags_id_products_fkey" FOREIGN KEY ("id_products") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bags" ("id", "id_products", "id_tenant", "id_user") SELECT "id", "id_products", "id_tenant", "id_user" FROM "bags";
DROP TABLE "bags";
ALTER TABLE "new_bags" RENAME TO "bags";
CREATE UNIQUE INDEX "bags_id_user_key" ON "bags"("id_user");
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_bag" INTEGER NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    CONSTRAINT "Products_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("category", "description", "id", "id_bag", "id_tenant", "image", "name", "quantity") SELECT "category", "description", "id", "id_bag", "id_tenant", "image", "name", "quantity" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

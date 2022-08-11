-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_producst" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_tenant" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "img" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_producst" ("category", "description", "id", "id_tenant", "img", "name", "price") SELECT "category", "description", "id", "id_tenant", "img", "name", "price" FROM "producst";
DROP TABLE "producst";
ALTER TABLE "new_producst" RENAME TO "producst";
CREATE UNIQUE INDEX "producst_id_tenant_key" ON "producst"("id_tenant");
CREATE TABLE "new_tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_products" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL,
    "secondColor" TEXT NOT NULL,
    CONSTRAINT "tenants_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenants_id_products_fkey" FOREIGN KEY ("id_products") REFERENCES "producst" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tenants" ("id", "id_products", "id_user", "mainColor", "name", "secondColor", "slug") SELECT "id", "id_products", "id_user", "mainColor", "name", "secondColor", "slug" FROM "tenants";
DROP TABLE "tenants";
ALTER TABLE "new_tenants" RENAME TO "tenants";
CREATE UNIQUE INDEX "tenants_id_user_key" ON "tenants"("id_user");
CREATE UNIQUE INDEX "tenants_id_products_key" ON "tenants"("id_products");
CREATE UNIQUE INDEX "tenants_name_key" ON "tenants"("name");
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to drop the column `expenseId` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `revenueId` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `revenueId` on the `category` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "SubCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("categoryId", "createdAt", "id", "name", "type", "updatedAt", "userId") SELECT "categoryId", "createdAt", "id", "name", "type", "updatedAt", "userId" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");
CREATE TABLE "new_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_category" ("createdAt", "id", "name", "type", "updatedAt", "userId") SELECT "createdAt", "id", "name", "type", "updatedAt", "userId" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");
CREATE TABLE "new_expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "dueDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "categoryName" TEXT,
    "subCategoryName" TEXT,
    CONSTRAINT "expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expense_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "category" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expense_subCategoryName_fkey" FOREIGN KEY ("subCategoryName") REFERENCES "SubCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_expense" ("createdAt", "description", "dueDate", "id", "updatedAt", "userId", "value") SELECT "createdAt", "description", "dueDate", "id", "updatedAt", "userId", "value" FROM "expense";
DROP TABLE "expense";
ALTER TABLE "new_expense" RENAME TO "expense";
CREATE TABLE "new_revenue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "dueDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "categoryName" TEXT,
    "subCategoryName" TEXT,
    CONSTRAINT "revenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenue_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "category" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenue_subCategoryName_fkey" FOREIGN KEY ("subCategoryName") REFERENCES "SubCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_revenue" ("createdAt", "description", "dueDate", "id", "updatedAt", "userId", "value") SELECT "createdAt", "description", "dueDate", "id", "updatedAt", "userId", "value" FROM "revenue";
DROP TABLE "revenue";
ALTER TABLE "new_revenue" RENAME TO "revenue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

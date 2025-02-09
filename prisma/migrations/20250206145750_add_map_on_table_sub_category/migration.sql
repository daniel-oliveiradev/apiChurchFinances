/*
  Warnings:

  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "SubCategory_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubCategory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "subCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "subCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "subCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "dueDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "category" TEXT,
    "subCategory" TEXT,
    CONSTRAINT "expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expense_category_fkey" FOREIGN KEY ("category") REFERENCES "category" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expense_subCategory_fkey" FOREIGN KEY ("subCategory") REFERENCES "subCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_expense" ("category", "createdAt", "description", "dueDate", "id", "subCategory", "updatedAt", "userId", "value") SELECT "category", "createdAt", "description", "dueDate", "id", "subCategory", "updatedAt", "userId", "value" FROM "expense";
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
    "category" TEXT,
    "subCategory" TEXT,
    CONSTRAINT "revenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenue_category_fkey" FOREIGN KEY ("category") REFERENCES "category" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenue_subCategory_fkey" FOREIGN KEY ("subCategory") REFERENCES "subCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_revenue" ("category", "createdAt", "description", "dueDate", "id", "subCategory", "updatedAt", "userId", "value") SELECT "category", "createdAt", "description", "dueDate", "id", "subCategory", "updatedAt", "userId", "value" FROM "revenue";
DROP TABLE "revenue";
ALTER TABLE "new_revenue" RENAME TO "revenue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "subCategory_name_key" ON "subCategory"("name");

/*
  Warnings:

  - You are about to drop the column `categoryName` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryName` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `categoryName` on the `revenue` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryName` on the `revenue` table. All the data in the column will be lost.

*/
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
    CONSTRAINT "expense_subCategory_fkey" FOREIGN KEY ("subCategory") REFERENCES "SubCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
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
    "category" TEXT,
    "subCategory" TEXT,
    CONSTRAINT "revenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenue_category_fkey" FOREIGN KEY ("category") REFERENCES "category" ("name") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenue_subCategory_fkey" FOREIGN KEY ("subCategory") REFERENCES "SubCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_revenue" ("createdAt", "description", "dueDate", "id", "updatedAt", "userId", "value") SELECT "createdAt", "description", "dueDate", "id", "updatedAt", "userId", "value" FROM "revenue";
DROP TABLE "revenue";
ALTER TABLE "new_revenue" RENAME TO "revenue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

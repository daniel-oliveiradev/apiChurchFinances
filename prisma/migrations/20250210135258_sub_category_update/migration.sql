-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "subCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "subCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subCategory" ("categoryId", "createdAt", "id", "name", "type", "updatedAt", "userId") SELECT "categoryId", "createdAt", "id", "name", "type", "updatedAt", "userId" FROM "subCategory";
DROP TABLE "subCategory";
ALTER TABLE "new_subCategory" RENAME TO "subCategory";
CREATE UNIQUE INDEX "subCategory_name_key" ON "subCategory"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

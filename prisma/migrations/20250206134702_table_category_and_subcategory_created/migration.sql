-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "revenueId" TEXT,
    "expenseId" TEXT,
    CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "category_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "revenue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "category_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "revenueId" TEXT,
    "expenseId" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "SubCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SubCategory_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "revenue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SubCategory_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

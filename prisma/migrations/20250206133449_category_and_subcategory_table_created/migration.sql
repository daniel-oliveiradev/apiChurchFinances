-- CreateTable
CREATE TABLE "revenueCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revenueId" TEXT,
    "userId" TEXT,
    CONSTRAINT "revenueCategory_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "revenue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenueCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "expenseCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expenseId" TEXT,
    "userId" TEXT,
    CONSTRAINT "expenseCategory_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expenseCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "revenueSubCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revenueId" TEXT,
    "userId" TEXT,
    "revenueCategoryId" TEXT,
    CONSTRAINT "revenueSubCategory_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "revenue" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenueSubCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenueSubCategory_revenueCategoryId_fkey" FOREIGN KEY ("revenueCategoryId") REFERENCES "revenueCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exepenseSubCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expenseId" TEXT,
    "userId" TEXT,
    "expenseCategoryId" TEXT,
    CONSTRAINT "exepenseSubCategory_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "exepenseSubCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "exepenseSubCategory_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "expenseCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

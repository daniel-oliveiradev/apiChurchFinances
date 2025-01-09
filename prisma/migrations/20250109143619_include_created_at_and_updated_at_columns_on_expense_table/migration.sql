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
    CONSTRAINT "expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_expense" ("description", "dueDate", "id", "userId", "value") SELECT "description", "dueDate", "id", "userId", "value" FROM "expense";
DROP TABLE "expense";
ALTER TABLE "new_expense" RENAME TO "expense";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

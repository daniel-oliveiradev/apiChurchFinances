-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tithers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "revenueId" TEXT,
    CONSTRAINT "tithers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tithers_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "revenue" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tithers" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "tithers";
DROP TABLE "tithers";
ALTER TABLE "new_tithers" RENAME TO "tithers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

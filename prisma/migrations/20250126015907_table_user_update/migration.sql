-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validationId" TEXT,
    "isValidated" BOOLEAN DEFAULT false
);
INSERT INTO "new_user" ("createdAt", "email", "id", "isAdmin", "isValidated", "name", "nickname", "password", "updatedAt", "validationId") SELECT "createdAt", "email", "id", "isAdmin", "isValidated", "name", "nickname", "password", "updatedAt", "validationId" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_isValidated_key" ON "user"("isValidated");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

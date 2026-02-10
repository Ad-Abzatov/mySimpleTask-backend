-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "SubPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubPost" ("id", "postId", "title") SELECT "id", "postId", "title" FROM "SubPost";
DROP TABLE "SubPost";
ALTER TABLE "new_SubPost" RENAME TO "SubPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

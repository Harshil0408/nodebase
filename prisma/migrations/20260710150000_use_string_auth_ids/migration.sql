-- Better Auth generates string IDs for users and stores them in session/account
-- relationships. Convert the existing numeric IDs without discarding records.
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";
ALTER TABLE "public"."session" DROP CONSTRAINT "session_userId_fkey";
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

ALTER TABLE "public"."user" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "public"."user" ALTER COLUMN "id" TYPE TEXT USING "id"::TEXT;
ALTER TABLE "public"."Post" ALTER COLUMN "authorId" TYPE TEXT USING "authorId"::TEXT;
ALTER TABLE "public"."session" ALTER COLUMN "userId" TYPE TEXT USING "userId"::TEXT;
ALTER TABLE "public"."account" ALTER COLUMN "userId" TYPE TEXT USING "userId"::TEXT;

ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_authorId_fkey"
  FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

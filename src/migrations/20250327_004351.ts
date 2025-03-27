import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_markers_family_alone_friends" RENAME TO "enum_markers_company";
  ALTER TABLE "markers" RENAME COLUMN "duration_days" TO "duration";
  ALTER TABLE "markers" RENAME COLUMN "family_alone_friends" TO "company";
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_markers_fk";
  
  DROP INDEX IF EXISTS "posts_rels_markers_id_idx";
  ALTER TABLE "markers" ADD COLUMN "post_id" integer;
  DO $$ BEGIN
   ALTER TABLE "markers" ADD CONSTRAINT "markers_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "markers_post_idx" ON "markers" USING btree ("post_id");
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "markers_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_markers_family_alone_friends" AS ENUM('family', 'alone', 'friends');
  ALTER TABLE "markers" RENAME COLUMN "duration" TO "duration_days";
  ALTER TABLE "markers" RENAME COLUMN "company" TO "family_alone_friends";
  ALTER TABLE "markers" DROP CONSTRAINT "markers_post_id_posts_id_fk";
  
  DROP INDEX IF EXISTS "markers_post_idx";
  ALTER TABLE "posts_rels" ADD COLUMN "markers_id" integer;
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_markers_fk" FOREIGN KEY ("markers_id") REFERENCES "public"."markers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts_rels_markers_id_idx" ON "posts_rels" USING btree ("markers_id");
  ALTER TABLE "markers" DROP COLUMN IF EXISTS "post_id";
  DROP TYPE "public"."enum_markers_company";`)
}

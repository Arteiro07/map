import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_markers_season" AS ENUM('winter', 'spring', 'summer', 'fall');
  CREATE TYPE "public"."enum_markers_family_alone_friends" AS ENUM('family', 'alone', 'friends');
  ALTER TABLE "markers" ADD COLUMN "year" numeric NOT NULL;
  ALTER TABLE "markers" ADD COLUMN "season" "enum_markers_season" NOT NULL;
  ALTER TABLE "markers" ADD COLUMN "rating" numeric NOT NULL;
  ALTER TABLE "markers" ADD COLUMN "duration_days" numeric;
  ALTER TABLE "markers" ADD COLUMN "family_alone_friends" "enum_markers_family_alone_friends";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "markers" DROP COLUMN IF EXISTS "year";
  ALTER TABLE "markers" DROP COLUMN IF EXISTS "season";
  ALTER TABLE "markers" DROP COLUMN IF EXISTS "rating";
  ALTER TABLE "markers" DROP COLUMN IF EXISTS "duration_days";
  ALTER TABLE "markers" DROP COLUMN IF EXISTS "family_alone_friends";
  DROP TYPE "public"."enum_markers_season";
  DROP TYPE "public"."enum_markers_family_alone_friends";`)
}

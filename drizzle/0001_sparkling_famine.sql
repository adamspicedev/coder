ALTER TABLE "challenges" ADD COLUMN "language" text DEFAULT 'javascript' NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "time_limit" integer;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "points" integer DEFAULT 10;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "created_by" uuid;--> statement-breakpoint
UPDATE "challenges" SET "created_by" = '41bfb891-4a06-401c-a959-35e75faf5cbf' WHERE "created_by" IS NULL;--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenges" ADD CONSTRAINT "challenges_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

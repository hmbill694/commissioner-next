CREATE TABLE IF NOT EXISTS "commissioner_property" (
	"id" uuid PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"user_id" varchar(256) NOT NULL,
	"asking_price" numeric NOT NULL,
	"commission_rate" numeric NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "property_id_created_at_idx" ON "commissioner_property" ("created_at","id");
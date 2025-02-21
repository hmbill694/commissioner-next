import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
  decimal
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `commissioner_${name}`);

export const propertyTable = createTable(
  "property",
  {
    id: uuid("id").primaryKey(),
    address: text("address").notNull(),
    name: text("name"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt"),
    userId: varchar("user_id", { length: 256 }).notNull(),
    askingPrice: decimal("asking_price").notNull(),
    commissionRate: decimal("commission_rate").notNull(),
    description: text("description")
  },
  (property) => ({
    nameIndex: index("property_id_created_at_idx").on(
      property.createdAt,
      property.id,
    ),
  }),
);

export type Property = InferSelectModel<typeof propertyTable>;
export type PropertyInsert = InferInsertModel<typeof propertyTable>
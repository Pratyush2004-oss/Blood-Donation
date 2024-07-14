import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userdata = pgTable("User-Data",{
    id:serial('id').primaryKey(),
    name: varchar('Username').notNull(),
    usermail:varchar('Usermail').notNull().unique(),
    age:integer('Age').notNull(),
    bloodgroup:varchar('Bloodgroup').notNull(),
    mobile:varchar('Mobile').notNull().unique(),
    city:varchar('City').notNull(),
    joinedAt: varchar('JoinedAt').notNull()
})
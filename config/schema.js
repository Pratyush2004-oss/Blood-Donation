import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userdata = pgTable("User-Data",{
    id:serial('id').primaryKey(),
    name: varchar('Username').notNull(),
    usermail:varchar('Usermail').notNull().unique(),
    birthdate:varchar('DOB').notNull(),
    bloodgroup:varchar('Bloodgroup').notNull(),
    mobile:varchar('Mobile').notNull().unique(),
    country: varchar("Country").notNull(),
    state: varchar("State").notNull(),
    city:varchar('City').notNull(),
})
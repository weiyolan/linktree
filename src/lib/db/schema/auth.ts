import { mysqlTable, bigint, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("auth_user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	username: varchar("username", { length: 255 }),
});

export const keys = mysqlTable("user_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull(),
		// .references(() => users.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const sessions = mysqlTable("user_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull(),
		// .references(() => users.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});
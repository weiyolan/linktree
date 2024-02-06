CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` varchar(15) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`username` varchar(255),
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`user_id` varchar(255) NOT NULL,
	`stripe_customer_id` varchar(255) NOT NULL,
	`stripe_subscription_id` varchar(255),
	`stripe_price_id` varchar(255),
	`stripe_current_period_end` timestamp,
	CONSTRAINT `subscriptions_user_id_stripe_customer_id_pk` PRIMARY KEY(`user_id`,`stripe_customer_id`),
	CONSTRAINT `subscriptions_user_id_unique` UNIQUE(`user_id`),
	CONSTRAINT `subscriptions_stripe_customer_id_unique` UNIQUE(`stripe_customer_id`),
	CONSTRAINT `subscriptions_stripe_subscription_id_unique` UNIQUE(`stripe_subscription_id`)
);

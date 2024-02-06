CREATE TABLE `pages` (
	`id` varchar(191) NOT NULL,
	`title` varchar(256) NOT NULL,
	`public` boolean NOT NULL DEFAULT false,
	`slug` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);

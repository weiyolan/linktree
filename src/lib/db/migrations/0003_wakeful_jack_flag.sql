CREATE TABLE `movies` (
	`id` varchar(191) NOT NULL,
	`title` varchar(256) NOT NULL,
	`category` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `movies_id` PRIMARY KEY(`id`)
);

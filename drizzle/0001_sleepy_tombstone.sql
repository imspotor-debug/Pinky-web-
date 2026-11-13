CREATE TABLE `license_devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`licenseId` int NOT NULL,
	`deviceHash` varchar(64) NOT NULL,
	`firstSeen` timestamp NOT NULL DEFAULT (now()),
	`lastSeen` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `license_devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `license_device_unique` UNIQUE(`licenseId`,`deviceHash`)
);
--> statement-breakpoint
CREATE TABLE `license_keys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyHash` varchar(64) NOT NULL,
	`prefix` enum('ACUSADO','POCOYO7X') NOT NULL,
	`lastFour` varchar(4) NOT NULL,
	`durationDays` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp NOT NULL,
	`maxUsers` int NOT NULL,
	`paused` boolean NOT NULL DEFAULT false,
	`deletedAt` timestamp,
	CONSTRAINT `license_keys_id` PRIMARY KEY(`id`),
	CONSTRAINT `license_keys_keyHash_unique` UNIQUE(`keyHash`)
);
--> statement-breakpoint
ALTER TABLE `license_devices` ADD CONSTRAINT `license_devices_licenseId_license_keys_id_fk` FOREIGN KEY (`licenseId`) REFERENCES `license_keys`(`id`) ON DELETE cascade ON UPDATE no action;
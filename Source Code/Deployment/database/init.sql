CREATE TABLE IF NOT EXISTS `bird` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birdName` varchar(255) DEFAULT NULL,
  `studID` varchar(255) DEFAULT NULL,
  `newStudID` varchar(255) DEFAULT NULL,
  `leftRingID` varchar(255) DEFAULT NULL,
  `rightRingID` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `isBreeder` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `layDate` bigint(20) DEFAULT NULL,
  `hatchDate` bigint(20) DEFAULT NULL,
  `incubationDays` double DEFAULT NULL,
  `fledgeDate` bigint(20) DEFAULT NULL,
  `releasedWhen` bigint(20) DEFAULT NULL,
  `groupName` varchar(255) DEFAULT NULL,
  `motherName` varchar(255) DEFAULT NULL,
  `fatherName` varchar(255) DEFAULT NULL,
  `secondFatherName` varchar(255) DEFAULT NULL,
  `motherStudID` varchar(255) DEFAULT NULL,
  `fatherStudID` varchar(255) DEFAULT NULL,
  `secondFatherStudID` varchar(255) DEFAULT NULL,
  `researcherNotes` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `editedBy` int(11) DEFAULT NULL,
  `laidWhere` int(11) DEFAULT NULL,
  `hatchedWhere` int(11) DEFAULT NULL,
  `fledgedWhere` int(11) DEFAULT NULL,
  `releasedWhere` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `birdName` (`birdName`),
  UNIQUE KEY `studID` (`studID`),
  UNIQUE KEY `newStudID` (`newStudID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `birdcondition` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birdCondition` varchar(255) DEFAULT NULL,
  `dateNoted` bigint(20) DEFAULT NULL,
  `birdID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `birdnest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateEntered` bigint(20) DEFAULT NULL,
  `dateLeft` bigint(20) DEFAULT NULL,
  `birdID` int(11) DEFAULT NULL,
  `nestID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `changelog` (
  `createdAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `newData` text,
  `oldData` text,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `lock` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `expiresAt` bigint(20) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nestsite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nestID` varchar(255) DEFAULT NULL,
  `nestDescription` varchar(255) DEFAULT NULL,
  `distanceToHoppersKm` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `editedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nestID` (`nestID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `rfidtag` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `nfcRFID` varchar(255) NOT NULL,
  `nfcRFIDInternal` varchar(255) DEFAULT NULL,
  `colour` varchar(255) DEFAULT NULL,
  `birdID` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`nfcRFID`),
  UNIQUE KEY `nfcRFID` (`nfcRFID`),
  UNIQUE KEY `nfcRFIDInternal` (`nfcRFIDInternal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` IF NOT EXISTS (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `hasRead` tinyint(1) DEFAULT NULL,
  `hasCreateEdit` tinyint(1) DEFAULT NULL,
  `hasEditFull` tinyint(1) DEFAULT NULL,
  `hasExport` tinyint(1) DEFAULT NULL,
  `hasAdmin` tinyint(1) DEFAULT NULL,
  `isSuperAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `visit` (
  `createdAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birdID` int(11) DEFAULT NULL,
  `nfcRFID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT IGNORE INTO `user` (id,username,fullName,password,hasRead,hasCreateEdit,hasEditFull,hasExport,hasAdmin, isSuperAdmin, createdAt, updatedAt) VALUES
(1,'superadmin','Roman Superadmin','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,1,1,1,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')));

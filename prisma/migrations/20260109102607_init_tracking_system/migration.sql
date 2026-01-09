-- CreateTable
CREATE TABLE `Shipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trackingNumber` VARCHAR(191) NOT NULL,
    `vesselName` VARCHAR(191) NULL,
    `clientName` VARCHAR(191) NOT NULL,
    `originPort` VARCHAR(191) NOT NULL,
    `destinationPort` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'IN_TRANSIT', 'CLEARED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `estimatedArrival` DATETIME(3) NOT NULL,
    `actualArrival` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Shipment_trackingNumber_key`(`trackingNumber`),
    INDEX `Shipment_trackingNumber_idx`(`trackingNumber`),
    INDEX `Shipment_clientName_idx`(`clientName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `FuelUnits` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `unit`      VARCHAR(20) NOT NULL,
    `unitName`  VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `FuelConsumptionUnits` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `unit`      VARCHAR(20) NOT NULL,
    `unitName`  VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `DistanceUnits` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `unit`      VARCHAR(20) NOT NULL,
    `unitName`  VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `CurrencyUnits` (
    `id`        INT(11)     NOT NULL AUTO_INCREMENT,
    `unit`      VARCHAR(20) NOT NULL,
    `unitName`  VARCHAR(50) NOT NULL,
    `symbol`    VARCHAR(10) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `Users` (
    `id`                    VARCHAR(36)  NOT NULL,
    `email`                 VARCHAR(100) NOT NULL,
    `username`              VARCHAR(100) NOT NULL,
    `password`              VARCHAR(200) NOT NULL,
    `admin`                 TINYINT(1)   NULL DEFAULT 0,
    `fuelUnit`              INT(11)      NOT NULL,
    `distanceUnit`          INT(11)      NOT NULL,
    `fuelConsumptionUnit`   INT(11)      NOT NULL,
    `currencyUnit`          INT(11)      NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC),
    INDEX `FK_user_fuelUnit_idx` (`fuelUnit`),
    INDEX `FK_user_distanceUnit_idx` (`distanceUnit`),
    INDEX `FK_user_fuelConsumptionUnit_idx` (`fuelConsumptionUnit`),
    INDEX `FK_user_currencyUnit_idx` (`currencyUnit`),
    CONSTRAINT `FK_user_fuelUnit`            FOREIGN KEY (`fuelUnit`)            REFERENCES `FuelUnits` (`id`)               ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_user_distanceUnit`        FOREIGN KEY (`distanceUnit`)        REFERENCES `DistanceUnits` (`id`)           ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_user_fuelConsumptionUnit` FOREIGN KEY (`fuelConsumptionUnit`) REFERENCES `FuelConsumptionUnits` (`id`)    ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_user_currencyUnit`        FOREIGN KEY (`currencyUnit`)        REFERENCES `CurrencyUnits` (`id`)           ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `FuelTypes` (
    `id`    INT(11)     NOT NULL AUTO_INCREMENT,
    `type`  VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
);

CREATE TABLE `Vehicles` (
    `id`                    VARCHAR(36)     NOT NULL,
    `user`                  VARCHAR(36)     NOT NULL,
    `name`                  VARCHAR(100)    NOT NULL,
    `registration`          VARCHAR(20)     DEFAULT NULL,
    `make`                  VARCHAR(100)    DEFAULT NULL,
    `model`                 VARCHAR(100)    DEFAULT NULL,
    `picture`               VARCHAR(100)    DEFAULT NULL,
    `yearOfManufacture`     INT(11)         NULL,
    `vin`                   VARCHAR(100)    NULL,
    `engineSizeCC`          INT(11)         NULL,
    `fuelType`              INT(11)         NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC),
    INDEX `FK_vehicle_user_idx` (`user`),
    INDEX `FK_vehicle_fuelType_idx` (`fuelType`),
    CONSTRAINT `FK_vehicle_fuelType`            FOREIGN KEY (`fuelType`)    REFERENCES `FuelTypes` (`id`)   ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_vehicle_user`                FOREIGN KEY (`user`)        REFERENCES `Users` (`id`)       ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE  TABLE `Fuel` (
    `id`                    VARCHAR(36)     NOT NULL,
    `vehicle`               VARCHAR(36)     NOT NULL,
    `date`                  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `fuelAmount`            DECIMAL(5,2)    NOT NULL,
    `totalCost`             DECIMAL(5,2)    NULL,
    `fuelUnitCost`          DECIMAL(5,3)    NULL,
    `locationLatitude`      DECIMAL(10,8)   NULL,
    `locationLongitude`     DECIMAL(11,8)   NULL,
    `odometerReading`       INT(11)         NULL,
    `notes`                 TEXT            NULL,
    `fullTank`              TINYINT(1)      NULL DEFAULT 1,
    `missedFillUp`          TINYINT(1)      NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    INDEX `FK_fuel_vehicleId_idx` (`vehicle` ASC),
    CONSTRAINT `FK_fuel_vehicleId` FOREIGN KEY (`vehicle`) REFERENCES `Vehicles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `Costs` (
    `id`            VARCHAR(36) NOT NULL,
    `vehicle`       VARCHAR(36) NOT NULL,
    `date`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `costType`      VARCHAR(20) NOT NULL,
    `totalCost`     DECIMAL(6,2) NOT NULL,
    `invoice`       VARCHAR(100) NULL,
    `notes`         TEXT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    INDEX `FK_cost_vehicleId_idx` (`vehicle` ASC),
    CONSTRAINT `FK_cost_vehicleId` FOREIGN KEY (`vehicle`) REFERENCES `Vehicles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

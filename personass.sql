-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for parcialipc
CREATE DATABASE IF NOT EXISTS `parcialipc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `parcialipc`;

-- Dumping structure for table parcialipc.alertas
CREATE TABLE IF NOT EXISTS `alertas` (
  `idAlerta` int NOT NULL AUTO_INCREMENT,
  `idProyecto` int NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`idAlerta`),
  KEY `fk_proyecto` (`idProyecto`),
  CONSTRAINT `fk_proyecto` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parcialipc.alertas: ~23 rows (approximately)
INSERT INTO `alertas` (`idAlerta`, `idProyecto`, `Descripcion`) VALUES
	(63, 169, 'Faltan 6 días para la fecha final del proyecto "Proyecto Test".'),
	(64, 171, 'Faltan 6 días para la fecha final del proyecto "Proyecto Test".'),
	(66, 173, 'Faltan 6 días para la fecha final del proyecto "Proyecto Test".'),
	(68, 175, 'Faltan 6 días para la fecha final del proyecto "Proyecto Test".'),
	(69, 176, 'Alerta manual de prueba'),
	(70, 179, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(71, 180, 'Alerta manual de prueba'),
	(72, 182, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(73, 183, 'Alerta manual de prueba'),
	(74, 185, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(75, 186, 'Alerta manual de prueba'),
	(76, 188, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(77, 189, 'Alerta manual de prueba'),
	(78, 191, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(79, 192, 'Alerta manual de prueba'),
	(80, 194, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(81, 195, 'Alerta manual de prueba'),
	(82, 197, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(83, 198, 'Alerta manual de prueba'),
	(84, 200, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(85, 201, 'Alerta manual de prueba'),
	(86, 203, 'Faltan 7 días para la fecha final del proyecto "Proyecto Test".'),
	(87, 204, 'Alerta manual de prueba');

-- Dumping structure for table parcialipc.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `tipoTrabajo` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `idProyecto` int DEFAULT NULL,
  PRIMARY KEY (`idEmpleado`),
  UNIQUE KEY `email` (`email`),
  KEY `idProyecto` (`idProyecto`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parcialipc.empleados: ~27 rows (approximately)
INSERT INTO `empleados` (`idEmpleado`, `nombre`, `apellido`, `telefono`, `email`, `fechaNacimiento`, `tipoTrabajo`, `estado`, `idProyecto`) VALUES
	(1, 'angely', 'thomas', '55330035', 'angelythgmai.com', '2024-08-23', 'programador', '1', 180),
	(3, 'aracely', 'cortezs', '55330035', 'aracelygmai.com', '2024-08-23', 'desarrollador', '1', 185),
	(5, 'jose', 'cortezs', '55330035', 'jose.com', '2024-08-23', 'desarrollador', '1', 180),
	(6, 'matias', 'cortezs', '55330035', 'maitas.com', '2024-08-23', 'desarrollador', '1', 189),
	(153, 'matias', 'cortezs', '55330035', 'a.com', '2024-08-23', 'desarrollador', '1', 205),
	(154, 'matias', 'cortezs', '55330035', '222.com', '2024-08-23', 'desarrollador', '1', 180),
	(155, 'matias', 'cortezs', '55330035', '3333.com', '2024-08-23', 'desarrollador', '1', 180),
	(156, 'matias', 'cortezs', '55330035', '2231231.com', '2024-08-23', 'desarrollador', '1', 180),
	(157, 'matias', 'cortezs', '55330035', '2342342.com', '2024-08-23', 'desarrollador', '1', 186),
	(158, 'matias', 'cortezs', '55330035', '1213231.com', '2024-08-23', 'desarrollador', '1', 186),
	(159, 'matias', 'cortezs', '55330035', '43534535.com', '2024-08-23', 'desarrollador', '1', 186),
	(162, 'matias', 'cortezs', '55330035', '2342.com', '2024-08-23', 'desarrollador', '1', 176),
	(166, 'matias', 'cortezs', '55330035', '675775.com', '2024-08-23', 'desarrollador', '1', 176),
	(167, 'matias', 'cortezs', '55330035', '35454545.com', '2024-08-23', 'desarrollador', '1', 186),
	(168, 'matias', 'cortezs', '55330035', '87878787.com', '2024-08-23', 'desarrollador', '1', 176),
	(169, 'matias', 'cortezs', '55330035', '9898989.com', '2024-08-23', 'desarrollador', '1', 176),
	(170, 'matias', 'cortezs', '55330035', '345.com', '2024-08-23', 'desarrollador', '1', 176),
	(171, 'matias', 'cortezs', '55330035', '09090099.com', '2024-08-23', 'desarrollador', '1', 189),
	(172, 'matias', 'cortezs', '55330035', '0000000.com', '2024-08-23', 'desarrollador', '1', 176),
	(173, 'matias', 'cortezs', '55330035', 'hjgjgh.comdy', '2024-08-23', 'desarrollador', '1', 186),
	(174, 'matias', 'cortezs', '55330035', 'kuykuyku.comdy', '2024-08-23', 'desarrollador', '1', 176),
	(175, 'matias', 'cortezs', '55330035', 'kukukuiu.comdy', '2024-08-23', 'desarrollador', '1', 183),
	(176, 'matias', 'cortezs', '55330035', 'dfgdgdfgdf.comdy', '2024-08-23', 'desarrollador', '1', 183),
	(177, 'matias', 'cortezs', '55330035', 'rtrtrtrt.comdy', '2024-08-23', 'desarrollador', '1', 180),
	(178, 'matias', 'cortezs', '55330035', 'dfgdfgdfgdg.comdy', '2024-08-23', 'desarrollador', '1', 176),
	(179, 'matias', 'cortezs', '55330035', 'tytytyty.comdy', '2024-08-23', 'desarrollador', '1', 182),
	(180, 'matias', 'cortezs', '55330035', 'jjjjjjj.comdy', '2024-08-23', 'desarrollador', '1', 185);

-- Dumping structure for table parcialipc.personas
CREATE TABLE IF NOT EXISTS `personas` (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `edad` int NOT NULL,
  `profesion` varchar(100) DEFAULT NULL,
  `universidad` varchar(100) DEFAULT NULL,
  `carrera` varchar(100) DEFAULT NULL,
  `trabajo` varchar(100) DEFAULT NULL,
  `vehiculo` varchar(100) DEFAULT NULL,
  `estado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`idPersona`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parcialipc.personas: ~4 rows (approximately)
INSERT INTO `personas` (`idPersona`, `nombre`, `apellido`, `edad`, `profesion`, `universidad`, `carrera`, `trabajo`, `vehiculo`, `estado`) VALUES
	(3, 'Angely', 'Thomas', 19, 'ingeniera', 'mesoamericana', 'ingenieria', 'ingenieria', 'toyota', '1'),
	(4, 'Angely', 'Thomas', 19, 'ingeniera', 'mesoamericana', 'ingenieria', 'ingenieria', 'mazda', '1'),
	(5, 'Angely', 'Thomas', 19, 'ingeniera', 'mesoamericana', 'ingenieria', 'ingenieria', 'mazda', '0');

-- Dumping structure for table parcialipc.proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `idProyecto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `porcentaje` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`idProyecto`),
  CONSTRAINT `proyectos_chk_1` CHECK (((`porcentaje` >= 0) and (`porcentaje` <= 100)))
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table parcialipc.proyectos: ~37 rows (approximately)
INSERT INTO `proyectos` (`idProyecto`, `nombre`, `descripcion`, `fechaInicio`, `fechaFin`, `porcentaje`) VALUES
	(169, 'Proyecto Test', NULL, '2024-07-31', '2024-09-05', 50.00),
	(170, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-09-08', 50.00),
	(171, 'Proyecto Test', NULL, '2024-07-31', '2024-09-05', 50.00),
	(172, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-09-08', 50.00),
	(173, 'Proyecto Test', NULL, '2024-07-31', '2024-09-05', 50.00),
	(174, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-09-08', 50.00),
	(175, 'Proyecto Test', NULL, '2024-07-31', '2024-09-05', 50.00),
	(176, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(177, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-09-08', 50.00),
	(178, 'Angely', NULL, NULL, NULL, 0.00),
	(179, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(180, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(181, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(182, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(183, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(184, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(185, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(186, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(187, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(188, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(189, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(190, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(191, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(192, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(193, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(194, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(195, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(196, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(197, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(198, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(199, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(200, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(201, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(202, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00),
	(203, 'Proyecto Test', NULL, '2024-07-31', '2024-10-04', 50.00),
	(204, 'Proyecto para Alerta Manual', NULL, '2024-07-31', '2024-08-31', 50.00),
	(205, 'Proyecto Test 10 días', NULL, '2024-07-31', '2024-10-07', 50.00);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

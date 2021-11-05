-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 05-11-2021 a las 16:18:17
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `an_camera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `diagnosis` varchar(100) NOT NULL,
  `image_status` varchar(100) NOT NULL DEFAULT 'declined',
  `registered_by` varchar(100) NOT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`id`, `name`, `image`, `diagnosis`, `image_status`, `registered_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(17, 'jesus', 'imagenjesus.pnsgs', 'negative', 'declined', 'doctor1', NULL, '2021-11-03 16:03:20.788', NULL),
(18, 'jesus', 'imagenjesus.png', 'negative', 'declined', 'doctor1', NULL, '2021-11-03 16:11:19.640', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:1337
-- Generation Time: Feb 04, 2024 at 05:04 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `removed_item`
--

CREATE TABLE `removed_item` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `removed_item`
--

INSERT INTO `removed_item` (`id`, `name`, `review`) VALUES
(1, 'Upplandsmuseet', 'topel var där!'),
(2, 'Upplands runinskrifter Fv1972;271', 'TOPEL BAJSADE PÅ STENNEN LOL');

-- --------------------------------------------------------

--
-- Table structure for table `saved_item`
--

CREATE TABLE `saved_item` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `saved_item`
--

INSERT INTO `saved_item` (`id`, `name`) VALUES
(2, 'Televerkets hus, Uppsala'),
(3, 'Upplands runinskrifter Fv1976;107'),
(4, 'Domkapitelhuset'),
(6, 'Domtrapphuset');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `removed_item`
--
ALTER TABLE `removed_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_item`
--
ALTER TABLE `saved_item`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `removed_item`
--
ALTER TABLE `removed_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `saved_item`
--
ALTER TABLE `saved_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

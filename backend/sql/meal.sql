-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Dic 12, 2025 alle 15:46
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meal`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `accepts`
--

CREATE TABLE `accepts` (
  `RECIPES_recipe_id` int(11) NOT NULL,
  `TAG_tag_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `has`
--

CREATE TABLE `has` (
  `RECIPES_recipe_id` int(11) NOT NULL,
  `INGREDIENTS_name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ingredients`
--

CREATE TABLE `ingredients` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `measured_in`
--

CREATE TABLE `measured_in` (
  `INGREDIENTS_name` varchar(255) NOT NULL,
  `UNIT_OF_MEASUREMENT_measurement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `preparations`
--

CREATE TABLE `preparations` (
  `RECIPES_recipe_id` int(11) NOT NULL,
  `step_number` varchar(255) NOT NULL,
  `step_desc` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `prep_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `difficulty` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `course` varchar(255) NOT NULL,
  `recipe_image` mediumblob NOT NULL,
  `USERS_username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tag`
--

CREATE TABLE `tag` (
  `tag_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `unit_of_measurement`
--

CREATE TABLE `unit_of_measurement` (
  `measurement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `role` varchar(255) NOT NULL,
  `profile_picture` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accepts`
--
ALTER TABLE `accepts`
  ADD PRIMARY KEY (`RECIPES_recipe_id`,`TAG_tag_name`),
  ADD KEY `TAG_tag_name` (`TAG_tag_name`);

--
-- Indici per le tabelle `has`
--
ALTER TABLE `has`
  ADD PRIMARY KEY (`RECIPES_recipe_id`,`INGREDIENTS_name`),
  ADD KEY `INGREDIENTS_name` (`INGREDIENTS_name`);

--
-- Indici per le tabelle `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`name`);

--
-- Indici per le tabelle `measured_in`
--
ALTER TABLE `measured_in`
  ADD PRIMARY KEY (`INGREDIENTS_name`,`UNIT_OF_MEASUREMENT_measurement`),
  ADD KEY `UNIT_OF_MEASUREMENT_measurement` (`UNIT_OF_MEASUREMENT_measurement`);

--
-- Indici per le tabelle `preparations`
--
ALTER TABLE `preparations`
  ADD PRIMARY KEY (`RECIPES_recipe_id`,`step_number`);

--
-- Indici per le tabelle `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `USERS_username` (`USERS_username`);

--
-- Indici per le tabelle `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`tag_name`);

--
-- Indici per le tabelle `unit_of_measurement`
--
ALTER TABLE `unit_of_measurement`
  ADD PRIMARY KEY (`measurement`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accepts`
--
ALTER TABLE `accepts`
  ADD CONSTRAINT `accepts_ibfk_1` FOREIGN KEY (`RECIPES_recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `accepts_ibfk_2` FOREIGN KEY (`TAG_tag_name`) REFERENCES `tag` (`tag_name`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `has`
--
ALTER TABLE `has`
  ADD CONSTRAINT `has_ibfk_1` FOREIGN KEY (`RECIPES_recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `has_ibfk_2` FOREIGN KEY (`INGREDIENTS_name`) REFERENCES `ingredients` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `measured_in`
--
ALTER TABLE `measured_in`
  ADD CONSTRAINT `measured_in_ibfk_1` FOREIGN KEY (`INGREDIENTS_name`) REFERENCES `ingredients` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `measured_in_ibfk_2` FOREIGN KEY (`UNIT_OF_MEASUREMENT_measurement`) REFERENCES `unit_of_measurement` (`measurement`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `preparations`
--
ALTER TABLE `preparations`
  ADD CONSTRAINT `preparations_ibfk_1` FOREIGN KEY (`RECIPES_recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`USERS_username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

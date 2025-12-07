-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Dic 07, 2025 alle 18:05
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
-- Struttura della tabella `accetta`
--

CREATE TABLE `accetta` (
  `RICETTA_IDRicetta` int(11) NOT NULL,
  `TAG_nomeTag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ha`
--

CREATE TABLE `ha` (
  `RICETTA_IDRicetta` int(11) NOT NULL,
  `INGREDIENTI_nome` varchar(255) NOT NULL,
  `quantita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ingredienti`
--

CREATE TABLE `ingredienti` (
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `misurato_in_`
--

CREATE TABLE `misurato_in_` (
  `INGREDIENTI_nome` varchar(255) NOT NULL,
  `UNITA_DI_MISURA_MISURA` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `preparazioni`
--

CREATE TABLE `preparazioni` (
  `RICETTA_IDRicetta` int(11) NOT NULL,
  `STEP` varchar(255) NOT NULL,
  `passaggio` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ricetta`
--

CREATE TABLE `ricetta` (
  `IDRicetta` int(11) NOT NULL,
  `NOME` varchar(255) NOT NULL,
  `tempoPrep` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `difficolta` varchar(255) NOT NULL,
  `portata` varchar(255) NOT NULL,
  `descrizione` longtext DEFAULT NULL,
  `UTENTE_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tag`
--

CREATE TABLE `tag` (
  `nomeTag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `unita_di_misura`
--

CREATE TABLE `unita_di_misura` (
  `MISURA` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `ID` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `nRicette` int(11) NOT NULL,
  `ruolo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accetta`
--
ALTER TABLE `accetta`
  ADD PRIMARY KEY (`RICETTA_IDRicetta`,`TAG_nomeTag`),
  ADD KEY `TAG_nomeTag` (`TAG_nomeTag`);

--
-- Indici per le tabelle `ha`
--
ALTER TABLE `ha`
  ADD PRIMARY KEY (`RICETTA_IDRicetta`,`INGREDIENTI_nome`),
  ADD KEY `INGREDIENTI_nome` (`INGREDIENTI_nome`);

--
-- Indici per le tabelle `ingredienti`
--
ALTER TABLE `ingredienti`
  ADD PRIMARY KEY (`nome`);

--
-- Indici per le tabelle `misurato_in_`
--
ALTER TABLE `misurato_in_`
  ADD PRIMARY KEY (`INGREDIENTI_nome`,`UNITA_DI_MISURA_MISURA`),
  ADD KEY `UNITA_DI_MISURA_MISURA` (`UNITA_DI_MISURA_MISURA`);

--
-- Indici per le tabelle `preparazioni`
--
ALTER TABLE `preparazioni`
  ADD PRIMARY KEY (`RICETTA_IDRicetta`,`STEP`);

--
-- Indici per le tabelle `ricetta`
--
ALTER TABLE `ricetta`
  ADD PRIMARY KEY (`IDRicetta`),
  ADD KEY `UTENTE_ID` (`UTENTE_ID`);

--
-- Indici per le tabelle `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`nomeTag`);

--
-- Indici per le tabelle `unita_di_misura`
--
ALTER TABLE `unita_di_misura`
  ADD PRIMARY KEY (`MISURA`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `ricetta`
--
ALTER TABLE `ricetta`
  MODIFY `IDRicetta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accetta`
--
ALTER TABLE `accetta`
  ADD CONSTRAINT `accetta_ibfk_1` FOREIGN KEY (`RICETTA_IDRicetta`) REFERENCES `ricetta` (`IDRicetta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `accetta_ibfk_2` FOREIGN KEY (`TAG_nomeTag`) REFERENCES `tag` (`nomeTag`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `ha`
--
ALTER TABLE `ha`
  ADD CONSTRAINT `ha_ibfk_1` FOREIGN KEY (`RICETTA_IDRicetta`) REFERENCES `ricetta` (`IDRicetta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ha_ibfk_2` FOREIGN KEY (`INGREDIENTI_nome`) REFERENCES `ingredienti` (`nome`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `misurato_in_`
--
ALTER TABLE `misurato_in_`
  ADD CONSTRAINT `misurato_in__ibfk_1` FOREIGN KEY (`INGREDIENTI_nome`) REFERENCES `ingredienti` (`nome`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `misurato_in__ibfk_2` FOREIGN KEY (`UNITA_DI_MISURA_MISURA`) REFERENCES `unita_di_misura` (`MISURA`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `preparazioni`
--
ALTER TABLE `preparazioni`
  ADD CONSTRAINT `preparazioni_ibfk_1` FOREIGN KEY (`RICETTA_IDRicetta`) REFERENCES `ricetta` (`IDRicetta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `ricetta`
--
ALTER TABLE `ricetta`
  ADD CONSTRAINT `ricetta_ibfk_1` FOREIGN KEY (`UTENTE_ID`) REFERENCES `utente` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

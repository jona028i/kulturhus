-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 20. 04 2018 kl. 13:27:54
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kultur`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `arrangement`
--

CREATE TABLE IF NOT EXISTS `arrangement` (
  `ID` int(11) NOT NULL,
  `navn` varchar(150) NOT NULL,
  `beskrivelse` varchar(300) NOT NULL,
  `fk_cat` int(11) NOT NULL,
  `længde` int(11) NOT NULL,
  `date` date NOT NULL,
  `price` int(11) NOT NULL,
  `ppr` int(11) NOT NULL,
  `rækker` int(11) NOT NULL,
  `seatsstatus` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `arrangement`
--

INSERT INTO `arrangement` (`ID`, `navn`, `beskrivelse`, `fk_cat`, `længde`, `date`, `price`, `ppr`, `rækker`, `seatsstatus`) VALUES
(1, 'Den svenske pige og hendes smertes skaber', 'Oplæsning af Astrid Lindgreen', 4, 120, '2018-04-20', 60, 12, 5, '000000000000000000000000000000000000000000000000000000000000'),
(2, 'De fem og parteringen', 'Film med de fem, da de skal lærer at partere et lig og skjule resterne uden at lemmerne bliver fundet', 1, 120, '2018-04-22', 120, 5, 8, ''),
(3, 'Raketmanden taler ud', 'Raket manden Peter Madsen taler ud om sin besættelse af livløse kvinder, og fortæller hvad han havde i tankerne da han sejlede med Kim', 3, 240, '2018-04-24', 600, 9, 9, '000000000000000000000000000000010000000000000000000000000000000000000000000000000'),
(4, 'Rasmus Seebach - Mit nye jeg', 'Rasmus Seebach lukker dørerne op til sin første koncert siden hans kønskifte operation!', 2, 180, '2018-04-25', 20, 10, 10, ''),
(5, 'Kim Wall og hendes skavanker', 'Udstilling med Kim Wall som hoved attraktionen ', 5, 210, '2018-04-26', 140, 10, 10, '0000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `bestillinger`
--

CREATE TABLE IF NOT EXISTS `bestillinger` (
  `id` int(11) NOT NULL,
  `navn` varchar(120) NOT NULL,
  `email` varchar(200) NOT NULL,
  `tlf` int(11) NOT NULL,
  `sal` int(11) NOT NULL,
  `plads` varchar(120) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `bestillinger`
--

INSERT INTO `bestillinger` (`id`, `navn`, `email`, `tlf`, `sal`, `plads`) VALUES
(2, 'Jonas Schulze', 'jonas@gud.altid', 66691113, 5, 'R4_P5,6'),
(3, 'lars von trier', 'lars@von.trier', 12348765, 3, 'R4_P5'),
(4, 'jonas andersen', 'gud@sol.dk', 23675491, 1, 'R1_P6,7');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `kategori`
--

CREATE TABLE IF NOT EXISTS `kategori` (
  `ID` int(11) NOT NULL,
  `type` varchar(120) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `kategori`
--

INSERT INTO `kategori` (`ID`, `type`) VALUES
(1, 'film'),
(2, 'fordrag'),
(3, 'koncert'),
(4, 'oplæsning'),
(5, 'udstilling');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `kontakt`
--

CREATE TABLE IF NOT EXISTS `kontakt` (
  `id` int(11) NOT NULL,
  `navn` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `nummer` int(11) NOT NULL,
  `emne` varchar(120) NOT NULL,
  `besked` varchar(500) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `kontakt`
--

INSERT INTO `kontakt` (`id`, `navn`, `email`, `nummer`, `emne`, `besked`) VALUES
(1, 'ojojoj', 'ojojojo', 89898989, 'klklklkl', 'jkjhjafjkad');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `arrangement`
--
ALTER TABLE `arrangement`
  ADD PRIMARY KEY (`ID`), ADD KEY `fk_cat` (`fk_cat`);

--
-- Indeks for tabel `bestillinger`
--
ALTER TABLE `bestillinger`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`ID`);

--
-- Indeks for tabel `kontakt`
--
ALTER TABLE `kontakt`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `arrangement`
--
ALTER TABLE `arrangement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- Tilføj AUTO_INCREMENT i tabel `bestillinger`
--
ALTER TABLE `bestillinger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Tilføj AUTO_INCREMENT i tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Tilføj AUTO_INCREMENT i tabel `kontakt`
--
ALTER TABLE `kontakt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `arrangement`
--
ALTER TABLE `arrangement`
ADD CONSTRAINT `arrangement_ibfk_1` FOREIGN KEY (`fk_cat`) REFERENCES `kategori` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

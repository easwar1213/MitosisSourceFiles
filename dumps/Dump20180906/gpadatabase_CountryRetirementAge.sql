-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: dev-dbinstance.ci933tgd61ld.us-west-2.rds.amazonaws.com    Database: gpadatabase
-- ------------------------------------------------------
-- Server version	5.6.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CountryRetirementAge`
--

DROP TABLE IF EXISTS `CountryRetirementAge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CountryRetirementAge` (
  `ID` int(20) NOT NULL AUTO_INCREMENT,
  `CountryID` bigint(20) NOT NULL,
  `CountryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `YearOfBirth` int(10) NOT NULL,
  `RetirementAge` int(10) NOT NULL,
  `RetirementMonth` int(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `countryretirementagefkconstraint` (`CountryID`),
  CONSTRAINT `countryretirementagefkconstraint` FOREIGN KEY (`CountryID`) REFERENCES `Countries` (`CountryID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CountryRetirementAge`
--

LOCK TABLES `CountryRetirementAge` WRITE;
/*!40000 ALTER TABLE `CountryRetirementAge` DISABLE KEYS */;
INSERT INTO `CountryRetirementAge` VALUES (4,82,'DE',1947,65,0),(5,82,'DE',1948,65,1),(6,82,'DE',1949,65,2),(7,82,'DE',1950,65,3),(8,82,'DE',1951,65,4),(9,82,'DE',1952,65,5),(10,82,'DE',1953,65,6),(11,82,'DE',1954,65,7),(12,82,'DE',1955,65,8),(13,82,'DE',1956,65,9),(14,82,'DE',1957,65,10),(15,82,'DE',1958,65,11),(16,82,'DE',1959,66,0),(17,82,'DE',1960,66,2),(18,82,'DE',1961,66,4),(19,82,'DE',1962,66,6),(20,82,'DE',1963,66,8),(21,82,'DE',1964,66,10),(22,82,'DE',1965,67,0);
/*!40000 ALTER TABLE `CountryRetirementAge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:25:40

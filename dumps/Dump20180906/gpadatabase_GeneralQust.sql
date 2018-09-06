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
-- Table structure for table `GeneralQust`
--

DROP TABLE IF EXISTS `GeneralQust`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GeneralQust` (
  `UserID` int(11) NOT NULL,
  `Firstname` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Middlename` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Lastname` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Suffix` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `DateOfBirth` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `User_Status` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Country_ofCitizen` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Current_Address` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `Home_Number` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Mobile_Number` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `Marital_Status` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `P_Date_OfMarried` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `P_Gender` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `P_Title` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `P_Firstname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `P_Middlename` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `P_Lastname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `P_Suffix` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `P_DateOfBirth` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `P_Country_OfCitizen` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `P_Current_Address` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GeneralQust`
--

LOCK TABLES `GeneralQust` WRITE;
/*!40000 ALTER TABLE `GeneralQust` DISABLE KEYS */;
/*!40000 ALTER TABLE `GeneralQust` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:26:33

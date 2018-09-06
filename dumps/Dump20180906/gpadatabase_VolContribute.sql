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
-- Table structure for table `VolContribute`
--

DROP TABLE IF EXISTS `VolContribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VolContribute` (
  `VolContributeID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) NOT NULL,
  `CountryCode` varchar(5) NOT NULL,
  `VolAnsInJsonObj` longtext,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`VolContributeID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VolContribute`
--

LOCK TABLES `VolContribute` WRITE;
/*!40000 ALTER TABLE `VolContribute` DISABLE KEYS */;
INSERT INTO `VolContribute` VALUES (39,'shafista.m@mitosistech.com','UK','{\"StartDateState\":\"1997-02-24T18:30:00.000Z\",\"AccountholderState\":\"SBI\",\"SocietyaccountnumberState\":\"123456987\",\"BranchcodeState\":\"124788\",\"BankaddressState\":\"UK\",\"ReferenceState\":\"123369698\",\"DateState\":\"2018-08-27T12:40:46.878Z\",\"PayDebitState\":\"Yes\",\"ChildbenefitState\":\"Yes\"}','Y'),(40,'sheikhshafista97@gmail.com','UK','{\"StartDateState\":\"1987-04-14T07:00:00.000Z\",\"AccountholderState\":\"SBI\",\"SocietyaccountnumberState\":\"012365478\",\"BranchcodeState\":\"023145\",\"BankaddressState\":\"UK\",\"ReferenceState\":\"012365478\",\"DateState\":\"2018-08-28T11:27:31.059Z\",\"PayDebitState\":\"Yes\",\"ChildbenefitState\":\"No\"}','Y'),(42,'ranjitha.r@mitosistech.com','UK','{\"StartDateState\":\"2018-08-21T18:30:00.000Z\",\"AccountholderState\":\"hdfc\",\"SocietyaccountnumberState\":\"343434\",\"BranchcodeState\":\"3443\",\"BankaddressState\":\"xzcx\",\"ReferenceState\":\"34343\",\"DateState\":\"2018-08-29T06:39:24.880Z\",\"PayDebitState\":\"Yes\",\"ChildbenefitState\":\"Yes\"}','Y'),(53,'balakumaran.n@mitosistech.com','UK','{\"StartDateState\":\"2018-09-01T02:47:04.234Z\",\"AccountholderState\":\"sadass\",\"SocietyaccountnumberState\":\"45646654\",\"BranchcodeState\":\"546454\",\"BankaddressState\":\"Avenida Rivadavia 5465, Buenos Aires, Argentina\",\"ReferenceState\":\"545654\",\"DateState\":\"2018-09-01T02:47:01.600Z\",\"PayDebitState\":\"Yes\",\"ChildbenefitState\":\"Yes\"}','Y');
/*!40000 ALTER TABLE `VolContribute` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:28:58

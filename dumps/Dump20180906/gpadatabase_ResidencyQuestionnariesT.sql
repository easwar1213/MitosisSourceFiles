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
-- Table structure for table `ResidencyQuestionnariesT`
--

DROP TABLE IF EXISTS `ResidencyQuestionnariesT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResidencyQuestionnariesT` (
  `ResQusID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResQusStatus` char(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`ResQusID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3886 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResidencyQuestionnariesT`
--

LOCK TABLES `ResidencyQuestionnariesT` WRITE;
/*!40000 ALTER TABLE `ResidencyQuestionnariesT` DISABLE KEYS */;
INSERT INTO `ResidencyQuestionnariesT` VALUES (64,'no-reply@globalpensionassociates.com','P'),(1450,'sathiyan.s@mitosistech.com','P'),(1640,'easwaran.k@mitosistech.com','P'),(3575,'manivannan.v@mitosistech.com','P'),(3600,'hariharan.r@mitosistech.com','P'),(3689,'santhoshraj.v@mitosistech.com','P'),(3797,'devtest.v@mitosistech.com','P'),(3843,'ranjitha.r@mitosistech.com','P'),(3847,'madhanaraj.i@mitosistech.com','P'),(3852,'alagumuthu.v@mitosistech.com','P'),(3854,'bhowell@globalpensionassociates.com','P'),(3855,'','P'),(3861,'balakumaran.n@mitosistech.com','P'),(3878,'mariraj.a@mitosistech.com','P'),(3881,'balamurugan.r@mitosistech.com','P'),(3883,'mark@markweitner.com','P'),(3884,'karthi.t@mitosistech.com','P'),(3885,'shafista.m@mitosistech.com','P');
/*!40000 ALTER TABLE `ResidencyQuestionnariesT` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:28:08

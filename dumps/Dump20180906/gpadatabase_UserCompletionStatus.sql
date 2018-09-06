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
-- Table structure for table `UserCompletionStatus`
--

DROP TABLE IF EXISTS `UserCompletionStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserCompletionStatus` (
  `UserID` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `Applied_Date` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `FormApplied` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UploadStatus` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCompletionStatus`
--

LOCK TABLES `UserCompletionStatus` WRITE;
/*!40000 ALTER TABLE `UserCompletionStatus` DISABLE KEYS */;
INSERT INTO `UserCompletionStatus` VALUES ('alagumuthu.v@mitosistech.com','2018-05-02T14:23:48.362Z','Residency Form',NULL),('baladgct@gmail.com','2018-05-17T08:19:50.340Z','Residency Form',NULL),('balamurugan.r@mitosistech.com','2018-05-11T07:04:07.553Z','Residency Form',NULL),('bhowell@globalpensionassociates.com','2018-05-14T18:30:22.135Z','Residency Form',NULL),('chandrasekar.v@mitosistech.com','2018-04-30T10:54:06.482Z','Residency Form',NULL),('easwaran.k@mitosistech.com','10/12/2017','ResidencyQuestionaries','P'),('hariharan.r@mitosistech.com','2018-05-05T05:26:05.261Z','Residency Form',NULL),('kannadhasan.r@mitosistech.com','2018-05-09T15:16:08.375Z','Residency Form',NULL),('mariraj.a@mitosistech.com','2018-05-11T13:54:51.195Z','Residency Form',NULL),('marirajgvs@gmail.com','2018-05-09T12:55:09.825Z','Residency Form',NULL),('mark@markweitner.com','2018-05-02T15:37:57.806Z','Residency Form',NULL),('no-reply@globalpensionassociates.com','2018-05-04T10:53:45.656Z','Residency Form',NULL),('pitchaimuthu.k@mitosistech.com','2018-04-27T11:58:44.821Z','Residency Form','P'),('ramya.s@mitosistech.com','2018-05-22T06:20:23.770Z','Residency Form',NULL),('senthilkumar.s@mitosistech.com','2018-04-30T07:20:33.584Z','Residency Form',NULL),('spurthi.n@mitosistech.com','2018-06-04T14:05:25.065Z','Residency Form',NULL),('undefined','undefined','undefined',NULL);
/*!40000 ALTER TABLE `UserCompletionStatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:26:53

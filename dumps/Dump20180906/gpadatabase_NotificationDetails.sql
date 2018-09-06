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
-- Table structure for table `NotificationDetails`
--

DROP TABLE IF EXISTS `NotificationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NotificationDetails` (
  `Notificationid` int(10) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(120) NOT NULL,
  `Countryid` varchar(45) NOT NULL,
  `Documentid` varchar(45) NOT NULL,
  `SendDate` varchar(50) NOT NULL,
  `FirstNoticeDay` int(11) NOT NULL,
  `FirstNoticeDate` varchar(45) NOT NULL,
  `SecondNoticeDay` int(11) NOT NULL,
  `SecondNoticeDate` varchar(45) NOT NULL,
  `ThirdNoticeDay` int(11) NOT NULL,
  `ThirdNoticeDate` datetime NOT NULL,
  `Status` char(2) NOT NULL,
  `IsActive` char(2) NOT NULL,
  PRIMARY KEY (`Notificationid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NotificationDetails`
--

LOCK TABLES `NotificationDetails` WRITE;
/*!40000 ALTER TABLE `NotificationDetails` DISABLE KEYS */;
INSERT INTO `NotificationDetails` VALUES (3,'balamurugan.r@mitosistech.com','undefined','38','2018-07-10 03:37:43',2,'',0,'',0,'0000-00-00 00:00:00','','Y'),(4,'balamurugan.r@mitosistech.com','UK','39','0000-00-00 00:00:00',30,'',0,'',0,'0000-00-00 00:00:00','',''),(5,'spurthi.n@mitosistech.com','DK','undefined','11/07/2018',30,'',0,'',0,'0000-00-00 00:00:00','',''),(6,'balamurugan.r@mitosistech.com','UK','39','22-05-2018',30,'',0,'',0,'0000-00-00 00:00:00','',''),(7,'spurthi.n@mitosistech.com','CA','undefined','11/07/2018',30,'',0,'',0,'0000-00-00 00:00:00','',''),(8,'spurthi.n@mitosistech.com','ES','undefined','11/07/2018',7,'',0,'',0,'0000-00-00 00:00:00','',''),(9,'spurthi.n@mitosistech.com','ES','undefined','11/07/2018',7,'',0,'',0,'0000-00-00 00:00:00','','');
/*!40000 ALTER TABLE `NotificationDetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:24:25

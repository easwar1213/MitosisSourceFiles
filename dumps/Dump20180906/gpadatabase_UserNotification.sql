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
-- Table structure for table `UserNotification`
--

DROP TABLE IF EXISTS `UserNotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserNotification` (
  `Notification_ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `EventFormType` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `Send_Date` date DEFAULT NULL,
  `Notification_Send_Date` date DEFAULT NULL,
  `Is_Response` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Is_Viewed` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `IsReceived_DocumentOrNot` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Received_Date` date DEFAULT NULL,
  PRIMARY KEY (`Notification_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserNotification`
--

LOCK TABLES `UserNotification` WRITE;
/*!40000 ALTER TABLE `UserNotification` DISABLE KEYS */;
INSERT INTO `UserNotification` VALUES (2,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(3,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail',NULL,NULL,NULL,NULL,NULL,NULL),(4,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail',NULL,NULL,NULL,NULL,NULL,NULL),(5,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail',NULL,NULL,NULL,NULL,NULL,NULL),(6,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail',NULL,NULL,NULL,NULL,NULL,NULL),(7,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(8,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(9,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(10,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(11,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(12,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(13,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(14,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(15,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(16,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(17,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(18,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(19,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(20,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(21,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(22,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(23,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(24,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(25,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','0000-00-00','No','No','No','0000-00-00'),(26,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-30','0000-00-00','No','No','No','0000-00-00'),(27,'alagumuthu.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-30','0000-00-00','No','No','No','0000-00-00'),(28,'santhosh.v@mitosistech.com','Pension Application','Pension Application has been sent in your mail','2018-05-29','2018-05-29','No','No','No','2018-05-29');
/*!40000 ALTER TABLE `UserNotification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:29:18

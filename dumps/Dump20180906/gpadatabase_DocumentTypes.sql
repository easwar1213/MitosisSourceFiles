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
-- Table structure for table `DocumentTypes`
--

DROP TABLE IF EXISTS `DocumentTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocumentTypes` (
  `DocumentTypeID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DocumentType` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Description` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`DocumentTypeID`),
  UNIQUE KEY `DocumentType` (`DocumentType`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentTypes`
--

LOCK TABLES `DocumentTypes` WRITE;
/*!40000 ALTER TABLE `DocumentTypes` DISABLE KEYS */;
INSERT INTO `DocumentTypes` VALUES (11,'Common','For all Country','Y'),(12,'Other','Other','Y'),(14,'POA','GrossPay Account','N'),(15,'Mail Sending','','Y'),(16,'BilateralForm','US bilateral form','Y'),(17,'Letter','MailSending Letter','Y'),(19,'24','undefined','t'),(20,'asdadasd','undefined','Y'),(21,'Letter1','MailSending Letter','Y'),(22,'undefined','undefined','Y'),(23,'test','Test','Y'),(24,'TestSrv','test Srvdd','N'),(27,'ram','ram','Y'),(28,'dev test','test by dev','Y'),(29,'Voluntary Contribution','Applicant Voluntary Contribution','Y'),(30,' UK Pension Application ','pension form','Y'),(31,'Penison Application South Korea','pension form ','Y'),(32,'South Korea Bank Form','Bank Form','Y'),(33,'Lump Sum Form','South Korea Lump Sum Form','Y'),(34,'Pension Application Norway','Norway Application','Y'),(35,'Private Pension ','Private Pension Application','Y'),(36,'Pension Application Austria','Austria company pension application ','Y'),(37,'Pension Application Belgium','Belgium Pension Application ','Y'),(38,'Pension Application Germany ','Germany Application Pension Form','Y'),(39,'Pension Application Brazil','Pension Application Brazil','Y'),(40,'Pension Application Ireland','Pension Application Ireland','Y'),(41,'Netherland Pension Form','Netherland Pension Form','Y'),(42,'Portugal Pension Form','Portugal Pension Form','Y'),(43,'Pension Application','Pension Application ','Y'),(44,'Power of Attorney','Power of Attorney','Y');
/*!40000 ALTER TABLE `DocumentTypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:24:32

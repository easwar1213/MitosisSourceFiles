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
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Documents` (
  `DocumentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DocumentName` varchar(200) CHARACTER SET utf8 NOT NULL,
  `DocumentCode` varchar(45) DEFAULT NULL,
  `DocumentTypeID` bigint(20) NOT NULL,
  `Description` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `DocTranType` char(1) NOT NULL DEFAULT 'B',
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`DocumentID`),
  UNIQUE KEY `DocumentName_UNIQUE` (`DocumentName`),
  UNIQUE KEY `DocumentCode_UNIQUE` (`DocumentCode`),
  KEY `FK_Documents_DocumentTypeID` (`DocumentTypeID`),
  CONSTRAINT `Documents_ibfk_1` FOREIGN KEY (`DocumentTypeID`) REFERENCES `DocumentTypes` (`DocumentTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--

LOCK TABLES `Documents` WRITE;
/*!40000 ALTER TABLE `Documents` DISABLE KEYS */;
INSERT INTO `Documents` VALUES (38,'Birth Certificate','BC',11,'Birth Certificate','R','N'),(39,'Power Of Attorney','ATR',11,'Power Of Attorney','B','Y'),(40,'Experience Certificate',NULL,12,'Experience Certificate','R','Y'),(41,'NotEligibleNooptions','NEN',15,'','S','Y'),(42,'UKBilateralForm',NULL,16,'','S','Y'),(43,'New Document ',NULL,12,'','R','Y'),(44,'new letter',NULL,15,'bell','S','N'),(45,'Test',NULL,12,'test','B','N'),(46,'Test1',NULL,12,'Testy','B','Y'),(47,'test2',NULL,11,'fdgsg','R','Y'),(54,'Decision Letter',NULL,15,'Decision Letter ','S','Y'),(56,'Pension Application Form ',NULL,15,'Pension Application Form','B','Y'),(58,'Bilateral Form','undefined',15,'Mail has to be sent','B','Y'),(62,'Forecast Letter','FCl',15,'Generate Letter','S','Y'),(65,'ForecastLetter Form','FLF',15,'Mail Has been Sent','u','Y'),(66,'Forecast','FLl',12,'','S','Y'),(67,'Document','NEw',12,'','S','Y'),(68,'Attorney for Eligiblity','POA',15,'','B','Y'),(70,'Birthss C','BCa',11,'Birth Certificate','R','Y'),(72,'ATT','ATT',16,'sdsdf','B','N'),(73,'Dev Test','DOC',11,'dev test by were','R','N'),(74,'Voluntary Contribution','VOC',29,'','S','Y'),(75,'Pension Application','PAF',43,'pension form','S','Y'),(76,'Bank Form','BNK',32,'Bank Form','S','Y'),(77,'Lump Sum Form','LMP',33,'Lump Sum','S','Y'),(79,'Norway Pension Application','NPA',43,'Norway Pension Application ','S','Y'),(80,'Private Letter','PVT',35,'Private Letter','S','Y'),(81,'Pension Application Austria','AST',43,'Pension Application','S','Y'),(82,'Pension Application Belgium','BLG',43,'Pension Application Belgium','S','Y'),(83,'Pension Application Germany','PAG',43,'Pension Application Germany','S','Y'),(84,'Pension Application Brazil','PBZ',43,'Pension Application Brazil','S','Y'),(85,'Ireland Pension Form','IPF',43,'Pension Application Ireland','S','Y'),(86,'Netherland Pension Form','NPF',41,'Netherland Pension Form','S','Y'),(87,'Portugal Pension Form','PPF',42,'Portugal Pension Form','S','Y'),(88,'Korean Pension Form','KPF',43,'Korean Pension Form','S','Y');
/*!40000 ALTER TABLE `Documents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:23:31

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
-- Table structure for table `CountryBasedDocuments`
--

DROP TABLE IF EXISTS `CountryBasedDocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CountryBasedDocuments` (
  `CBDocumentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DocumentID` bigint(20) NOT NULL,
  `CountryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `DocumentCode` varchar(45) NOT NULL,
  `IsRequired` char(1) NOT NULL DEFAULT 'Y',
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`CBDocumentID`),
  KEY `FK_CountryBasedDocuments_DocumentID` (`DocumentID`),
  CONSTRAINT `CountryBasedDocuments_ibfk_1` FOREIGN KEY (`DocumentID`) REFERENCES `Documents` (`DocumentID`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CountryBasedDocuments`
--

LOCK TABLES `CountryBasedDocuments` WRITE;
/*!40000 ALTER TABLE `CountryBasedDocuments` DISABLE KEYS */;
INSERT INTO `CountryBasedDocuments` VALUES (42,38,'JP','BC','Y','Y'),(43,39,'JP','ATR','Y','Y'),(44,38,'CA','BC','Y','Y'),(45,41,'CA','NEN','N','Y'),(46,39,'CA','ATR','Y','Y'),(47,39,'DK','ATR','Y','Y'),(48,39,'UK','ATR','Y','Y'),(49,39,'FR','ATR','Y','Y'),(50,39,'QC','ATR','Y','Y'),(51,39,'US','ATR','Y','Y'),(52,39,'IT','ATR','Y','Y'),(53,62,'CA','FCI','Y','Y'),(54,66,'DK','FLI','Y','Y'),(55,65,'JP','FLF','Y','Y'),(56,65,'JP','FLF','Y','Y'),(57,65,'US','FLF','Y','N'),(58,46,'DK','POA','Y','N'),(59,74,'UK','VOC','Y','Y'),(60,62,'DK','FCl','Y','Y'),(61,62,'FR','FCl','Y','Y'),(62,62,'IT','FCl','Y','Y'),(63,62,'JP','FCl','Y','Y'),(64,62,'QC','FCl','Y','Y'),(65,62,'UK','FCl','Y','Y'),(66,62,'US','FCl','Y','Y'),(67,75,'UK','PAF','Y','Y'),(68,56,'KP','PAF','Y','Y'),(69,75,'KP','PAF','Y','Y'),(70,75,'KR','PAF','Y','Y'),(71,39,'KR','ATR','Y','Y'),(72,62,'KR','FCl','Y','Y'),(73,76,'KR','BNK','Y','Y'),(74,77,'KR','LMP','Y','Y'),(75,79,'NO','NPA','Y','Y'),(76,62,'BE','FCl','Y','N'),(77,62,'BE','FCl','Y','Y'),(78,62,'BR','FCl','Y','Y'),(79,62,'NL','FCl','Y','Y'),(80,80,'UK','PVT','Y','Y'),(81,80,'KR','PVT','Y','Y'),(82,80,'NO','PVT','Y','Y'),(83,62,'IE','FCl','Y','Y'),(84,81,'AT','AST','Y','Y'),(85,62,'PT','FCl','Y','Y'),(86,82,'BE','BLG','Y','Y'),(87,62,'AT','FCl','Y','Y'),(88,39,'KR','ATR','Y','Y'),(89,39,'NO','ATR','Y','Y'),(90,62,'NO','FCl','Y','Y'),(91,83,'DE','PAG','Y','Y'),(92,84,'BR','PBZ','Y','Y'),(93,85,'IE','IPF','Y','Y'),(94,86,'NL','NPF','Y','Y'),(95,87,'PT','PPF','Y','Y'),(96,62,'DE','FCl','Y','Y'),(97,39,'BR','ATR','Y','Y'),(98,39,'AT','ATR','Y','Y'),(99,39,'BE','ATR','Y','Y'),(100,39,'DE','ATR','Y','Y'),(101,39,'IE','ATR','Y','Y'),(102,39,'NL','ATR','Y','Y'),(103,39,'PT','ATR','Y','Y'),(104,75,'KR','KPF','Y','Y'),(105,88,'KR','KPF','Y','Y');
/*!40000 ALTER TABLE `CountryBasedDocuments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:25:54

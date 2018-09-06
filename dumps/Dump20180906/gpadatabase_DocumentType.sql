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
-- Table structure for table `DocumentType`
--

DROP TABLE IF EXISTS `DocumentType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocumentType` (
  `DocumentTypeID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DocumentType` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Description` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`DocumentTypeID`),
  UNIQUE KEY `DocumentType` (`DocumentType`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentType`
--

LOCK TABLES `DocumentType` WRITE;
/*!40000 ALTER TABLE `DocumentType` DISABLE KEYS */;
INSERT INTO `DocumentType` VALUES (19,'fgh','','N'),(20,'hjkhjk','ujhjk','N'),(22,'dsfg','dfgdf','N'),(23,'dfgdfg','dfgdfg','N'),(24,'eryrty','rthytrfuhyt','N'),(25,'dfgfdh','sdfhfh','Y'),(26,'dfghdfh','dfhfh','Y'),(30,'fgyhfghfg','fghfgjhfgjtyi','Y'),(32,'dgdfgfdgh','dfhgfgh','N'),(33,'fghfhgh','fhfghfgh','Y'),(34,'fghfghfg','fhdfhfjh','Y'),(35,'dfgdfghfgh','wqewrwert','Y');
/*!40000 ALTER TABLE `DocumentType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:24:58

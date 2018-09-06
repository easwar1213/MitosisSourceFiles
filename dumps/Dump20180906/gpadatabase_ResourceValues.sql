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
-- Table structure for table `ResourceValues`
--

DROP TABLE IF EXISTS `ResourceValues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResourceValues` (
  `resourcevalue_id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_id` int(11) NOT NULL,
  `language_code` varchar(2) NOT NULL,
  `region_code` varchar(2) NOT NULL DEFAULT '',
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`resourcevalue_id`),
  KEY `resource_id_idx` (`resource_id`),
  CONSTRAINT `resource_id` FOREIGN KEY (`resource_id`) REFERENCES `Resources` (`resource_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResourceValues`
--

LOCK TABLES `ResourceValues` WRITE;
/*!40000 ALTER TABLE `ResourceValues` DISABLE KEYS */;
INSERT INTO `ResourceValues` VALUES (2,1,'es','','Cuestionario General'),(3,1,'de','','Allgemeiner Fragebogen'),(4,11,'de','','Vorteile Fragebogen: Deutschland'),(5,11,'es','','Cuestionario sobre beneficios: Alemania'),(6,6,'de','','Vorteile Fragebogen: Italien'),(7,6,'es','','Cuestionario sobre beneficios: Italia'),(8,12,'de','','Januar'),(9,12,'de','AT','Jänner'),(21,13,'de','','Februar'),(22,14,'de','','März'),(23,15,'de','','April'),(24,16,'de','','Juni'),(25,17,'de','','Juli'),(26,18,'de','','August'),(27,19,'de','','September'),(28,20,'de','','Oktober'),(29,21,'de','','November'),(30,22,'de','','Dezember'),(31,23,'de','','Mai');
/*!40000 ALTER TABLE `ResourceValues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:26:27

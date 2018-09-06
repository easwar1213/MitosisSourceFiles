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
-- Table structure for table `Industries`
--

DROP TABLE IF EXISTS `Industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Industries` (
  `IndustryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `IndustryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `IndustryName` varchar(300) CHARACTER SET utf8 NOT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`IndustryID`),
  UNIQUE KEY `IndustryCode` (`IndustryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Industries`
--

LOCK TABLES `Industries` WRITE;
/*!40000 ALTER TABLE `Industries` DISABLE KEYS */;
INSERT INTO `Industries` VALUES (1,'AFI','Accounting/Finance','Y'),(2,'ASE','Admin/Secretarial','Y'),(3,'ADE','Architect/Design','Y'),(4,'AMW','Art/Media/Writers','Y'),(5,'BPH','Biotech/Pharmaceutical','Y'),(6,'CSW','Computer/Software','Y'),(7,'CST','Construction/Skilled Trade','Y'),(8,'CSE','Customer Service','Y'),(9,'DHC','Domestic Help/Care','Y'),(10,'EDU','Education','Y'),(11,'ENG','Engineering','Y'),(12,'FMA','Facilities/Maintenance','Y'),(13,'GLW','General Labor/Warehouse','Y'),(14,'GMI','Gov/Military','Y'),(15,'HRR','HR & Recruiting','Y'),(16,'HCA','Healthcare','Y'),(17,'HRE','Hospitality/Restaurant','Y'),(18,'INT','Internet','Y'),(19,'LES','Law Enforcement & Security','Y'),(20,'LEG','Legal','Y'),(21,'MEX','Management & Exec','Y'),(22,'MOP','Manufacturing/Operations','Y'),(23,'MPR','Marketing/PR','Y'),(24,'OEP','Oil/Energy/Power','Y'),(25,'QAS','Quality Assurance','Y'),(26,'RES','Real Estate','Y'),(27,'RDE','Research & Dev','Y'),(28,'RET','Retail','Y'),(29,'SBD','Sales & Biz Dev','Y'),(30,'SSE','Social Services','Y'),(31,'TRA','Travel','Y'),(32,'TTR','Trucking/Transport','Y'),(33,'VAC','Vet & Animal Care','Y'),(34,'OTH','Other','Y'),(35,'Test','Test','N');
/*!40000 ALTER TABLE `Industries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:23:06

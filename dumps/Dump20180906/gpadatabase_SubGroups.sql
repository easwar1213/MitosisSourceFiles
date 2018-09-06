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
-- Table structure for table `SubGroups`
--

DROP TABLE IF EXISTS `SubGroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubGroups` (
  `subgroup_id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`subgroup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubGroups`
--

LOCK TABLES `SubGroups` WRITE;
/*!40000 ALTER TABLE `SubGroups` DISABLE KEYS */;
INSERT INTO `SubGroups` VALUES (2,9,'Please indicate hereafter all periods of employment, periods of self-employment, voluntary contributions, soubstitute periods (e.g. military service, ar captivity, expulsion).  Please restrict to the periods which are not contained in your insurance recor'),(3,9,'If yes, please give further information indicate also periods in special systems (e.g., civil servant/equated persons, EU-staff, self-employed, farmers). '),(4,9,'The following children have been raised:'),(5,9,'Type of Account'),(13,9,'UK Part 1: Dates Lived at residence'),(14,9,'UK Part 2: Your Marital Status:'),(16,9,'UK Part 1: Please tell us about any time you spent in the United Kingdom. Include any holidays.'),(17,9,'UK Part 1: Military branch'),(18,9,'UK Part 1: Military service details'),(19,9,'UK Part 1: Employer questions'),(20,9,'UK Part 6: Increased benefits'),(21,9,'UK Part 6: Foreign benefits '),(22,9,'UK Part 7 - sub2: Residence outside UK'),(23,9,'UK Part 9 - UK bank: Bank details'),(25,9,'Initial Country of Residency (begins at age 18)'),(26,9,'Use the address you stayed at for the longest period of time in the above country.  At a minimum, please provide City and Country of Residence. '),(27,9,'List your employers below (click \"+\" to add additional employers)');
/*!40000 ALTER TABLE `SubGroups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:25:12

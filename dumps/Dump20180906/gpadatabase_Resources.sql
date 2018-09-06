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
-- Table structure for table `Resources`
--

DROP TABLE IF EXISTS `Resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Resources` (
  `resource_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL DEFAULT '255',
  PRIMARY KEY (`resource_id`),
  UNIQUE KEY `resource_id_UNIQUE` (`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resources`
--

LOCK TABLES `Resources` WRITE;
/*!40000 ALTER TABLE `Resources` DISABLE KEYS */;
INSERT INTO `Resources` VALUES (1,'How to apply'),(6,'Benefits Questionnaire: Italy'),(9,'Missing Translations'),(11,'Benefits Questionnaire: Germany'),(12,'January'),(13,'February'),(14,'March'),(15,'April'),(16,'June'),(17,'July'),(18,'August'),(19,'September'),(20,'October'),(21,'November'),(22,'December'),(23,'May'),(24,'Benefits Questionnaire: Norway'),(25,'Benefits Questionnaire: UK'),(26,'Benefits Questionnaire: France'),(27,'First Name'),(28,'Field is required'),(29,'Residency Questionnaire'),(30,'phone'),(31,''),(32,'Previous residence where you lived/worked'),(33,'Permanent Address'),(34,'Begin month'),(35,'End month'),(36,'Last name'),(37,'Date of Birth'),(38,'National Identifier Number (If Known)'),(39,'Country'),(40,'Employer'),(41,'Retirement or old-age'),(42,'Disability'),(43,'Survivors'),(45,'If you are applying for disability benefits, '),(46,'Do you also wish to apply for benefits from t'),(47,'Middle initial'),(48,'Maiden name for married women'),(49,'Relationship to worker'),(50,'Date of birth (month, day, year)'),(51,'Place of birth (city, state, province, countr'),(52,'Citizenship'),(53,'Country of residence'),(54,'Marital status'),(55,'Date of marriage (month, day, year), if claim'),(56,'If this claim should be denied because of ins'),(57,'Full name (including maiden name of wife)'),(59,'Indicate if \"student\" or \"disabled\" *'),(60,'Full name (each family member not presently l'),(61,'Address (each family member not presently liv'),(62,'Do you, or does anyone listed in item 5, now '),(63,'If Yes, give Full name '),(64,'Type of Income'),(65,'Monthly Amount'),(66,'Do you, as the beneficiary of another pension'),(67,'If Yes, give Full name of family member'),(68,'Name of insurance institute'),(69,'Amount of monthly benefits'),(70,'If Yes, are you working as '),(71,'If No, give the date you stopped working (mon'),(72,'If you are married, if your spouse, as the be'),(73,'If Yes, give Full name of child'),(74,'Amount of monthly benefits'),(75,'Single'),(76,'Married'),(77,'Date of marriage'),(78,'Middle Name '),(80,'Personal Reference Number (If known)'),(81,'Begin Year'),(82,'End Year'),(83,'Company'),(84,'Month'),(85,'Year'),(86,'Previous Address '),(87,'Personal Reference Number Type'),(88,'Country of Residency'),(89,'Address (History)'),(90,'Company (Residency)'),(91,'Mailing Address'),(92,'Country of Citizenship'),(93,'First Name (Partner)'),(94,'Middle Name (Partner)'),(95,'Last Name (Partner)'),(96,'Country of Citizenship (Partner)'),(97,'Email Address (Partner)'),(98,'Date of Birth (Partner)'),(99,'Title (Mr., Ms.)'),(100,'Current Mailing Address '),(101,'Place of death'),(105,'Male'),(106,'Female'),(107,'Maiden name for married women'),(108,'Residency dates in the country'),(109,'List your employer(s), while in the county of'),(111,'Address'),(112,'Use the <b> permanent </b> address you stayed'),(113,'Password'),(114,'Confirm Password'),(115,'Email'),(116,'Confirm Email'),(117,'You can create a secure personal email accoun'),(118,'Initial Country of Residency (begins at age 1'),(119,'Residency Datas in the Country');
/*!40000 ALTER TABLE `Resources` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:25:05

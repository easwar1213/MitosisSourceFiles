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
-- Table structure for table `Groups`
--

DROP TABLE IF EXISTS `Groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Groups`
--

LOCK TABLES `Groups` WRITE;
/*!40000 ALTER TABLE `Groups` DISABLE KEYS */;
INSERT INTO `Groups` VALUES (1,9,'Your Information: '),(2,9,'About Your Spouse/Partner'),(3,9,'Previous Countries: Italy'),(4,9,'Personal Data: Italy'),(5,9,'Information About the Worker: Italy '),(6,9,'Information About the Applicant: Italy'),(7,9,'Request for Authorization To Continue Italian Insurance Through Voluntary Contributions: Italy '),(8,9,'Information About Family Members For Whom Family Benefits Or Survivor Benefit Are Claimed: Italy '),(9,9,'Information About Family Income: Italy'),(10,9,'Information About Family Benefits - Part 1: Italy'),(11,9,'Information About The Claimant\'s Work Activity: Italy'),(12,9,'Information About Family Benefits - Part 2: Italy'),(13,9,'Information About The Deceased Worker (to be completed if applying for survivors benefits): Italy'),(14,9,'Information About Surviving Family Members (to be completed if applying for survivors benefits): Italy'),(15,9,'Periods of Employment Or Self-Employment Of The Worker, Covered By Insurance System In Italy'),(16,9,'Periods of Military Service: Italy'),(17,9,'Information About US Social Security - Part 1: Italy'),(18,9,'Information About US Social Security - Part 2: Italy'),(19,9,'Declaration For Persons Claiming Italian Old-Age Benefits: Italy'),(20,9,'Remarks: Italy'),(21,9,'A. Information About the Worker: Germany'),(22,9,'B. Application Filed by Another Person: Germany '),(23,9,'C. Type of Benefit Claimed and Pension Start: Germany'),(24,9,'D. Additional Information About the Worker: Germany '),(25,9,'E. Information Concerning the German Insurance Record: Germany'),(26,9,'F. Further Information Concerning the Insurance Record: Germany '),(27,9,'G. Period of Child Rearing If Not Already Applied for Earlier (In Cases of Child Rearing in Germany Further Information is Necessary): Germany '),(28,9,'H. Further Information Concerning Other Benefits: Germany '),(29,9,'I. Declaration: Germany'),(30,9,'J. Confirmation by the U.S. Social Security Administration: Germany'),(31,9,'K. Declaration of Payment: Germany'),(32,9,'L. Information Concerning Reduced Earning Capacity: Germany'),(33,9,'Kevin\'s test group'),(34,9,'Personal Data: Norway'),(35,9,'UK: Part 1 - About You'),(36,9,'UK: Part 2 - About your partner'),(37,9,'UK: Part 4 - When to claim State Pension'),(38,9,'UK: Part 6 - About other benefits'),(39,9,'UK: Part 7 - Living or working outside the United Kingdom'),(40,9,'France:  Part 1 - Yourself'),(41,9,'France: Part 2 -  Your Marital Status'),(42,9,'France: Part 3 - Your Spouse (If you are married)'),(43,9,'France: Part 4 - Your Children and Those You Have High'),(44,9,'France: Part 5 - You Have or Have Had Your Responsibility One or More Children With Disabilities'),(45,9,'France: Part 6 - Your Request'),(46,9,'France: Part 7 - Do You Also Request To One Of The Titles Of The Following Statements'),(47,9,'France: Part 8 - Do You See Already A Basic Pension Benefit Paid By Another Plan'),(48,9,'France: Part 9 - Have You Been Employed That Led To The Opening Of An Account To Prevent The Hardship? '),(49,9,'France: Part 10 - Your Professional Activity in France'),(50,9,'France: Part 11 - Your Professional Activity In A Country Other Than France'),(51,9,'France: Part 12 - Have You Applied Or Do You Currently View One Of The Following Benefits? '),(52,9,'France: Part 13 - Your Health Expenses Are They Supported By A Social Security Body Of A Country Other Than France?'),(54,25,'UK: Part 3 Evidence of dates of birth, marriage, formation of civil partnership, divorce, dissolution of civil partnership, annulment or death'),(55,25,'UK: Part 5 - Only complete Part 5 if you are a married woman or a widow.'),(56,25,'UK: Part 8 Time in Hospital'),(57,25,'UK: Part 9 How we pay you'),(58,25,'UK: Part 10 Other information'),(60,9,'Residency History Questionnaire');
/*!40000 ALTER TABLE `Groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:26:39

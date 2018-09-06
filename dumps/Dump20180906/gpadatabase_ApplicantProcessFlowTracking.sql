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
-- Table structure for table `ApplicantProcessFlowTracking`
--

DROP TABLE IF EXISTS `ApplicantProcessFlowTracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ApplicantProcessFlowTracking` (
  `APFlowID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Welcome` char(1) NOT NULL DEFAULT 'P',
  `TC` char(1) NOT NULL DEFAULT 'P',
  `HowToStart` char(1) NOT NULL DEFAULT 'P',
  `GenQus` char(1) NOT NULL DEFAULT 'P',
  `ResQus` char(1) NOT NULL DEFAULT 'P',
  `BenQusPart1` char(1) NOT NULL DEFAULT 'P',
  `BenQusPart2` char(1) NOT NULL DEFAULT 'P',
  `POA` char(1) NOT NULL DEFAULT 'P',
  `VolContributeForm` char(1) DEFAULT 'P',
  `OtherDoc` char(1) NOT NULL DEFAULT 'P',
  `PreForecast` char(1) NOT NULL DEFAULT 'Y',
  `PostForecast` char(1) NOT NULL DEFAULT 'Y',
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`APFlowID`),
  UNIQUE KEY `UserID` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ApplicantProcessFlowTracking`
--

LOCK TABLES `ApplicantProcessFlowTracking` WRITE;
/*!40000 ALTER TABLE `ApplicantProcessFlowTracking` DISABLE KEYS */;
INSERT INTO `ApplicantProcessFlowTracking` VALUES (24,'easwar.ess@gmail.com','C','C','P','P','P','P','P','P','P','P','Y','Y','Y'),(29,'easwaran.k@mitosistech.com','C','C','C','C','P','C','P','P','P','P','Y','Y','Y'),(46,'baladgct@gmail.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(57,'sathiyan.s@mitosistech.com','C','C','C','C','P','P','P','P','P','P','Y','Y','Y'),(67,'hariharan.r@mitosistech.com','C','C','C','C','P','P','P','P','P','P','Y','Y','Y'),(82,'santhoshraj.v@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(92,'shafista.m@mitosistech.com','C','C','C','C','C','C','P','P','C','P','Y','Y','Y'),(96,'sheikhshafista97@gmail.com','C','C','C','C','P','P','P','P','P','P','Y','Y','Y'),(98,'balakumaran.n@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(99,'marirajgvs@gmail.com','C','C','C','C','C','P','P','P','P','P','Y','Y','Y'),(100,'davidmiller@betaimages.com','P','P','P','P','P','P','P','P','P','P','Y','Y','Y'),(105,'ranjitha.r@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(107,'madhanaraj.i@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(112,'alagumuthu.v@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(114,'bhowell@globalpensionassociates.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(117,'mariraj.a@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(119,'spurthi.n@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(122,'balamurugan.r@mitosistech.com','C','C','C','C','C','C','P','P','P','P','Y','Y','Y'),(123,'mark@markweitner.com','C','C','C','C','C','P','P','P','P','P','Y','Y','Y'),(124,'karthi.t@mitosistech.com','C','C','C','C','C','P','P','P','P','P','Y','Y','Y');
/*!40000 ALTER TABLE `ApplicantProcessFlowTracking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:25:26

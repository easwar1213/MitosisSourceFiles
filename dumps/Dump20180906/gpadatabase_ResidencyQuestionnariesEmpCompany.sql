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
-- Table structure for table `ResidencyQuestionnariesEmpCompany`
--

DROP TABLE IF EXISTS `ResidencyQuestionnariesEmpCompany`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResidencyQuestionnariesEmpCompany` (
  `EmpCompanyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CompanyCode` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Entitle_GPA_Contact` varchar(10) CHARACTER SET utf8 NOT NULL,
  `Employee_Closed_Plan` varchar(10) CHARACTER SET utf8 NOT NULL,
  `Best_Of_Knowledge` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Closed_Plan` varchar(200) CHARACTER SET utf8 NOT NULL,
  `ResQusCountryID` bigint(20) NOT NULL,
  `ResQusID` bigint(20) NOT NULL,
  `WorkedFromDate` date DEFAULT NULL,
  `WorkedToDate` date DEFAULT NULL,
  PRIMARY KEY (`EmpCompanyID`),
  KEY `FK_ResidencyQuestionnariesEmpCompany_ResQusCountryID` (`ResQusCountryID`),
  KEY `FK_ResidencyQuestionnariesEmpCompany_ResQusID` (`ResQusID`),
  CONSTRAINT `ResidencyQuestionnariesEmpCompany_ibfk_1` FOREIGN KEY (`ResQusCountryID`) REFERENCES `ResidencyQuestionnariesCountry` (`ResQusCountryID`),
  CONSTRAINT `ResidencyQuestionnariesEmpCompany_ibfk_2` FOREIGN KEY (`ResQusID`) REFERENCES `ResidencyQuestionnaries` (`ResQusID`)
) ENGINE=InnoDB AUTO_INCREMENT=267 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResidencyQuestionnariesEmpCompany`
--

LOCK TABLES `ResidencyQuestionnariesEmpCompany` WRITE;
/*!40000 ALTER TABLE `ResidencyQuestionnariesEmpCompany` DISABLE KEYS */;
INSERT INTO `ResidencyQuestionnariesEmpCompany` VALUES (22,'CMP001','Yes','Yes','Company no longer in existence and not acquired by another entity','No',62,27,NULL,NULL),(23,'CMP003','Yes','Yes','Company acquired from another entity, or merged','No',63,28,NULL,NULL),(24,'CMP005','Yes','Yes','Company acquired from another entity, or merged','',64,28,NULL,NULL),(29,'WIPRO','2','1','3','4',69,31,NULL,NULL),(36,'CMP003','No','Yes','No','No',74,28,NULL,NULL),(37,'CMP006','No','Yes','No','No',75,28,NULL,NULL),(38,'CMP005','No','Yes','No','No',76,28,NULL,NULL),(94,'CMP001','No','Yes','No','No',100,28,NULL,NULL),(100,'CMP008','No','Yes','No','No',100,28,NULL,NULL),(106,'CMP002','No','No','No','No',109,28,NULL,NULL),(118,'CMP001','No','Yes','No','No',109,28,NULL,NULL),(141,'CMP001','No','Yes','No','No',132,33,NULL,NULL),(142,'CMP0010','No','Yes','No','No',133,33,NULL,NULL),(143,'CMP001','No','No','No','No',134,28,NULL,NULL),(201,'','No','No','No','No',134,28,NULL,NULL),(202,'CMP008','Yes','Yes','Company no longer in existence and not acquired by another entity','No',134,28,NULL,NULL),(208,'','No','No','No','No',199,28,'0000-00-00','0000-00-00'),(210,'CMP006','No','No','No','No',201,52,'2001-05-31','2003-05-31'),(211,'CMP004','No','No','No','No',199,28,'1932-06-22','1933-05-31'),(212,'CMP001','No','No','No','No',199,28,'1932-06-22','1935-06-12'),(213,'CMP006','No','No','No','No',202,53,'2001-05-31','2004-05-31'),(237,'CMP001','No','No','No','No',226,26,'1930-06-03','1936-06-03'),(260,'CMP008','Yes','Yes','Company no longer in existence and not acquired by another entity','No',248,96,'1962-06-07','1984-06-07'),(264,'CMP008','Yes','Yes','Company no longer in existence and not acquired by another entity','No',252,100,'1946-06-19','1950-06-19'),(265,'CMP006','Yes','Yes','Company no longer in existence and not acquired by another entity','No',253,100,'1934-06-19','1961-06-19'),(266,'CMP008','Yes','Yes','Company no longer in existence and not acquired by another entity','No',199,28,'1963-06-28','1971-06-28');
/*!40000 ALTER TABLE `ResidencyQuestionnariesEmpCompany` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:28:50

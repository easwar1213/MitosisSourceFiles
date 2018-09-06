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
-- Table structure for table `ResidencyQuestionnariesEmpCompanyT`
--

DROP TABLE IF EXISTS `ResidencyQuestionnariesEmpCompanyT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResidencyQuestionnariesEmpCompanyT` (
  `EmpCompanyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CompanyCode` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResWorkBDate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResWorkEDate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `CompanyAddress` longtext NOT NULL,
  `EntitleGPAContact` varchar(10) CHARACTER SET utf8 NOT NULL,
  `EmployeeClosedPlan` varchar(10) CHARACTER SET utf8 NOT NULL,
  `BestOfKnowledge` varchar(200) CHARACTER SET utf8 NOT NULL,
  `ClosedPlan` varchar(200) CHARACTER SET utf8 NOT NULL,
  `ResQusCountryID` bigint(20) NOT NULL,
  `ResQusID` bigint(20) NOT NULL,
  PRIMARY KEY (`EmpCompanyID`),
  KEY `FK_ResidencyQuestionnariesEmpCompanyT_ResQusCountryID` (`ResQusCountryID`),
  KEY `FK_ResidencyQuestionnariesEmpCompanyT_ResQusID` (`ResQusID`),
  CONSTRAINT `ResidencyQuestionnariesEmpCompanyT_ibfk_1` FOREIGN KEY (`ResQusCountryID`) REFERENCES `ResidencyQuestionnariesCountryT` (`ResQusCountryID`),
  CONSTRAINT `ResidencyQuestionnariesEmpCompanyT_ibfk_2` FOREIGN KEY (`ResQusID`) REFERENCES `ResidencyQuestionnariesT` (`ResQusID`)
) ENGINE=InnoDB AUTO_INCREMENT=572 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResidencyQuestionnariesEmpCompanyT`
--

LOCK TABLES `ResidencyQuestionnariesEmpCompanyT` WRITE;
/*!40000 ALTER TABLE `ResidencyQuestionnariesEmpCompanyT` DISABLE KEYS */;
INSERT INTO `ResidencyQuestionnariesEmpCompanyT` VALUES (51,'CMP005','2004-07-19T06:39:12.108Z','2010-07-19T06:39:19.148Z','Company Bagh, Amritsar, Punjab, India','No','Yes','Company no longer in existence and not acquired by another entity','no plan',295,64),(53,'CMP006','2016-07-20T05:48:41.541Z','2017-07-20T05:48:46.918Z','Texas, USA','No','No','','',300,1450),(71,'CMP008','2013-07-20T09:58:53.701Z','2015-07-20T09:59:40.387Z','Canada','No','No','','',321,1640),(113,'','','','Test Company Address','GPA Contac','Employee_C','BestOf_Knowledge','Closed_Plan',412,3575),(142,'COM012','25-10-2000','19-09-2012','Austrilia ','Entitle','New Plan','Knowlege','Plan',458,3797),(242,'testt','','','Tempe, AZ, USA','No','No','','',564,3843),(244,'test 23132','','','UK','No','No','','',566,3843),(254,'UK International','','','Bahrain','Yes','No','','',576,3847),(255,'ABC','','','Australia','Yes','No','','',577,3847),(265,'INDIAN COMMUNITY SCHOOL OF MILWAUKEE INC','','','Indian Community School, West Saint Martins Road, ','Yes','Yes','Company no longer in existence and not acquired by','test plan',587,3852),(267,'STATOIL ASA','','','London, UK','No','No','','',589,3854),(272,'A & D ','','','France, Castelnau-de-Lévis, France','Yes','No','','',595,3852),(274,'A & T ','','','United Kingdom House, London, UK','No','No','','',597,3852),(275,'stests ','','','France Avenue South, Edina, MN, USA','No','No','','',598,3852),(277,'INDIAN COMMUNITY SCHOOL OF MILWAUKEE INC','','','France Avenue South, Edina, MN, USA','No','No','','',600,3852),(285,'INDIAN BANK','','','Indian Bank Colony, Ambattur, Chennai, Tamil Nadu,','No','No','','',608,3855),(294,'GOOGLE INC.','','','USA','Yes','No','','',617,3843),(295,'3M COMPANY','','','UK','Yes','No','Company closed their plans','',618,3843),(296,'AMAZON.COM INC.','','','UK','Yes','No','','',619,3843),(334,'INDIAN COMMUNITY SCHOOL OF MILWAUKEE INC','','','Addison, TX, USA','Yes','No','','',656,3855),(335,'INDIAN BANK','','','Japan','Yes','No','','',657,3855),(336,'COAL INDIA LIMITED','','','Japan','Yes','No','','',658,3855),(433,'AIR INDIA LTD.','','','Air India Building, Mumbai, Maharashtra','No','No','','',758,3852),(434,'DABUR INDIA LTD.','','','Austria','No','No','','',759,3852),(444,'DABUR INDIA LTD.','','','United Kingdom - Dubai - United Arab Emirates','No','No','','',769,3852),(445,'cheee','','','Korea','Yes','Yes','Company acquired from another entity, or merged','tests',770,3843),(446,'test complenay','','','Korea','No','No','','',771,3843),(447,'com1','','','Korea','No','No','','',772,3843),(450,'DRC SYSTEMS INDIA PVT LTD','','','France, Castelnau-de-Lévis, France','No','No','','',775,3852),(451,'24/7 CABLE COMPANY LLC','','','Apple Arden Fair, Arden Way, Sacramento, CA, USA','No','No','','',776,3852),(452,'DRC SYSTEMS INDIA PVT LTD','','','India Street, San Diego, CA, USA','No','No','','',777,3852),(453,'E.I.D. PARRY INDIA LIMITED','','','Albanna Pediatrics: Albanna Issam MD, Cove Bend Dr','No','No','','',778,3852),(470,'A & D RUBBER PRODUCTS COMPANY INC','','','SGR Dental College, SGR Dental College Road, Kasav','No','No','','',794,3878),(495,'fsjdjfgdgdkfjgmkldfmg','','','DSG Distributors, Cain Drive, Plainview, NY, Norwa','No','No','','',820,3878),(513,'TATA MOTORS','','','Austria','No','No','','',838,3881),(514,'TATA COMMUNICATIONS LIMITED','','','Austria Center, Bruno-Kreisky-Platz, Vienna, Austr','No','No','','',839,3878),(515,'A & M SALES INC D/B/A PORTLAND PAINT & HARDWARE','','','Brazil','No','No','','',840,3881),(516,'374 CALLE RAFAEL LAMAR','','','Germany','Yes','No','','',841,3881),(517,'A & M SALES INC D/B/A PORTLAND PAINT & HARDWARE','','','Denmark','No','No','','',842,3881),(519,'A & C PROFIT SHARING PLAN','','','J&K Development Finance Corporation Limited, Gandh','No','No','','',844,3878),(520,'mca140','','','Austria Center, Bruno-Kreisky-Platz, Vienna, Austr','No','No','','',845,3852),(523,'A BEN RIDINGS DD S','','','Netherlands','No','No','','',848,3881),(525,'A & D APPLICATORS INC','','','D F G G Sas, Via Antonio Annarumma, Avellino, Prov','No','No','','',850,3878),(526,'mca140','','','Germany','No','No','','',851,3852),(528,'A & D APPLICATORS INC','','','IEEF - Rua Mesquita - Vila Deodoro, São Paulo - St','No','No','','',853,3878),(530,'A BLUE MONDAY INC','','','Belgium','No','No','','',855,3881),(531,'mca140','','','Germany','No','No','','',856,3878),(535,'IBM CORPORATION','','','London, UK','Yes','No','','',860,3883),(536,'IBM CORPORATION','','','Austria','No','No','','',862,3883),(553,'1 2 1 DIRECT RESPONSE','','','United Kingdom','No','No','','',879,3884),(555,'1 BROOKVILLE CHEVROLET PONTIAC BUICK & CADILLAC','','','aUSTRIA','Yes','No','','',881,3689),(557,'24/7 CABLE COMPANY LLC','','','Como, Province of Como, Italy','No','No','','',883,3689),(558,'01 COMMUNIQUE LABORATORY, INC.','','','Ireland','No','No','','',884,3689),(560,'AMAZON FINANCIAL CORPORATION','','','Chennai, Tamil Nadu, India','No','No','','',886,3885),(561,'21st CENTURY FOX INC.','','','hmjhkhjkmjnjm','No','No','','',887,3885),(562,'GOOGLE INC.','','','dfgtfhjtygjnghn','No','No','','',888,3885),(563,'DFG INVESTMENT ADVISERS INC','','','Chennai, Tamil Nadu, India','No','No','','',889,3885),(564,'ASD CONSULTANTS INC','','','Chennai, Tamil Nadu, India','No','No','','',890,3885),(565,'110 OLYMPUS CORP','','','Chennai, Tamil Nadu, India','No','No','','',891,3885),(567,'21ST CENTURY CHIROPRACTIC PC','','','Chennai, Tamil Nadu, India','No','No','','',893,3885),(568,'flipkart','','','gfdhgjh','No','No','','',894,3885),(569,'BLINK TWICE INC','','','Chennai, Tamil Nadu, India','No','No','','',895,3885),(570,'TATA CONSULTANCY SERVICES LIMITED','','','Chennai, Tamil Nadu, India','No','No','','',896,3861),(571,'IBM CORPORATION','','','','Yes','No','','',897,3883);
/*!40000 ALTER TABLE `ResidencyQuestionnariesEmpCompanyT` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:27:55

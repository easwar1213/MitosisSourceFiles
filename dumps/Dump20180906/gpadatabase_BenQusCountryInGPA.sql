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
-- Table structure for table `BenQusCountryInGPA`
--

DROP TABLE IF EXISTS `BenQusCountryInGPA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BenQusCountryInGPA` (
  `BenQusCIGPAID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 NOT NULL,
  `HomeAddress` varchar(500) CHARACTER SET utf8 NOT NULL,
  `PlaceOfBirth` varchar(500) CHARACTER SET utf8 NOT NULL,
  `Partner` varchar(10) NOT NULL,
  `CountryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `Benefits` varchar(100) CHARACTER SET utf8 NOT NULL,
  `BenefitsName` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `GetBenefits` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Receiving` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `ReferenceNum` varchar(100) CHARACTER SET utf8 NOT NULL,
  `SSSecurity` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `SSSecurityAddress` varchar(500) CHARACTER SET utf8 NOT NULL,
  `DateOfBenefits` varchar(100) CHARACTER SET utf8 NOT NULL,
  `CompanyCode` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Occupation` varchar(100) CHARACTER SET utf8 NOT NULL,
  `IndustryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `CompanyAddress` varchar(500) DEFAULT NULL,
  `EligibleCountry` varchar(5) DEFAULT NULL,
  `BenQusStatus` char(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`BenQusCIGPAID`),
  UNIQUE KEY `UserID` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BenQusCountryInGPA`
--

LOCK TABLES `BenQusCountryInGPA` WRITE;
/*!40000 ALTER TABLE `BenQusCountryInGPA` DISABLE KEYS */;
INSERT INTO `BenQusCountryInGPA` VALUES (9,'alagumuthu.v@mitosistech.com','Palakkad, Kerala, India','Alappuzha, Kerala, India','Yes','AU,IN','Retirement / Old-age','','You','Currently receiving','79879765787','Kerala','OMR Padur Chennai','2018-05-21T18:30:00.000Z','CMP002','Chennai','CSW','Coimbatore International Airport, Avinashi Road, Coimbatore, Tamil Nadu 641014, India','UK','P'),(10,'senthilkumar.s@mitosistech.com','Annandale, VA, USA','Chennai - Theni Hwy, Konduraja Line, Theni Allinagaram, Tamil Nadu, India','Yes','IN','Retirement / Old-age','','You,Your Partner','Waiting to hear about this benefit','784678234672384','Tamilnadu','Anna University Guindy Chennai','2018-05-14T09:23:48.816Z','CMP001','MANAGER','CSW','2nd floor, #75,Madambakkam Main Road, Rajakilpakkam,, Gokul Nagar, Madambakkam, Chennai, Tamil Nadu 600075, India','CA','P'),(27,'no-reply@globalpensionassociates.com','999 Canada Pl, Vancouver, BC V6C 3T4, Canada','Canada','No','','','','You','','','','','','M,P,0,0,3','Engineer','ENG','Canada Way, Burnaby, BC, Canada','CA','P'),(82,'easwar.ess@gmail.com','Japan','Japan','No','','','','You','','','','','','CMP006','','CSW','','US','P'),(83,'easwaran.k@mitosistech.com','Québec City, QC, Canada','Tokyo, Japan','Yes','JP','GEN BEN','','You,Your Partner','Waiting to hear about this benefit','','','','','CMP006','','CSW','','JP','P'),(111,'baladgct@gmail.com','10750 McDermott Fwy, San Antonio, TX 78288, USA','Salem, Tamil Nadu, India','No','','','','You','','','','','','undefined','Devlopment','','UK','UK','P'),(141,'bhowell@globalpensionassociates.com','250 Boylston Street, Boston, MA, USA','Houston, TX, USA','Yes','BR','','','You','','','','','','STATOIL ASA','','','','US','P'),(145,'madhanaraj.i@mitosistech.com','Tambaram, Chennai, Tamil Nadu, India','Chennai, Tamil Nadu, India','No','','','','You','','','','','','ABC','Developer','AFI','United Kingdom','KR','P'),(194,'mariraj.a@mitosistech.com','Norway','Chennai, Tamil Nadu, India','No','','','','You','','','','','','5 PACES SERVICES COMPANY','Cooking','OTH','DFG Noodles, North Interstate 35 Frontage Road, Austin, TX,Norway','NO','P'),(210,'ranjitha.r@mitosistech.com','Ukyō-ku, Kyoto, Kyoto Prefecture, Japan','Korea','No','','','','You','','','','','','3M COMPANY','','AFI','Korea','KR','P'),(216,'balamurugan.r@mitosistech.com','Chennai, Tamil Nadu, India','Salem, Tamil Nadu, India','No','','','','You','','','','','','TATA MOTORS','Dev','CSW','Germany','IN','P'),(217,'santhoshraj.v@mitosistech.com','Savoyen, Rennweg, Vienna, Austria','Austrai','Yes','AF,AX','Retirement / Old-age','','You','','234234','4324','234','2018-09-05T10:50:24.246Z','1 BROOKVILLE CHEVROLET PONTIAC BUICK & CADILLAC','23432','BPH','234324','AT','P'),(220,'shafista.m@mitosistech.com','Chennai, Tamil Nadu, India','Korea','No','','','','You','','','','','','AMAZON FINANCIAL CORPORATION','dsfdrgrtfv','AMW','Chennai, Tamil Nadu, India','KR','P'),(223,'balakumaran.n@mitosistech.com','Chennai, Tamil Nadu, India','Balakumaran Nagar, Kolathur, Chennai, Tamil Nadu, India','No','','','','You','','','','','','TATA CONSULTANCY SERVICES LIMITED','Engineer','CSW','Chennai, Tamil Nadu, India','KR','P');
/*!40000 ALTER TABLE `BenQusCountryInGPA` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:26:46

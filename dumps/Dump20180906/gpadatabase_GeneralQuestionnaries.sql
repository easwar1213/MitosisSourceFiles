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
-- Table structure for table `GeneralQuestionnaries`
--

DROP TABLE IF EXISTS `GeneralQuestionnaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GeneralQuestionnaries` (
  `GenQusID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 NOT NULL,
  `InquiryAbout` varchar(200) CHARACTER SET utf8 NOT NULL,
  `AreYou` char(1) NOT NULL,
  `Gender` char(1) NOT NULL,
  `Title` varchar(20) CHARACTER SET utf8 NOT NULL,
  `FirstName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `MiddleName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `LastName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Suffix` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `BirthName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `MaidenName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `DOB_Day` varchar(10) CHARACTER SET utf8 NOT NULL,
  `DOB_Month` varchar(100) CHARACTER SET utf8 NOT NULL,
  `DOB_Year` varchar(20) CHARACTER SET utf8 NOT NULL,
  `CountryOfCitizenship` varchar(5) CHARACTER SET utf8 NOT NULL,
  `MailingAddress` varchar(500) CHARACTER SET utf8 NOT NULL,
  `PhoneNum` varchar(20) DEFAULT NULL,
  `HomeNum` varchar(20) DEFAULT NULL,
  `MaritalStatus` char(1) NOT NULL,
  `DOMCDW_Day` varchar(10) CHARACTER SET utf8 NOT NULL,
  `DOMCDW_Month` varchar(100) CHARACTER SET utf8 NOT NULL,
  `DOMCDW_Year` varchar(20) CHARACTER SET utf8 NOT NULL,
  `PGender` char(1) DEFAULT NULL,
  `PTitle` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `PFirstName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `PMiddleName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `PLastName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `PSuffix` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `PDOB_Day` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `PDOB_Month` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `PDOB_Year` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `PCountryOfCitizenship` varchar(5) CHARACTER SET utf8 DEFAULT NULL,
  `PMailingAddress` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `GenQusStatus` char(1) NOT NULL DEFAULT 'P',
  `DOB` varchar(15) NOT NULL,
  `PDOB` varchar(15) CHARACTER SET utf8 NOT NULL,
  `DMCWD` varchar(15) CHARACTER SET utf8 NOT NULL,
  `GoogleAdrsCountry` varchar(15) NOT NULL,
  PRIMARY KEY (`GenQusID`),
  UNIQUE KEY `UserID` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GeneralQuestionnaries`
--

LOCK TABLES `GeneralQuestionnaries` WRITE;
/*!40000 ALTER TABLE `GeneralQuestionnaries` DISABLE KEYS */;
INSERT INTO `GeneralQuestionnaries` VALUES (19,'senthilkumar.s@mitosistech.com','Retirement Benefits,Previous Employer Benefits,Survivor Benefits','R','M','Mr.','SENTHILKUMAR','SUBBAIAH','SENTHILKUMAR','I','Senthil','Senthil','2','September','1951','IN','Annandale, VA, USA','6374623786','3423423423','M','4','January','1949','F','Mr.','Swetha','lakshmi','Lakshmi','Sr.','12','April','1955','IN','Amargosa Valley, NV 89020, USA','C','0000-00-00','','',''),(48,'easwar.ess@gmail.com','Retirement Benefits','C','M','Mr.','Easwar','','Kittusamy','','','','13','January','1991','JP','Japan','8056741331','','S','','','','','','','','','','','','','','','C','0000-00-00','','',''),(50,'easwaran.k@mitosistech.com','e,t,i,r,e,m,e,n,t, ,B,e,n,e,f,i,t,s,,,S,u,r,v,i,v,o,r, ,B,e,n,e,f,i,t,s','C','M','Mr.','Easwaran','','Kittusamy','','Easwaran','','13','January','1946','CA','Tokyo, Japan','8056741331','','S','','','','','','','','','','','','','','','C','0000-00-00','12/01/1956','011/30/201',''),(76,'baladgct@gmail.com','Retirement Benefits','C','M','Mr.','Balamurugan','','Rajendran','','','','11','June','1960','IN','10750 McDermott Fwy, San Antonio, TX 78288, USA','8807718400','','M','','','','','','','','','','','','','','','C','0000-00-00','','',''),(86,'sathiyan.s@mitosistech.com','Retirement Benefits','C','M','Mr.','Sathiyan','','Sivaprakasam','','','','1','January','1980','UK','United Kingdom','9500148962','','S','','','','','','','','','','','','','','','C','0000-00-00','','',''),(87,'azhagumuthu.vs@gmail.com','Previous Employer Benefits,Retirement Benefits','C','M','Mr.','alagumuthu','','vellaichamy','','','','2','January','1990','UK','Gatwick Airport, LGW, North Terminal, Arrivals Rd, Horley, Gatwick RH6 0PJ, UK','8608847796','','S','','','','','','','','','','','','','','','C','0000-00-00','','',''),(137,'shafista.m@mitosistech.com','false,false,false','C','F','Miss.','Berzies','','Sheikh','Jr.','','','4','January','1952','IN','Chennai, Tamil Nadu, India','9874653210','','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','undefined'),(138,'sheikhshafista97@gmail.com','false,false,false','C','F','Miss.','Test_S','','GPA @ Mts','Jr.','','','3','January','1952','KR','Korea','7410258963','','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','undefined'),(148,'ranjitha.r@mitosistech.com','false,false,false','R','M','Miss.',' Ranji','',' Ravi','','','','4','January','1952','UK','Ukyō-ku, Kyoto, Kyoto Prefecture, Japan','9655858544','','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','undefined'),(151,'madhanaraj.i@mitosistech.com','false,false,false','C','M','Mr.','Test','M','Person','Jr.','','','1','January','1930','IN','Tambaram, Chennai, Tamil Nadu, India','0321654987','000007485','M','1','January','1945','F','Mrs.','Test','F','Person','Jr.','1','January','1930','IN','Tambaram, Chennai, Tamil Nadu, India','C','undefined','undefined','undefined',''),(155,'alagumuthu.v@mitosistech.com','false,false,false','C','M','Mr.','alagumuthu','','vellaichamy','','','','1','January','1953','UK','United Kingdom House, London, UK','8608847799','8608847796','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined',''),(158,'bhowell@globalpensionassociates.com','false,false,false','C','M','Mr.','Bill','','Howell','','Jack Bridges','','2','February','1942','US','250 Boylston Street, Boston, MA, USA','4053613628','','M','3','February','1983','F','Mrs.','Andreia','','Howell','','2','January','1974','AQ','250 Boylston Street, Boston, MA, USA','C','undefined','undefined','undefined','undefined'),(170,'balakumaran.n@mitosistech.com','false,false,false','C','M','Mr.','Balakumaran','','Natraj','Jr.','Kumar','','11','November','1953','IN','Chennai, Tamil Nadu, India','9479678545','0448985766','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','undefined'),(171,'mariraj.a@mitosistech.com','false,false,false','C','M','Mr.','Mariraj','Rio','Anandamohan','','mari','','12','November','1951','NO','Norway','9489947958','04636223723','M','12','January','1966','F','Mrs.','rwe5trwert5','dgxgvdxgb','dxfgdfgdfg','IV','12','January','1953','NO','Norway','C','undefined','undefined','undefined','undefined'),(183,'balamurugan.r@mitosistech.com','false,false,false','C','M','Mr.','Balamurugan','','Rajendran','','','','1','January','1950','IN','Chennai, Tamil Nadu, India','8807718400','','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','IN'),(185,'spurthi.n@mitosistech.com','false,false,false','C','F','Miss.','Amira','','KulfiSikandar','','','','15','February','1950','IN','India','6215478955','9742683753','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','IN'),(186,'mark@markweitner.com','false,false,false','C','M','Mr.','Mark','','Weitner','','','','22','March','1950','US','127 East Wilde Yaupon Circle, Spring, TX, USA','2034093688','','M','6','September','1989','F','Ms.','Patricia','','Muncy','','27','March','1952','US','127 East Wilde Yaupon Circle, Spring, TX, USA','C','undefined','undefined','undefined','US'),(187,'santhoshraj.v@mitosistech.com','false,false,false','C','M','Mr.','Santhosh','Raj','Vijayakumar','Jr.','Birth Name ','Maiden Name','1','January','1945','AT','Savoyen, Rennweg, Vienna, Austria','9876543210','(159) 1591-5915','M','1','January','1968','F','Mrs.','Partner ','P middle','Partner Last','Sr.','1','January','1955','BG','Savoyen, Rennweg, Vienna, Austria','C','undefined','undefined','undefined','undefined'),(189,'karthi.t@mitosistech.com','false,false,false','C','M','Mr.','karthi','','Thangraj','','','','1','January','1950','IN','Chennai, Tamil Nadu, India','8745485454','87787545454','S','','','','','','','','','','','','','','','C','undefined','undefined','undefined','IN');
/*!40000 ALTER TABLE `GeneralQuestionnaries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:29:38

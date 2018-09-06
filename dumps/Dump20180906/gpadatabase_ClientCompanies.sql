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
-- Table structure for table `ClientCompanies`
--

DROP TABLE IF EXISTS `ClientCompanies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClientCompanies` (
  `CompanyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CompanyCode` varchar(100) CHARACTER SET utf8 NOT NULL,
  `CompanyName` varchar(300) CHARACTER SET utf8 NOT NULL,
  `Address` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `CountryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `ContactPerson1` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `ContactPerson2` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `ContactPerson3` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `NoOfEmployees` decimal(18,0) DEFAULT NULL,
  `IndustryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `CompanyProductDesc` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `TelePhoneNum` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Website` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `CompanyLogo` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`CompanyID`),
  UNIQUE KEY `CompanyCode` (`CompanyCode`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientCompanies`
--

LOCK TABLES `ClientCompanies` WRITE;
/*!40000 ALTER TABLE `ClientCompanies` DISABLE KEYS */;
INSERT INTO `ClientCompanies` VALUES (1,'CMP002','Company 2','Los Angeles, CA, USA','US','Bill,CEO','Mark','',2469,'CSW','Software','3784001234','4420812345671','www.globalpensionassociates.com','no-reply@globalpensionassociates.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1531906849593.jpg','Y'),(2,'CMP001','Mitosis Pvt','2nd floor, #75,Madambakkam Main Road, Rajakilpakkam,, Gokul Nagar, Madambakkam, Chennai, Tamil Nadu 600075, India','UK','Sathiyan,CEO','Joseph,Sale Marketing','Priya, HR',251,'CSW','Softwares','9940277855','','www.mitosistech.com','hello@mitosistech.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/undefined','N'),(30,'CMP003','Company 3','1211 Avenue of the Americas, New York, NY 10036, USA','US','Rupert Murdoch, Chmn. & CEO','Chase Carey, Pres. & COO','John Nallen, EVP & CFO',25600,'OTHfg','Television broadcasting and film production; operates a portfolio of cable, broadcast, film, pay TV and satellite assets.','2128527145','0002128527145','www.21cf.com','investor@21cf.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1525959934260.jpg','Y'),(32,'CMP005','Company 5','333 Three D Systems Cir, Rock Hill, SC 29730, USA','US','Vyomesh I. Joshi, Pres. & CEO','John McMullen, EVP & CFO','Chuck Hall, CTO',3,'OTH','Design, development, mfr., marketing and servicing of 3D printers and related products, print materials and services.','8033263900','0008033248810','www.3dsystems.com','investor.relations@3dsystems.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1526450735145.jpg','Y'),(33,'CMP006','Company 6','2-1 Kurosakishiroishi, Yahatanishi-ku','UK','Junji Tsuda, Chmn. & Pres.','Noboru Usami, SEVP','Hiroshi Ogasawara, EVP',11356,'OTH','Mfr. motion and control products; including Servo Drives and Motors, AC Drives and Motors, Linear Motion, Robotics, Controllers, and Network Control.','8193645880','0081936318837','www.yaskawa.co.jp','ckan@yaskawa.co.jp','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1531906912632.jpg','Y'),(34,'CMP007','Company 7','2-3-16 Itachibori, Nishi-ku','UK','Meguru Nakata, Pres. & CEO','Takashi Kakegawa, CFO','Masami Yamamoto, COO',2642,'OTH','Mfr. of machine tools, industrial tools and equipment, housing equipment and materials and home goods.','8166304368','0081663043681','www.yamazen.co.jp','info@yamazenc.co.jp','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1531906937032.jpg','Y'),(35,'CMP008','Company 8','ABC GROUP INC.','CA','Mary Anne Bueschkens, CEO','Derrick Phelps, Pres. & CFO','Mark Poynton, EVP & COO',5000,'OTH','Engages in the design, development, and production of plastic automotive systems and components for OEMs.','4162461782','0004162461552','www.abcgroupinc.com','sales.ca@abcgrp.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1525961171876.jpg','Y'),(36,'CMP009','Company 9','7450 - 18th St. NW','CA','Kenneth A. Stankievech, Pres.','Per Tal Pizzey, COO','',3000,'OTH','Provides NDT inspection and non-destructive testing services including ultrasonic NDT, NDT radiography.','7804402131','0007804401167','www.acuren.com','info@acuren.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1526034325212.jpg','Y'),(37,'CMP0010','Company 10','Salvador de Madariaga 1','ES','Luis Maroto, Pres. & CEO','Salvador de Madariaga 1','',11951,'OTH','Engaged in travel, ticketing, e-commerce and business-to-business services.','3419582010','0034915820188','www.amadeus.com','reception.madrid@amadeus.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/clientlogo1527952894825.jpg','Y'),(48,'CMP011','[24]7INC.','','','','','',0,'','','','','','','','Y'),(49,'CMP012','01 COMMUNIQUE LABORATORY, INC.','','','','','',0,'','','','','','','','Y'),(50,'CMP013','1 2 1 DIRECT RESPONSE','','','','','',0,'','','','','','','','Y'),(51,'CMP014','1 A BEST INC','','','','','',0,'','','','','','','','Y'),(52,'CMP015','1 BROOKVILLE CHEVROLET PONTIAC BUICK & CADILLAC','','','','','',0,'','','','','','','','Y'),(53,'CMP016','100 INC','','','','','',0,'','','','','','','','Y'),(54,'CMP017','102 MONTAGUE STREET CONSULTANTS CORP','','','','','',0,'','','','','','','','Y'),(55,'CMP018','1099 LLC','','','','','',0,'','','','','','','','Y'),(56,'CMP019','10X GROUP INC','','','','','',0,'','','','','','','','Y'),(57,'CMP020','11 11 INDUSTRIES INC','','','','','',0,'','','','','','','','Y'),(58,'CMP0011','Mitosis Pvt UK Ltd','United Kingdom House, London, UK','UK','Sathiyan,CEO','Joseph,Sale Marketing','Nalina Priya,HR',251,'CSW','Softwares','9940277855','','www.mitosistech.com','hello@mitosistech.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/undefined','N'),(65,'CMP0012','Mitosis Pvt Austraila','California us, Austraila','Austr','Sathiyan,CEO','Joseph,Sale Marketing','Nalina Priya,HR',251,'CSW','Softwares','9940277855','','www.mitosistechaus.com','hello@mitosistechaus.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/ClientCompanyImage/mitosisus.jpg1533234509470.jpg','N'),(71,'CMP0013','Mitosis Pvt Canada','Canada, Canada','Canad','Sathiyan,CEO','Joseph,Sale Marketing','Nalina Priya,HR',251,'CSW','Softwares','9940277855','','www.mitosistechcan.com','hello@mitosistechcan.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/ClientCompanyImage/mitosiscan.jpg1533234697396.jpg','N'),(72,'DevTestComCode','DevTestComCom','Chennai, Tamil Nadu, India','IN',' test contact1',' test contact2',' test contact3',1542,'EDU','Online Education Tutorial','1234567899','','www.testwebsite.in','testwebsite@gmail.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/ClientCompanyImage/undefined1533285795266.jpg','Y'),(73,'Beta1','Beta Images Creative Design Studio','Jacksonville, FL, USA','US','David Miller','','',1,'AMW','Web design and development','9043058273','','www.betaimages.com','davidmiller@betaimages.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/ClientCompanyImage/Beta-Images-Web-Logo-Top.png','Y'),(74,'Test Code','Test Company','Chennai, Tamil Nadu, India','IN','Test Person 1','Test Person 2','',50,'AFI','Developing Accounting Softwares','1234567890','','https://accountingsoftwaretestcompany.com','shifa@yopmail.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/','Y'),(76,'12345','Test Company @','Chennai, Tamil Nadu, India','IN','Test Person $','Test Person #','',100,'CSW','Software Development','9874563210','','https://testcompany@.com/home','shafista@yopmail.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/','N'),(78,'MIT 001','Mito tech','Bangladesh National Zoo, Dhaka, Bangladesh','BD','nila','','',50,'INT','','0112656665','','www.internet.com','ranjitha@onymy.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/','Y'),(79,'m11212121212','test','DFW International Airport (DFW), Aviation Drive, DFW Airport, TX, USA','AF','qa','','',0,'BPH','','2323232322','','ttt.com','ranji@yopmail.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/','Y'),(80,'Cmp_Test@2018','Test GPA','Chennai, Tamil Nadu, India','IN','Test $','','',150,'MPR','Marketing the company products','0123456789','','https://marketingcompany.com/','veenambigai.s@mitosistech.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/ClientCompanyImage/MyCover.jpg','Y'),(81,'Cmp_code','Cmp_Test','Bengaluru, Karnataka, India','IN','##','','',350,'ENG','Engineering works','0123654789','','htts://cmp.com/','mits@yopmail.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/ClientCompanyImage/letter-1347414_960_720.jpg','Y'),(82,'Cmp_Mits','Testing Company','UK','UK','Test_01','','',50,'AFI','Developing accounting s/w','0123654789','','https://testingcompany.com/','madhanaraj.i@mitosistech.com','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/images/companieslogo/','Y');
/*!40000 ALTER TABLE `ClientCompanies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:27:27

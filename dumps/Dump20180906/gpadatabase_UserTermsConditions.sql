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
-- Table structure for table `UserTermsConditions`
--

DROP TABLE IF EXISTS `UserTermsConditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserTermsConditions` (
  `UTCID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 NOT NULL,
  `FirstName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `MiddleName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `LastName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `DateOfSigned` varchar(50) CHARACTER SET utf8 NOT NULL,
  `SignedBy` varchar(100) CHARACTER SET utf8 NOT NULL,
  `SignedByName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Signature` varchar(500) CHARACTER SET utf8 NOT NULL,
  `TCStatus` char(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`UTCID`),
  UNIQUE KEY `UserID` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTermsConditions`
--

LOCK TABLES `UserTermsConditions` WRITE;
/*!40000 ALTER TABLE `UserTermsConditions` DISABLE KEYS */;
INSERT INTO `UserTermsConditions` VALUES (22,'senthilkumar.s@mitosistech.com','SENTHILKUMAR','SUBBAIAH','SENTHILKUMAR','2018-05-14T09:13:55.248Z','Previous Employee','SENTHILKUMAR SENTHILKUMAR','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/senthilkumar.s%40mitosistech.com/Signature/Signature.png','C'),(65,'easwaran.k@mitosistech.com','Easwaran','','Kittusamy','2018-06-01T14:47:01.550Z','Current Employee','Easwaran Kittusamy','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/Signature/Signature.png','C'),(78,'baladgct@gmail.com','Balamurugan','','Rajendran','2018-06-29T07:29:12.900Z','Current Employee','Balamurugan Rajendran','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/baladgct%40gmail.com/Signature/Signature.png','C'),(89,'sathiyan.s@mitosistech.com','Sathiyan','','Sivaprakasam','2018-07-18T13:55:36.593Z','Current Employee','Sathiyan Sivaprakasam','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/sathiyan.s%40mitosistech.com/Signature/Signature.png','C'),(95,'manivannan.v@mitosistech.com','Manivannan','sggg','Varadhan','2018-07-24T12:18:45.927Z','Current Employee','Manivannan Varadhan','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/manivannan.v%40mitosistech.com/Signature/Signature.png','C'),(101,'hariharan.r@mitosistech.com','HARIHARAN','','RAJA','2018-07-26T05:31:10.370Z','Current Employee','HARIHARAN RAJA','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/hariharan.r%40mitosistech.com/Signature/Signature.png','C'),(117,'shafista.m@mitosistech.com','Berzies','','Sheikh','2018-08-15T04:37:12.211Z','Current Employee','Berzies Sheikh','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/shafista.m%40mitosistech.com/Signature/Signature.png','C'),(118,'sheikhshafista97@gmail.com','Test_S','','GPA @ Mts','2018-08-16T10:44:30.107Z','Current Employee','Test_S GPA @ Mts','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/sheikhshafista97%40gmail.com/Signature/Signature.png','C'),(125,'ranjitha.r@mitosistech.com',' Ranji','',' Ravi','2018-08-20T06:56:58.214Z','Current Employee',' Ranji  Ravi','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/ranjitha.r%40mitosistech.com/Signature/Signature.png','C'),(126,'madhanaraj.i@mitosistech.com','Test','','Person','2018-08-21T07:44:14.675Z','Current Employee','Test Person','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/madhanaraj.i%40mitosistech.com/Signature/Signature.png','C'),(130,'alagumuthu.v@mitosistech.com','alagumuthu','','vellaichamy','2018-08-21T16:33:46.769Z','Current Employee','alagumuthu vellaichamy','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/alagumuthu.v%40mitosistech.com/Signature/Signature.png','C'),(132,'bhowell@globalpensionassociates.com','Bill','','Howell','2018-08-22T16:45:36.729Z','Current Employee','Bill Howell','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/bhowell%40globalpensionassociates.com/Signature/Signature.png','C'),(134,'santhoshraj.v@mitosistech.com','Santhosh','Raj','Vijayakumar','2018-08-24T05:56:47.137Z','Current Employee','Santhosh Vijayakumar','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/santhoshraj.v%40mitosistech.com/Signature/Signature.png','C'),(136,'balakumaran.n@mitosistech.com','Balakumaran','','Natraj','2018-09-01T00:37:00.224Z','Current Employee','Balakumaran Natraj','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/balakumaran.n%40mitosistech.com/Signature/Signature.png','C'),(137,'mariraj.a@mitosistech.com','Mariraj','Rio','Anandamohan','2018-08-31T12:08:16.285Z','Current Employee','Mariraj Anandamohan','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mariraj.a%40mitosistech.com/Signature/Signature.png','C'),(144,'balamurugan.r@mitosistech.com','Balamurugan','','Rajendran','2018-09-04T13:08:40.191Z','Current Employee','Balamurugan Rajendran','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/balamurugan.r%40mitosistech.com/Signature/Signature.png','C'),(145,'spurthi.n@mitosistech.com','Amira','','KulfiSikandar','2018-09-04T14:41:57.626Z','Current Employee','Amira KulfiSikandar','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/spurthi.n%40mitosistech.com/Signature/Signature.png','C'),(146,'mark@markweitner.com','Mark','','Weitner','2018-09-04T17:41:56.996Z','Current Employee','Mark Weitner','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mark%40markweitner.com/Signature/Signature.png','C'),(147,'karthi.t@mitosistech.com','karthi','','Thangraj','2018-09-05T10:33:37.690Z','Current Employee','karthi Thangraj','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/karthi.t%40mitosistech.com/Signature/Signature.png','C'),(148,'easwar.ess@gmail.com','Easwar','','Kittusamy','2018-09-05T11:09:35.523Z','Current Employee','Easwar Kittusamy','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwar.ess%40gmail.com/Signature/Signature.png','C');
/*!40000 ALTER TABLE `UserTermsConditions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:28:15

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
-- Table structure for table `ApplicantUploadDocuments`
--

DROP TABLE IF EXISTS `ApplicantUploadDocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ApplicantUploadDocuments` (
  `AppDocumentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) CHARACTER SET utf8 NOT NULL,
  `DocumentID` bigint(20) NOT NULL,
  `CountryCode` varchar(5) CHARACTER SET utf8 NOT NULL,
  `FileName` varchar(200) CHARACTER SET utf8 NOT NULL,
  `FilePath` varchar(500) CHARACTER SET utf8 NOT NULL,
  `IsReceived` char(1) NOT NULL DEFAULT 'Y',
  `IsApproved` char(1) NOT NULL DEFAULT 'N',
  `ReceivedDate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ApprovedDate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`AppDocumentID`),
  KEY `FK_ApplicantDocuments_DocumentID` (`DocumentID`),
  CONSTRAINT `ApplicantUploadDocuments_ibfk_1` FOREIGN KEY (`DocumentID`) REFERENCES `Documents` (`DocumentID`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ApplicantUploadDocuments`
--

LOCK TABLES `ApplicantUploadDocuments` WRITE;
/*!40000 ALTER TABLE `ApplicantUploadDocuments` DISABLE KEYS */;
INSERT INTO `ApplicantUploadDocuments` VALUES (185,'easwaran.k@mitosistech.com',39,'JP','Desert.jpg','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/documentupload/Desert.jpg','Y','Y','2018-06-11T13:51:50.375Z','','Y'),(187,'easwaran.k@mitosistech.com',38,'JP','Jellyfish.jpg','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/documentupload/Jellyfish.jpg','Y','Y','2018-06-11T13:54:08.245Z','','Y'),(188,'easwaran.k@mitosistech.com',40,'JP','Chrysanthemum.jpg','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/documentupload/Chrysanthemum.jpg','Y','Y','2018-06-11T13:59:01.741Z','','Y'),(190,'easwaran.k@mitosistech.com',40,'JP','Tulips.jpg','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/documentupload/Tulips.jpg','Y','Y','2018-06-11T14:02:38.059Z','','Y'),(197,'easwaran.k@mitosistech.com',38,'JP','Koala.jpg','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/documentupload/Koala.jpg','Y','Y','2018-06-11T14:53:04.016Z','','Y'),(199,'alagumuthu.v@mitosistech.com',40,'JP','1487763102.png','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/alagumuthu.v%40mitosistech.com/documentupload/1487763102.png','Y','Y','2018-06-21T12:57:51.243Z','','Y'),(200,'no-reply@globalpensionassociates.com',39,'JP','poa_en_template.pdf (1).pdf','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/no-reply%40globalpensionassociates.com/documentupload/poa_en_template.pdf%20%281%29.pdf','Y','Y','2018-07-02T12:32:41.412Z','','Y'),(201,'no-reply@globalpensionassociates.com',39,'JP','poa_en_template.pdf (1).pdf','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/no-reply%40globalpensionassociates.com/documentupload/poa_en_template.pdf%20%281%29.pdf','Y','Y','2018-07-02T12:32:43.816Z','','Y'),(202,'no-reply@globalpensionassociates.com',62,'JP','terms_nr.html','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/no-reply%40globalpensionassociates.com/documentupload/terms_nr.html','Y','Y','2018-07-13T06:38:29.467Z','','Y'),(203,'manivannan.v@mitosistech.com',56,'JP','Application Review Comments - 07202018.pptx','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/manivannan.v%40mitosistech.com/documentupload/Application%20Review%20Comments%20-%2007202018.pptx','Y','Y','2018-07-25T06:27:58.777Z','','Y'),(204,'easwaran.k@mitosistech.com',39,'JP','Book1.xlsx','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/undefined/undefined/Book1.xlsx','Y','Y','04-Jun-18','','Y'),(205,'easwaran.k@mitosistech.com',39,'JP','Book1.xlsx','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/undefined/undefined/Book1.xlsx','Y','Y','04-Jun-18','','Y'),(216,'mariraj.a@mitosistech.com',42,'JP','SSA-2490-BK.pdf','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mariraj.a%40mitosistech.com/documentupload/SSA-2490-BK.pdf','Y','N','2018-08-03T08:51:29.803Z','','Y'),(220,'marirajgvs@gmail.com',39,'UK','tc_en.html.pdf','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/marirajgvs%40gmail.com/documentupload/tc_en.html.pdf','Y','N','2018-08-06T07:56:10.475Z','','Y'),(221,'marirajgvs@gmail.com',39,'US','Voluntary Contributions and General Updates.pptx','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/marirajgvs%40gmail.com/documentupload/Voluntary%20Contributions%20and%20General%20Updates.pptx','Y','N','2018-08-06T07:56:48.614Z','','Y');
/*!40000 ALTER TABLE `ApplicantUploadDocuments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:28:28

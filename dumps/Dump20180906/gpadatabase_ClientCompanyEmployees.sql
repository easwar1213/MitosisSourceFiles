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
-- Table structure for table `ClientCompanyEmployees`
--

DROP TABLE IF EXISTS `ClientCompanyEmployees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClientCompanyEmployees` (
  `EmployeeID` bigint(20) NOT NULL AUTO_INCREMENT,
  `EmployeeCode` varchar(100) CHARACTER SET utf8 NOT NULL,
  `CompanyCode` varchar(100) CHARACTER SET utf8 NOT NULL,
  `EmpFirstName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `EmpMiddleName` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `EmpLastName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `EmployeeType` char(1) NOT NULL,
  `Gender` char(1) NOT NULL,
  `DOB_Day` varchar(10) CHARACTER SET utf8 NOT NULL,
  `DOB_Month` varchar(100) CHARACTER SET utf8 NOT NULL,
  `DOB_Year` varchar(20) CHARACTER SET utf8 NOT NULL,
  `SSNum` varchar(100) CHARACTER SET utf8 NOT NULL,
  `PhoneNum` varchar(20) DEFAULT NULL,
  `HomeNum` varchar(20) DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  `EmployeeImg` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `InviteStatus` char(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`EmployeeID`),
  UNIQUE KEY `EmployeeCode` (`EmployeeCode`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientCompanyEmployees`
--

LOCK TABLES `ClientCompanyEmployees` WRITE;
/*!40000 ALTER TABLE `ClientCompanyEmployees` DISABLE KEYS */;
INSERT INTO `ClientCompanyEmployees` VALUES (33,'EMP001','CMP001','Easwaran','','Kittusamy','C','M','13','January','1991','234454564','8056741331','','easwaran.k@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwaran.k%40mitosistech.com/ProfileImage/Jellyfish.jpg','C'),(51,'EMP002','CMP002','Mark','','Weitner','C','M','1','January','1980','123456789','2034093688','','mark@markweitner.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mark%40markweitner.com/ProfileImage/undefined.','C'),(52,'EMP003','CMP002','Bill','','Howell','C','M','1','January','1985','112233445','4053613628','','bhowell@globalpensionassociates.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/bhowell%40globalpensionassociates.com/ProfileImage/undefined.','C'),(55,'EMP015','CMP001','Kanna','','Dhasan','C','M','3','January','1990','125666566','9876543210','','kannadhasan.r@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/kannadhasan.r%40mitosistech.com/ProfileImage/undefined.png','P'),(56,'EMP004','CMP001','Sathiyan','','Sivaprakasam','C','M','1','January','1980','457678782','9500148962','','sathiyan.s@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/sathiyan.s%40mitosistech.com/ProfileImage/undefined.png','C'),(59,'EMP007','CMP001','Balamurugan','','Rajendran','C','M','1','February','1994','098765543','8807718400','','balamurugan.r@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/balamurugan.r%40mitosistech.com/ProfileImage/undefined.','C'),(61,'EMP006','CMP005','Mariraj','Rio','Anandamohan','C','M','22','March','1947','159632487','9489947958','04636223723','mariraj.a@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mariraj.a%40mitosistech.com/ProfileImage/undefined.','C'),(62,'EMP055','CMP001','Easwar','','Kittusamy','C','M','13','January','1991','123456788','8056741331','','easwar.ess@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/easwar.ess%40gmail.com/ProfileImage/easwar.ess%40gmail.comjpg','C'),(65,'TH08909','CMP001','SENTHILKUMAR','SUBBAIAH','SENTHILKUMAR','C','M','2','September','1951','795678435','6374623786','3423423423','senthilkumar.s@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/senthilkumar.s%40mitosistech.com/ProfileImage/undefined.png','P'),(70,'EMP011','CMP002','Nick ','','Stugart','C','M','5','March','1974','123456789','2818577592','','nstugart@globalpensionassociates.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/nstugart%40globalpensionassociates.com/ProfileImage/undefined.','C'),(71,'M1234','CMP001','Manivannan','sggg','Varadhan','C','M','9','June','1990','123456987','9791931793','','manivannan.v@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/manivannan.v%40mitosistech.com/ProfileImage/undefined.','C'),(72,'EMP234','CMP001','Balamurugan','','Rajendran','C','M','11','June','1960','678678678','8807718400','','baladgct@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/baladgct%40gmail.com/ProfileImage/undefined.','C'),(75,'EMP0021','CMP0010','Mariraj','Milky','Ananda Mohan','C','M','30','October','1952','321213564','9489947959','21438928432','marirajgvs@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/marirajgvs%40gmail.com/ProfileImage/undefined.','C'),(83,'EMP1234','CMP002','alagumuthu','','vellaichamy','C','M','3','January','1932','123456789','8608847799','8608847796','alagumuthu.v@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/alagumuthu.v%40mitosistech.com/ProfileImage/partners.png.png','C'),(84,'EMP0030','CMP006','Muthu','Mari','Govind','C','M','27','December','1995','154986326','7305737581','04636223723','muthumarigvs@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/muthumarigvs%40gmail.com/ProfileImage/ApplicantCertificate%20%283%29.png.png','P'),(85,'25478963','CMP001','Amira','','KulfiSikandar','C','F','29','January','1953','543310987','6215478955','9742683753','spurthi.n@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/spurthi.n%40mitosistech.com/ProfileImage/undefined.','C'),(86,'UYTV78HGJ7868','CMP001','HARIHARAN','','RAJA','C','M','1','January','1953','372468372','9944162439','89782437238','hariharan.r@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/hariharan.r%40mitosistech.com/ProfileImage/undefined.','C'),(88,'GB4385','CMP001','HARIHARAN','RAJA','HARIHARAN','C','M','15','September','1953','546324374','6352762847','34782337423','mail4hari15@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mail4hari15%40gmail.com/ProfileImage/undefined.','P'),(92,'EMP0060','CMP001','Pitchaimuthu','K','Kesavan','C','M','10','March','1991','112357657','9876767675','04448584221','pitchaimuthu.k@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/pitchaimuthu.k%40mitosistech.com/ProfileImage/Penguins.jpg.jpg','C'),(93,'EMP040','CMP001','alagumuthu','','vellaichamy','C','M','2','January','1990','789456123','8608847796','','azhagumuthu.vs@gmail.com','N','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/azhagumuthu.vs%40gmail.com/ProfileImage/undefined.','C'),(94,'1234','Beta1','Mark','','Weitner','C','M','22','March','1955','123456789','2038264303','','markweitner@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/markweitner%40gmail.com/ProfileImage/undefined.','C'),(95,'EMP020','CMP001','Santhosh','Raj','Vijayakumar','C','M','5','January','1930','456132122','9876543210','','santhoshraj.v@mitosistech.com','N','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/santhoshraj.v%40mitosistech.com/ProfileImage/undefined.','C'),(97,'EMP021','CMP001','Balakumaran','','Natraj','C','M','1','August','1991','123241241','9479678545','','balakumaran.n@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/balakumaran.n%40mitosistech.com/ProfileImage/undefined.','C'),(98,'EMPTestCode','COM2256','Mitosis','','Dev','C','M','2','February','1991','789789789','8987546512','','mitosisdevtest@gmail.com','N','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mitosisdevtest%40gmail.com/ProfileImage/clientlogo1522405179125.jpg.jpg','P'),(102,'001','Beta1','David','','Miller','C','M','1','January','1984','123456789','9043058273','','davidmiller@betaimages.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/davidmiller%40betaimages.com/ProfileImage/Beta-Images-Web-Logo-Top.png.png','C'),(109,'EMP_Sha','Test Code','Berzies','','Sheikh','C','F','25','February','1930','013254694','9874653210','','shafista.m@mitosistech.com','N','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/shafista.m%40mitosistech.com/ProfileImage/undefined.','P'),(117,'M001','MIT 001','Nila','','Kar','R','F','9','February','2010','965656565','9986598566','','nalini.m@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/nalini.m%40mitosistech.com/ProfileImage/undefined.','P'),(119,'mmm123','m11212121212','testtt','','ttttt','C','M','1','March','1935','222222222','3333333333','','kathireshbalaji.s@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/kathireshbalaji.s%40mitosistech.com/ProfileImage/123.jpg.jpg','P'),(120,'Emp_S@18','Cmp_Test@2018','Mits','','Tech','C','F','25','February','1941','012345678','9632587410','','veenambigai.s@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/veenambigai.s%40mitosistech.com/ProfileImage/Cf--h8sWsAA4Ofg.jpg.jpg','P'),(121,'Emp_M16','Cmp_Test@2018','Mts','','technologies','C','F','6','March','1934','012365478','0147852369','','ebinraj.p@mitosistech.com','N','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/ebinraj.p%40mitosistech.com/ProfileImage/MyCover.jpg.jpg','P'),(124,'EMP00100','CMP001','Shafista','Sheiak','Mohammed','C','F','16','April','1990','123456788','3625147895','','sha@yopmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/sha%40yopmail.com/ProfileImage/undefined.','P'),(127,'Emp @ S','Cmp_Test@2018','Test_S','','GPA @ Mts','C','F','6','March','1940','012365478','7410258963','','sheikhshafista97@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/sheikhshafista97%40gmail.com/ProfileImage/letter-1347414_960_720.jpg.jpg','C'),(130,'MM1221','MIT 001',' Ranji','',' Ravi','C','F','5','February','1955','343433434','9655858544','','ranjitha.r@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/ranjitha.r%40mitosistech.com/ProfileImage/undefined.','C'),(131,'Emp_Mits','Cmp_Mits','Test','','Person','R','M','6','February','1947','012365478','0321654987','','madhanaraj.i@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/madhanaraj.i%40mitosistech.com/ProfileImage/Penguins.jpg.jpg','C'),(141,'emp78945','CMP008','Spurthi','','Spurthi','C','M','2','February','1931','789456123','7894561230','','spurthi69@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/spurthi69%40gmail.com/ProfileImage/avaj-partner-new.jpg.jpg','P'),(142,'Emp_TM','Test Code','Mts','','Test','C','F','22','December','1930','123654789','1236547891','','mitosistestmailshafa@gmail.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mitosistestmailshafa%40gmail.com/ProfileImage/s_-_logo_mark.png.png','C'),(143,'015','CMP002','Kevin','','Olinger','C','M','1','January','1985','123456789','1234567980','','kevin@lethe.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/kevin%40lethe.com/ProfileImage/Brisbane%20West%20End%20Concert%20-%20May%2C%202013.gif.gif','P'),(144,'1369','Test Code','Mark','','Weitner','C','M','22','March','1955','123456789','1234567890','','mark@globalpensionassociates.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/mark%40globalpensionassociates.com/ProfileImage/Why%20I%20am%20Pissed%20About%20Having%20to%20Come%20Into%20an%20Office.gif.gif','P'),(145,'EMP200','CMP001','karthi','','Thangraj','C','M','8','February','1940','877457875','8745485454','87787545454','karthi.t@mitosistech.com','Y','https://gpa-dev-mitosis.s3.us-west-2.amazonaws.com/applicant/karthi.t%40mitosistech.com/ProfileImage/Koala.jpg.jpg','C');
/*!40000 ALTER TABLE `ClientCompanyEmployees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:29:44

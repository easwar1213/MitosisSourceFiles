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
-- Table structure for table `ResidencyQuestionnariesCountryT`
--

DROP TABLE IF EXISTS `ResidencyQuestionnariesCountryT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResidencyQuestionnariesCountryT` (
  `ResQusCountryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ResCountry` varchar(5) CHARACTER SET utf8 NOT NULL,
  `ResCountryBDate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResCountryEDate` varchar(100) CHARACTER SET utf8 NOT NULL,
  `PersonalIDNum` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResAddress` varchar(500) CHARACTER SET utf8 NOT NULL,
  `GetBenefitSpouse` char(1) NOT NULL DEFAULT 'N',
  `PPersonalIDNum` varchar(100) CHARACTER SET utf8 NOT NULL,
  `CountryStayDate` varchar(45) NOT NULL,
  `Reason` varchar(45) NOT NULL,
  `ResQusID` bigint(20) NOT NULL,
  `Eligiliblity` varchar(10) NOT NULL,
  PRIMARY KEY (`ResQusCountryID`),
  KEY `FK_ResidencyQuestionnariesCountryT_ResQusID` (`ResQusID`),
  CONSTRAINT `ResidencyQuestionnariesCountryT_ibfk_1` FOREIGN KEY (`ResQusID`) REFERENCES `ResidencyQuestionnariesT` (`ResQusID`)
) ENGINE=InnoDB AUTO_INCREMENT=899 DEFAULT CHARSET=latin1 COMMENT='Add Column';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResidencyQuestionnariesCountryT`
--

LOCK TABLES `ResidencyQuestionnariesCountryT` WRITE;
/*!40000 ALTER TABLE `ResidencyQuestionnariesCountryT` DISABLE KEYS */;
INSERT INTO `ResidencyQuestionnariesCountryT` VALUES (140,'AW','2016-07-02T11:03:01.658Z','2017-07-02T11:03:08.178Z','','aruba','N','','Unemployed','',64,''),(141,'AW','2016-07-02T11:03:01.658Z','2017-07-02T11:03:08.178Z','','aruba','N','','Unemployed','',64,'Yes'),(146,'CA','2002-07-03T07:22:06.153Z','2005-07-03T07:22:11.626Z','','California, USA','N','','Unemployed','',64,''),(148,'AI','2005-07-03T07:46:36.446Z','2006-07-03T07:46:42.550Z','','Anguilla','N','','Unemployed','',64,''),(154,'TD','2004-07-05T05:44:42.185Z','2005-07-05T05:44:47.516Z','','Australian Capital Territory, Australia','N','','Student','',64,'Yes'),(155,'AU','2004-07-05T05:49:00.390Z','2005-01-02T18:30:00.000Z','','Arizona, USA','N','','Student','',64,''),(160,'CA','2003-07-05T06:44:48.704Z','2003-11-02T18:30:00.000Z','','California, USA','N','','Student','',64,'No'),(165,'CA','2004-07-07T09:00:27.336Z','2005-07-07T09:03:03.399Z','','Japan','N','','Unemployed','',64,'Yes'),(207,'GB','2005-07-11T08:54:26.971Z','2005-11-09T18:30:00.000Z','','United Kingdom','N','','Unemployed','',64,'No'),(213,'US','1990-07-11T10:32:18.088Z','2001-07-11T10:32:24.289Z','456456','Telangana, India','N','','Student','',64,'Yes'),(255,'undef','null','null','undefined','undefined','u','undefined','undefined','undefined',64,'No'),(268,'ES','1993-07-18T09:17:17.086Z','2010-07-18T09:17:22.917Z','54567897545','Spain','N','','Student','',64,''),(269,'ES','1993-07-18T09:17:17.086Z','2010-07-18T09:17:22.917Z','54567897545','Spain','N','','Student','',64,''),(291,'UK','2016-07-18T14:18:14.378Z','2017-07-27T18:30:00.000Z','','United Kingdom','N','','Work','',1450,''),(292,'UK','2016-07-18T14:18:14.378Z','2017-07-27T18:30:00.000Z','','United Kingdom','N','','Work','',1450,''),(295,'US','1997-07-19T06:37:04.508Z','2015-07-19T06:37:09.766Z','4545454564','Offutt AFB, NE, USA','N','','Work','',64,''),(296,'US','2000-07-19T06:54:32.111Z','2016-07-19T06:58:57.669Z','87787875454','United States','N','','Unemployed','',64,''),(300,'UK','2016-07-20T05:48:01.687Z','2018-07-18T18:30:00.000Z','789456123','United Kingdom','N','','Work','',1450,'Yes'),(316,'UK','2012-07-20T09:34:50.389Z','2017-07-20T09:34:54.814Z','789456123','united kingdom ','N','','Student','',1640,'Yes'),(317,'UK','2012-07-20T09:34:50.389Z','2017-07-20T09:34:54.814Z','789456123','United Kingdom House, Fitzrovia, London, UK','N','','Work','',1640,'Yes'),(319,'UK','2012-07-20T09:34:50.389Z','2017-07-20T09:34:54.814Z','789456123','United Kingdom House, Fitzrovia, London, UK','N','','Work','',1640,'Yes'),(320,'UK','2012-07-20T09:34:50.389Z','2017-07-20T09:34:54.814Z','789456123','United Kingdom House, Fitzrovia, London, UK','N','','Work','',1640,'Yes'),(321,'CA','2008-07-20T09:57:34.676Z','2017-07-20T09:57:40.019Z','123654','canada','N','','Student','',1640,'Yes'),(412,'US','07-07-2010','07-07-2015','123456789','Chennai,India','y','123123123','Work','',3575,'eligibilit'),(458,'UK','24-09-2018','24-09-2020','555555','United States,US','','77777','Work','',3797,''),(564,'UK','02/17','06/17','','Ukiah, CA, USA','N','','Work','',3843,'undefined'),(566,'UK','01/17','12/17','','United Kingdom','N','','Work','',3843,'undefined'),(576,'UK','02/13','01/13','','UK','N','','Work','',3847,'undefined'),(577,'UK','03/13','05/14','','UK','N','','Work','',3847,'undefined'),(587,'UK','02/12','02/14','12345678966','United Kingdom House, London, UK','N','','Work','',3852,'undefined'),(589,'UK','01/85','03/88','','London, UK','N','','Work','',3854,'undefined'),(590,'US','02/00','03/10','222223333','250 Boylston Street, Boston, MA, USA','N','','Work','',3854,'undefined'),(595,'FR','01/13','05/14','123456789','France, Castelnau-de-Lévis, France','N','','Work','',3852,'undefined'),(597,'UK','11/12','08/16','12345678','United Kingdom House, London, UK','N','','Work','',3852,'undefined'),(598,'FR','05/13','08/15','234567899','Tesistán, Jalisco, Mexico','N','','Work','',3852,'undefined'),(600,'FR','02/12','05/14','23456789','France','N','','Work','',3852,'undefined'),(608,'KP','01/12','11/12','12312312321','13212312323','N','','Work','',3855,'undefined'),(617,'UK','02/12','08/12','','UK','N','','Work','',3843,'undefined'),(618,'UK','02/17','08/18','','UK','N','','Work','',3843,'undefined'),(619,'UK','01/12','06/13','','UK','N','','Work','',3843,'undefined'),(656,'KR','03-2016','04-2017','87854545454','Reston, VA, USA','N','','Work','',3855,'undefined'),(657,'JP','03-2016','01-2018','87545454545','Japan','N','','Work','',3855,'undefined'),(658,'JP','03-2016','02-2018','54645456745','Japan','N','','Work','',3855,'undefined'),(758,'KR','07-2011','08-2012','123456789','South Korea Border Area, Kaes?ng, North Hwanghae, ','N','','Work','',3852,'undefined'),(759,'AT','08-2012','08-2013','12365','Testarossa Winery, College Avenue, Los Gatos, CA, ','N','','Work','',3852,'undefined'),(767,'ZA','01-2017','06-2017','1212121212','South Korea','N','','Work','',3843,'undefined'),(769,'UK','02-2014','03-2015','569874569','United Kingdom House, London, UK','N','','Work','',3852,'undefined'),(770,'KR','01-2017','07-2017','','South Korea','Y','121212121','Work','',3843,'undefined'),(771,'KR','02-2013','10-2017','121212121','Korea','N','','Work','',3843,'undefined'),(772,'KR','02-2011','11-2011','1212334444','Korea','N','','Work','',3843,'undefined'),(775,'FR','01-2015','02-2016','789456123','Franchesse, France','N','','Work','',3852,'undefined'),(776,'AS','03-2007','03-2008','12547896633','American Sports Centers, South Anaheim Boulevard, ','N','','Work','',3852,'undefined'),(777,'DZ','12-2000','12-2001','4569871233','Algeria - Dubai - United Arab Emirates','N','','Work','',3852,'undefined'),(778,'AL','04-2002','07-2003','123654789','Albania, Caquetá, Colombia','N','','Work','',3852,'undefined'),(794,'NO','01-2016','01-2018','12115114545','ERF96577 Main Road, Newlands, Cape Town, Norway','N','','Work','',3878,'undefined'),(820,'NO','01-2009','11-2010','12115135345','4560 Broadway, New York, NY, Norway','N','','Work','',3878,'undefined'),(838,'AT','02-2006','07-2008','46456746456','Austria','N','','Work','',3881,'undefined'),(839,'AT','01-2016','02-2017','98865644368','Austria Center, Bruno-Kreisky-Platz, Vienna, Austr','N','','Work','',3878,'undefined'),(840,'BR','03-2013','07-2014','4645645','Brazil','N','','Work','',3881,'undefined'),(841,'DE','03-2015','01-2017','45634645','Germany','N','','Work','',3881,'undefined'),(842,'DK','03-2017','11-2017','456456456','Denmark','N','','Work','',3881,'undefined'),(844,'NL','01-2009','02-2018','34234535345','Avenida Corrientes 3429, Buenos Aires, Netherlands','N','','Work','',3878,'undefined'),(845,'AT','01-2015','03-2016','09776889909','Austria Center, Bruno-Kreisky-Platz, Vienna, Austr','N','','Work','',3852,'undefined'),(848,'NL','02-2017','07-2018','4564356345','Netherlands','N','','Work','',3881,'undefined'),(850,'PT','01-2009','05-2010','32134531684','JSS Academy of Technical Education, C Block, Phase','N','','Work','',3878,'undefined'),(851,'DE','01-2014','07-2015','98765336786','Germany','N','','Work','',3852,'undefined'),(853,'PT','01-1999','06-2004','23534563464','FD222, 1A Cross Road, FD Block, Sector III, Salt L','N','','Work','',3878,'undefined'),(855,'BE','03-2017','07-2018','4564564','Belgium','N','','Work','',3881,'undefined'),(856,'DE','01-2014','07-2015','98765346876','Germany','N','','Work','',3878,'undefined'),(860,'UK','01-2002','06-2003','12345678','London, UK','N','','Work','',3883,'undefined'),(861,'NO','07-2003','12-2004','220350','Oslo, Norway','N','','Student','',3883,'undefined'),(862,'AT','01-2005','12-2006','','Austria','N','','Work','',3883,'undefined'),(879,'UK','01-2002','03-2003','464645645','United Kingdom','N','','Work','',3884,'undefined'),(881,'AT','01-2013','06-2015','15937356','Austria','N','','Work','',3689,'undefined'),(883,'IE','03-2017','02-2018','56767456576','Ireland','N','','Work','',3689,'undefined'),(884,'IE','03-2017','07-2018','765775676','Ireland','N','','Work','',3689,'undefined'),(886,'KR','02-2014','03-2017','52863254326','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(887,'UK','07-2016','08-2017','525354','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(888,'AT','03-2015','08-2017','5425435','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(889,'BE','07-2015','06-2017','27684536245','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(890,'IE','03-2016','07-2017','1345345','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(891,'NL','03-2015','07-2017','24857453145','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(893,'PT','02-2016','02-2017','245786758','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(894,'DE','03-2015','01-2017','527524723','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(895,'NO','02-2015','07-2017','04015214765','Chennai, Tamil Nadu, India','N','','Work','',3885,'undefined'),(896,'KR','02-2010','02-2012','12232233112','Chennai, Tamil Nadu, India','N','','Work','',3861,'undefined'),(897,'KR','01-2010','12-2011','','Seoul, South Korea','N','','Work','',3883,'undefined'),(898,'KR','03-2016','02-2018','56743578563','Reston, VA, USA','N','','Work','',3886,'undefined');
/*!40000 ALTER TABLE `ResidencyQuestionnariesCountryT` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:30:18

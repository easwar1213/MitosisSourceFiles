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
-- Table structure for table `ResidencyQuestionnariesCountry`
--

DROP TABLE IF EXISTS `ResidencyQuestionnariesCountry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ResidencyQuestionnariesCountry` (
  `ResQusCountryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CountryOfResidency` varchar(5) CHARACTER SET utf8 NOT NULL,
  `ResCountry_BMonth` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResCountry_BYear` varchar(20) CHARACTER SET utf8 NOT NULL,
  `ResCountry_EMonth` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResCountry_EYear` varchar(20) CHARACTER SET utf8 NOT NULL,
  `PersonalIDNum` varchar(100) CHARACTER SET utf8 NOT NULL,
  `CurrentAddress` varchar(500) CHARACTER SET utf8 NOT NULL,
  `PBenefits` varchar(10) CHARACTER SET utf8 NOT NULL,
  `PPersonalIDNum` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ResQusID` bigint(20) NOT NULL,
  PRIMARY KEY (`ResQusCountryID`),
  KEY `FK_ResidencyQuestionnariesCountry_ResQusID` (`ResQusID`),
  CONSTRAINT `ResidencyQuestionnariesCountry_ibfk_1` FOREIGN KEY (`ResQusID`) REFERENCES `ResidencyQuestionnaries` (`ResQusID`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResidencyQuestionnariesCountry`
--

LOCK TABLES `ResidencyQuestionnariesCountry` WRITE;
/*!40000 ALTER TABLE `ResidencyQuestionnariesCountry` DISABLE KEYS */;
INSERT INTO `ResidencyQuestionnariesCountry` VALUES (48,'AU','','1930','','1931','','aus','','',21),(49,'BB','','1932','','1933','','aus','','',21),(62,'IN','September','1930','March','1955','4533333333','Madagascar','','',27),(63,'AL','February','1939','February','1940','1234567890','Albania','','',28),(64,'','','','','','','Albany Hwy, Arthur River WA 6315, Australia','','',28),(69,'Test','1','2017','2','2018','POI8658','OMR Chennai','','',31),(71,'IS','March','1955','December','1960','1234567890','Nauthólsvegur, 101 Reykjavík, Iceland','','',33),(72,'US','May','1970','December','2000','8324734665','US23 US-441, Sylva, NC 28779, USA','','',33),(74,'AS','February','1994','February','1996','258962','Samoa, CA 95564, USA','','',28),(75,'AU','February','1984','February','1986','45879624','Sydney NSW, Australia','','',28),(76,'CA','March','1984','February','1988','45896732','999 Canada Pl, Vancouver, BC V6C 3T4, Canada','','',28),(100,'IN','February','1979','January','1981','4589624','Rajpath Marg, India Gate, New Delhi, Delhi 110001, India','','',28),(109,'US','','1930','','1933','','DFW International Airport (DFW), 2400 Aviation Dr, DFW Airport, TX 75261, USA','','',28),(110,'CA','','1987','','1999','','Calgary, AB, Canada','','',33),(132,'IN','February','1930','January','1944','24587676','Samathuvapuram, Tamil Nadu 631561, India','','',33),(133,'ES','February','1931','February','1958','2548697','Spadina Ave, Toronto, ON, Canada','','',33),(134,'IT','January','1930','March','1934','8526876','Alavandan, Tamil Nadu 625110, India','','',28),(174,'test','test','tes','tes','tse','tes','tes','tes','tes',27),(199,'AG','January','1930','January','1933','53464563456','São Paulo, State of São Paulo, Brazil','','',28),(201,'JP','January','2000','February','2005','','Japan','','',52),(202,'JP','January','2000','February','2005','','Tokyo, Japan','','',53),(226,'IN','March','1930','May','1940','87658745764','OMR, Padur, Tamil Nadu 603103, India','','',26),(248,'CA','January','1930','January','1994','65647421342','Canada','','',96),(252,'CA','January','1930','January','1965','56454244654','United Kingdom','','',100),(253,'JP','January','1930','January','2002','65222226456','Kadayanallur','','',100);
/*!40000 ALTER TABLE `ResidencyQuestionnariesCountry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:28:22

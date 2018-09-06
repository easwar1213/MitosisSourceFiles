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
-- Table structure for table `ApplicantPageSetup`
--

DROP TABLE IF EXISTS `ApplicantPageSetup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ApplicantPageSetup` (
  `AppPageSetupID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PageTitle` varchar(200) CHARACTER SET utf8 NOT NULL,
  `PageLink` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Content` longtext NOT NULL,
  `IsActive` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`AppPageSetupID`),
  UNIQUE KEY `PageTitle` (`PageTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ApplicantPageSetup`
--

LOCK TABLES `ApplicantPageSetup` WRITE;
/*!40000 ALTER TABLE `ApplicantPageSetup` DISABLE KEYS */;
INSERT INTO `ApplicantPageSetup` VALUES (10,'Contact Us','FQA','<ul>\n  <li><strong>Do countries offer benefits to non-citizens?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes. Many countries allow benefits to non-citizens. If you have worked and/or lived in a country with whom you are not a citizen, you may qualify for benefits.</p>\n<ul>\n  <li><strong>Am I eligible for benefits?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Benefits eligibility depends on specific qualifying conditions for each country, which may include time lived and/or worked in a country, agreements with other countries and your citizenship, etc. These qualifiers may change over time, depending on new laws and agreements.</p>\n<ul>\n  <li><strong>When can I collect if I am eligible for benefits?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each country has its own age requirement when an individual can begin collecting benefits. Many countries have, or in the process of adjusting and increasing their age to qualify. Some questions may not be asked until close to retirement age or each country, since circumstances may change.</p>\n<ul>\n  <li><strong>Is my Spouse eligible for benefits?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each country has its own age requirement when an individual can begin collecting benefits. Many countries have, or in the process of adjusting and increasing their age to qualify. Some questions may not be asked until close to retirement age or each country, since circumstances may change.</p>\n<ul>\n  <li><strong>Can I make voluntary contributions?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Some countries may allow individuals to make contributions in order to increase their pension, or become eligible to qualify. Eligibility to make contributions vary by country. Not all countries allow voluntary contributions.</p>\n<ul>\n  <li><strong>Do I have to pay Taxes on foreign benefits?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We are not tax advisors or agents and cannot give advice on taxes. Please consult your tax advisor for further information.</p>\n<ul>\n  <li><strong>Can I collect benefits from several countries?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes, it is possible to collect benefits from several countries. Each country makes an independent determination on your status as it pertains to their qualifying conditions. This is why it is important to provide information on every country you have worked.</p>\n<ul>\n  <li><strong>Is it too late to collect if I am over the age of eligible retirement?</strong></li>\n</ul>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It depends on the country. Some countries may give retroactive pay for the time you have not collected, and then start monthly benefits.&amp;nbsp; Other countries may not allow benefits depending on various rules they have.</p>','Y'),(23,'Testing','AboutUs','<p>Test Content</p>','Y'),(26,'Contact Us us','Contact Us','<p>Virat Kohli, who is known for his strict fitness regime, started the video by saying he accepted Mr Rathore&#39;s challenge and that he would do his favourite core exercise. He proceeds to do twenty spider planks. &quot;Try that out,&quot; he says as the video ends.</p>\n','Y'),(27,'Content Update','Content Link','<p>Content testing</p>','u'),(31,'Content link update','Content link','<p>Content Link</p>','N'),(32,'Sample ','Sample ','<p>Sample Content</p>','N'),(33,'Test','Test1','<p>Welcomee</p>','N'),(34,'MYTEXT','ww.googlepage.com','<p>I am Google</p>','Y'),(35,'One','TWO','<p>Ms Parker</p>','Y'),(36,'About Us','AboutUs','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n<p><strong>Mission</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n<p><strong>Vision</strong></p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','Y'),(38,'Test Sample','Test Sample','<p>Test Content</P>','N'),(39,'Test 1 ','test `','<p>After changing lambda</p>','N'),(42,'Test11','test 1','<p>adasasd</p>','N'),(44,'Testasdas','tes','<p>asdasd</p>','N'),(45,'TWat','ga','<p>sdf</p>','N'),(47,'New Page','test','<p>Terst</p>','Y'),(48,'Test Page','Test Page','<p>Test Page Content</p>','Y'),(49,'Dev Test','Dev Test','<p><br></p>','N');
/*!40000 ALTER TABLE `ApplicantPageSetup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:24:11

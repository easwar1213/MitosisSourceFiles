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
-- Table structure for table `FlowGroup`
--

DROP TABLE IF EXISTS `FlowGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FlowGroup` (
  `flow_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `rule_id` int(11) DEFAULT NULL,
  `max_occur` int(11) NOT NULL DEFAULT '1',
  `flowgroup_id` int(11) NOT NULL AUTO_INCREMENT,
  `label` longtext,
  `label_resource_id` int(11) NOT NULL DEFAULT '9',
  PRIMARY KEY (`flowgroup_id`),
  KEY `FK_FlowGroup_Flow_idx` (`flow_id`),
  KEY `FK_FlowGroup_Group_idx` (`group_id`),
  CONSTRAINT `FK_FlowGroup_Flow` FOREIGN KEY (`flow_id`) REFERENCES `Flows` (`flow_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_FlowGroup_Group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlowGroup`
--

LOCK TABLES `FlowGroup` WRITE;
/*!40000 ALTER TABLE `FlowGroup` DISABLE KEYS */;
INSERT INTO `FlowGroup` VALUES (1,1,1,0,1,1,'This the label for Your Information group',9),(1,2,2,3,1,4,NULL,9),(13,4,1,0,1,7,NULL,9),(13,5,2,0,1,8,NULL,9),(13,6,3,0,1,9,NULL,9),(13,7,4,0,1,10,NULL,9),(13,8,5,0,1,11,NULL,9),(13,9,6,0,1,12,NULL,9),(13,10,7,0,1,13,NULL,9),(13,11,8,0,1,14,NULL,9),(13,12,9,0,1,15,NULL,9),(13,13,10,0,1,16,NULL,9),(13,14,11,0,1,17,NULL,9),(13,15,12,0,1,18,NULL,9),(13,16,13,0,1,19,NULL,9),(13,17,14,0,1,20,NULL,9),(13,18,15,0,1,21,NULL,9),(13,19,16,0,1,22,NULL,9),(13,20,17,0,1,23,NULL,9),(19,34,1,0,1,36,NULL,9),(20,35,1,0,1,37,NULL,9),(17,21,1,0,1,38,NULL,9),(17,22,2,0,1,39,NULL,9),(17,23,3,0,1,40,NULL,9),(17,24,4,0,1,41,NULL,9),(17,25,5,0,1,42,NULL,9),(17,26,6,0,1,43,NULL,9),(17,27,7,0,1,44,NULL,9),(17,28,8,0,1,45,NULL,9),(17,29,9,0,1,46,NULL,9),(20,36,2,0,1,47,NULL,9),(20,37,4,0,1,48,NULL,9),(20,38,6,0,1,49,NULL,9),(20,39,7,0,1,50,NULL,9),(17,30,10,0,1,51,NULL,9),(21,40,1,0,1,52,NULL,9),(21,41,2,0,1,53,NULL,9),(21,42,3,0,1,54,NULL,9),(21,43,4,0,1,55,NULL,9),(21,44,5,0,1,56,NULL,9),(21,45,5,0,1,57,NULL,9),(21,46,7,0,1,58,NULL,9),(21,47,8,0,1,59,NULL,9),(21,48,9,0,1,60,NULL,9),(21,49,10,0,1,61,NULL,9),(21,50,11,0,1,62,NULL,9),(21,51,12,0,1,63,NULL,9),(21,52,13,0,1,64,NULL,9),(20,54,3,0,1,65,NULL,9),(20,55,5,0,1,66,NULL,9),(20,56,8,0,1,67,NULL,9),(20,57,9,0,1,68,NULL,9),(20,58,10,0,1,69,NULL,9),(22,60,1,NULL,1,72,NULL,9);
/*!40000 ALTER TABLE `FlowGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:27:14

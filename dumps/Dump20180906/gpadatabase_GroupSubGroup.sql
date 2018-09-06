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
-- Table structure for table `GroupSubGroup`
--

DROP TABLE IF EXISTS `GroupSubGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GroupSubGroup` (
  `group_id` int(11) NOT NULL,
  `subgroup_id` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  `rule_id` int(11) DEFAULT NULL,
  `max_occur` int(11) NOT NULL DEFAULT '1',
  `groupsubgroup_id` int(11) NOT NULL AUTO_INCREMENT,
  `label` longtext,
  `label_resource_id` int(11) NOT NULL DEFAULT '9',
  PRIMARY KEY (`groupsubgroup_id`),
  KEY `FK_GroupSubGroup_group_idx` (`group_id`),
  KEY `FK_GroupSubGroup_SubGroup_idx` (`subgroup_id`),
  CONSTRAINT `FK_GroupSubGroup_Group` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_GroupSubGroup_SubGroup` FOREIGN KEY (`subgroup_id`) REFERENCES `SubGroups` (`subgroup_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GroupSubGroup`
--

LOCK TABLES `GroupSubGroup` WRITE;
/*!40000 ALTER TABLE `GroupSubGroup` DISABLE KEYS */;
INSERT INTO `GroupSubGroup` VALUES (26,3,1,NULL,1,8,'This is label for German Sub Group F',9),(24,2,1,NULL,13,13,NULL,9),(27,4,1,NULL,3,15,NULL,9),(31,5,1,NULL,1,16,NULL,9),(35,13,3,NULL,2,19,NULL,9),(41,14,1,NULL,1,20,NULL,9),(57,23,1,NULL,1,21,NULL,9),(36,14,1,NULL,1,22,NULL,9),(35,16,4,NULL,1,23,NULL,9),(35,17,5,NULL,1,25,NULL,9),(35,18,6,NULL,1,26,NULL,9),(35,19,7,NULL,1,27,NULL,9),(38,20,1,NULL,1,28,NULL,9),(38,21,2,NULL,1,29,NULL,9),(39,22,1,NULL,1,30,NULL,9);
/*!40000 ALTER TABLE `GroupSubGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-06 11:29:31

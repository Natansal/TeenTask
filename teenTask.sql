-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: TeenTask
-- ------------------------------------------------------
-- Server version	8.0.32-0buntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee_history`
--

DROP TABLE IF EXISTS `employee_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_history` (
  `eh_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `job_id` int NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `done` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`eh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_history`
--

LOCK TABLES `employee_history` WRITE;
/*!40000 ALTER TABLE `employee_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `job_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(10) NOT NULL,
  `payment` decimal(8,2) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `payment_type` tinyint(1) NOT NULL COMMENT '0 - hourly, 1 - per job',
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `rev_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `body` varchar(255) NOT NULL,
  `target_id` int NOT NULL,
  `starts` int NOT NULL,
  PRIMARY KEY (`rev_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_type` int NOT NULL COMMENT '0 - employee\n1 - employer\n2 - administrator',
  `email` varchar(255) NOT NULL,
  `phone_number` int NOT NULL,
  `birth_date` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `citizen_num` int NOT NULL,
  `bank_account` int DEFAULT NULL,
  `card_type` varchar(10) DEFAULT NULL,
  `card_num` int DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  `cvv` int DEFAULT NULL,
  `banned` tinyint(1) NOT NULL COMMENT '0 - not banned, 1 - banned',
  `creation_date` date NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_unique` (`email`),
  UNIQUE KEY `user_phone_number_unique` (`phone_number`),
  UNIQUE KEY `user_citizen_num_unique` (`citizen_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Natan','Salmon',2,'Natan.salmon@gmail.com',538312690,'2000-11-24','peduel','israel',322520867,NULL,NULL,NULL,NULL,NULL,0,'2023-01-29'),(2,'Daniel','Tsuria',2,'daniel.tsuria@gmail.com',547364759,'1999-06-12','Jerusalem','Israel',345323454,NULL,NULL,NULL,NULL,NULL,0,'2023-01-29'),(12,'Yotam2','Hanuka',0,'yoti@gmail.com',532346534,'2000-04-03','Hod Hasharon','Israel',322345347,NULL,NULL,NULL,NULL,NULL,0,'2023-01-29');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_access`
--

DROP TABLE IF EXISTS `user_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_access` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `cookie` varchar(100) NOT NULL,
  `cookie_exp_date` date NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_access_username_unique` (`username`),
  UNIQUE KEY `user_access_cookie_unique` (`cookie`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_access`
--

LOCK TABLES `user_access` WRITE;
/*!40000 ALTER TABLE `user_access` DISABLE KEYS */;
INSERT INTO `user_access` VALUES (1,'12345678','Natan','ABCDEFG12345','2024-01-29'),(2,'666666666','dendemons','0000d068ca4f4525','2023-02-28'),(12,'happyHanuka123','yoti12345','0000a187b59ade7c','2023-02-28');
/*!40000 ALTER TABLE `user_access` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-29 16:37:08

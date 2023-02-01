-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: TeenTask
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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
  `accepted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`eh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `category` varchar(20) NOT NULL,
  `payment` decimal(8,2) NOT NULL,
  `start_date` varchar(30) NOT NULL,
  `end_date` varchar(30) DEFAULT NULL,
  `payment_type` varchar(10) NOT NULL COMMENT '0 - hourly, 1 - per job',
  `available` tinyint NOT NULL DEFAULT '1',
  `done` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (13,47,'I need someone to help me with somehitng','Other',100.00,'2023-02-23T22:00:00.000Z','2023-03-02T22:00:00.000Z','Cash',1,0),(14,46,'damn son','Babysitting',12.00,'2023-02-09T22:00:00.000Z','2024-05-16T21:00:00.000Z','Credit',1,0),(15,47,'Please take my kids from me','Babysitting',100000.00,'2023-02-17T22:00:00.000Z','2050-07-27T21:00:00.000Z','Cash',1,0),(16,48,'Searching for someone to hunt','Other',10000.00,'2023-02-24T22:00:00.000Z','2023-02-26T03:00:00.000Z','Credit',1,0);
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
  `stars` int NOT NULL,
  PRIMARY KEY (`rev_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,45,'Amazing!',53,5),(2,46,'Just terrable',53,1),(3,47,'I wanted more',54,3),(4,48,'he was ok, not perfect tho',54,4),(5,48,'he likes hitler',55,1),(6,47,'wow!!!',53,5);
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
  `bank_account` varchar(20) DEFAULT NULL,
  `card_type` varchar(10) DEFAULT NULL,
  `card_num` varchar(16) DEFAULT NULL,
  `exp_date` varchar(5) DEFAULT NULL,
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
INSERT INTO `user` VALUES (45,'Bret','Winston',1,'bret@email.com',123321123,'1989-06-07','JERUSALEM','ISRAEL',123432123,'43211432143','visa','1469843212345678','12/26',537,0,'2023-02-01'),(46,'Emil','Lime',1,'emil@gmail.com',523451234,'1987-07-09','JERUSALEM','ISRAEL',987789654,'73947639433','visa','28374638463848','01/33',998,0,'2023-02-01'),(47,'Tom','Boi',1,'tom@gmail.com',654786543,'1982-04-16','TELAVIV','ISRAEL',657786123,'763548374','amex','837463947204729','12/25',991,0,'2023-02-01'),(48,'Jeff','Bezos',1,'JeffBezos@gmail.com',123432765,'1963-07-25','NEWYORK','USA',534567854,'432123456','visa','1234432156788765','12/25',564,0,'2023-02-01'),(53,'Daniel','Tsuria',0,'daniel@gmail.com',455123765,'1999-12-06','JERUSALEM','ISRAEL',654783921,NULL,NULL,NULL,NULL,NULL,0,'2023-02-01'),(54,'Natan','Salmon',0,'nat@gmail.com',658345987,'2000-11-20','TELAVIV','ISRAEL',768974567,NULL,NULL,NULL,NULL,NULL,0,'2023-02-01'),(55,'Kanye','West',0,'kanye@gmail.com',689345143,'2002-07-17','NEWYORK','USA',759468743,NULL,NULL,NULL,NULL,NULL,0,'2023-02-01');
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_access`
--

LOCK TABLES `user_access` WRITE;
/*!40000 ALTER TABLE `user_access` DISABLE KEYS */;
INSERT INTO `user_access` VALUES (45,'bret','bret','0000814292edfe74','2023-03-03'),(46,'12345','emil','00008ddc91c019dc','2023-03-03'),(47,'123','tom','0000b307937f332c','2023-03-03'),(48,'123','jeff','00001f9c68428eeb','2023-03-03'),(53,'123','dan','0000dd0c1d7daa53','2023-03-03'),(54,'123','nat','000063f3f92d0bde','2023-03-03'),(55,'123','ye','000005130f77d968','2023-03-03');
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

-- Dump completed on 2023-02-01 18:26:43

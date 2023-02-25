-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: image_sharing_app_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(60) NOT NULL,
  `content` varchar(200) NOT NULL,
  `username` varchar(20) NOT NULL,
  `date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'may3_202243150939.png','I like these flowers!','may3','2022/04/05 19:34:18'),(2,'may3_202243150722.jpg','hahahahahhahaha','may3','2022/04/05 19:50:35'),(3,'may3_202243150722.jpg','looks like you!','jungkook97','2022/04/05 19:51:11'),(4,'Ramisa_202243150824.png','I like this:)','jungkook97','2022/04/05 19:51:34'),(5,'jungkook97_202245170629.png','this is cool','may3','2022/04/05 19:52:23'),(6,'Ramisa_202245173300.jpg','pink & purple','may3','2022/04/05 19:52:58'),(7,'may3_202243150736.jpg','What are these words saying','Ramisa','2022/04/05 19:53:44'),(8,'Ramisa_202243150901.jpg','cute cat','Ramisa','2022/04/05 19:54:24'),(9,'Ramisa_202245173300.jpg','sweet','Ramisa','2022/04/05 19:54:43'),(10,'may3_202243150939.png','sweet','Ramisa','2022/04/05 22:39:28'),(11,'Ramisa_202243150847.png','magic hat~','jungkook97','2022/04/05 22:40:19'),(12,'may3_202243150736.jpg','haha','doudou','2022/04/05 22:42:11'),(13,'jungkook97_202245210925.jpg','funny','may3','2022/04/05 23:36:07'),(14,'may3_202243150736.jpg','They are really fat!! ;)','doudou','2022/04/05 23:39:53'),(15,'may3_202243150736.jpg','2 cats in the pic','doudou','2022/04/05 23:40:16'),(16,'Ramisa_202243150824.png','Looks good.......','trrtreh','2022/04/05 23:41:13'),(17,'Ramisa_202243150901.jpg','lol','trrtreh','2022/04/05 23:41:29');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `originalname` varchar(200) NOT NULL,
  `filename` varchar(60) NOT NULL,
  `username` varchar(30) NOT NULL,
  `date` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='This table is used to store the information about the images uploaded by the users.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'http___img2.doubanio.jpg','may3_202243150722.jpg','may3','2022/04/03 15:07:22','dogmeme01',0),(2,'ssl.duitang.jpg','may3_202243150736.jpg','may3','2022/04/03 15:07:36','catmeme01',0),(3,'http___mt-share.hlsgl.png','Ramisa_202243150824.png','Ramisa','2022/04/03 15:08:24','beautiful interior design',0),(4,'thumb.700_0.jpeg&refer=http___b-ssl.duitang.png','Ramisa_202243150847.png','Ramisa','2022/04/03 15:08:47','A hat',0),(5,'src=http___wx1.sinaimg.cn_orj360_4b239864gy1g050brw1c2j20j60h475e.jpg&refer=http___wx1.sinaimg.jpg','Ramisa_202243150901.jpg','Ramisa','2022/04/03 15:09:01','catmeme02',0),(6,'http___c-ssl.duitang.jpg','may3_202243150924.jpg','may3','2022/04/03 15:09:24','vaporwave01',1),(7,'130503110229.jpg&refer=http___www.bz55.png','may3_202243150939.png','may3','2022/04/03 15:09:39','flowers',0),(8,'SftwK.jpeg&refer=http___b-ssl.duitang.png','jungkook97_202245170629.png','jungkook97','2022/04/05 17:06:29','David',0),(9,'20200328143250_eukve.jpg&refer=http___c-ssl.duitang.png','jungkook97_202245170816.png','jungkook97','2022/04/05 17:08:16','Astronaut~~~~~~~~~!',0),(10,'ea945ec9d642b4b46af16ee_th.jpg&refer=http___img.mp.itc.jpg','may3_202245170953.jpg','may3','2022/04/05 17:09:53','dogmeme 02',1),(11,'13859958670_1000.jpg&refer=http___inews.gtimg.jpg','Ramisa_202245173300.jpg','Ramisa','2022/04/05 17:33:00','moon light',0),(12,'ea945ec9d642b4b46af16ee_th.jpg&refer=http___img.mp.itc.jpg','jungkook97_202245210925.jpg','jungkook97','2022/04/05 21:09:25','',0),(13,'src=http___img2.niutuku.com_desk_1208_2057_ntk-2057-31784.jpg&refer=http___img2.niutuku.png','trrtreh_202245234210.png','trrtreh','2022/04/05 23:42:10','beautiful red flowers',1);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(60) NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,'jungkook97_202245170816.png','jungkook97'),(2,'jungkook97_202245170629.png','may3'),(3,'may3_202245170953.jpg','may3'),(4,'may3_202243150924.jpg','may3'),(5,'may3_202243150722.jpg','jungkook97'),(6,'Ramisa_202243150824.png','jungkook97'),(7,'may3_202243150722.jpg','may3'),(8,'jungkook97_202245170816.png','may3'),(9,'Ramisa_202243150824.png','may3'),(10,'Ramisa_202243150824.png','Ramisa'),(11,'may3_202243150939.png','may3'),(12,'Ramisa_202245173300.jpg','jungkook97'),(13,'may3_202243150924.jpg','jungkook97'),(14,'Ramisa_202245173300.jpg','may3'),(15,'may3_202243150736.jpg','may3'),(16,'may3_202243150736.jpg','Ramisa'),(17,'jungkook97_202245170629.png','Ramisa'),(18,'Ramisa_202243150847.png','Ramisa'),(19,'may3_202243150722.jpg','Ramisa'),(20,'jungkook97_202245170816.png','Ramisa'),(21,'may3_202243150722.jpg','doudou'),(22,'jungkook97_202245170816.png','doudou'),(23,'jungkook97_202245170816.png','test'),(24,'jungkook97_202245210925.jpg','test'),(25,'jungkook97_202245210925.jpg','may3'),(26,'Ramisa_202243150847.png','doudou'),(27,'may3_202243150939.png','doudou'),(28,'jungkook97_202245170816.png','trrtreh'),(29,'trrtreh_202245234210.png','trrtreh');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'This is the unique identifier for specific user information.',
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'It indicates the status of the user, which is a Boolean value. 0 means the user''s status is normal, 1 means the user is disabled.',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='This table is used to store all the information of the users.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'may3','123456',0),(2,'Mayihua00','19950504Amy',0),(3,'Ramisa','654321',0),(4,'Jungkook97','970901JK',0),(5,'wsws','12345',0),(6,'test','12345',0),(7,'mayihua','19950504Amy',0),(8,'doudou','12345',0),(9,'trrtreh','88888',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-05 23:49:33

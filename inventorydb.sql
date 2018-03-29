-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 27, 2018 at 02:40 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventorydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `parentId`, `isDelete`) VALUES
(1, 'Clothes', NULL, 0),
(2, 'Electronic', NULL, 0),
(3, 'Furniture Item', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `creditpointtransaction`
--

CREATE TABLE `creditpointtransaction` (
  `creditPointTransactionId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `orderItemId` int(11) DEFAULT NULL,
  `creditDate` date NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `creditpointtransaction`
--
DELIMITER $$
CREATE TRIGGER `UserCreditPoint` AFTER INSERT ON `creditpointtransaction` FOR EACH ROW BEGIN
SET @userId=new.userId;
SET @cnt=0;
select count(*) INTO @cnt from user where userId=@userId;
IF @cnt >0 THEN
	IF new.status="credit" THEN
	UPDATE user set creditPoints=creditPoints+new.amount where userId=@userId;
    END IF;
    IF new.status="debit" THEN
	UPDATE user set creditPoints=creditPoints-new.amount where userId=@userId;
    END IF;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `orderItemId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `hireDate` date NOT NULL,
  `returnDate` date DEFAULT NULL,
  `totalPrice` float NOT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0',
  `orderId` int(11) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`orderItemId`, `productId`, `qty`, `hireDate`, `returnDate`, `totalPrice`, `isDelete`, `orderId`, `status`) VALUES
(2, 3, 5, '2018-03-13', '2018-03-15', 500, 0, 2, 'pending'),
(3, 3, 2, '2018-03-21', '2018-03-22', 400, 0, 2, 'pending'),
(4, 6, 2, '2018-03-20', '2018-03-21', 300, 0, 3, 'pending'),
(7, 7, 2, '2018-03-21', '2018-03-22', 400, 0, 3, 'pending'),
(10, 13, 3, '2018-03-28', '2018-03-30', 200, 0, 9, 'clear'),
(11, 14, 3, '2018-03-28', '2018-03-30', 200, 0, 9, 'pending'),
(12, 3, 1, '2018-03-27', '2018-03-31', 600, 0, 11, 'pending'),
(13, 3, 1, '2018-03-26', '2018-03-28', 240, 0, 12, 'pending');

--
-- Triggers `orderitem`
--
DELIMITER $$
CREATE TRIGGER `pointCalculation` AFTER INSERT ON `orderitem` FOR EACH ROW BEGIN
SET @productId=new.productId;
SET @price=0,@userId=0;
SET @type='';
SET @points=0;
SET @dateDiff= DATEDIFF(new.returnDate,new.hireDate);

select userId,price INTO @userId,@price  from product where productId=@productId;

select userType INTO @type from user where userId=@userId;

IF @type="admin" THEN
  SET @points=@price*0.2*new.qty*@dateDiff; 
   
   insert into creditpointtransaction(userId,orderItemId,creditDate,amount,status)values(@userId,new.orderItemId,CURDATE(),@points,'credit');
END IF;

IF @type="inventoryUser" THEN
 SET @points=@price*0.1*new.qty*@dateDiff; 

   insert into creditpointtransaction(userId,orderItemId,creditDate,amount,status)values(@userId,new.orderItemId,CURDATE(),@points,'credit');
 
   insert into creditpointtransaction(userId,orderItemId,creditDate,amount,status)values(23,new.orderItemId,CURDATE(),@points,'credit');
END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `userId` int(11) NOT NULL,
  `paymentType` varchar(20) NOT NULL,
  `totalAmount` float NOT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `orderDate`, `userId`, `paymentType`, `totalAmount`, `isDelete`) VALUES
(9, '2018-03-24', 24, 'COD', 1200, 0),
(11, '2018-03-27', 82, 'COD', 600, 0),
(12, '2018-03-23', 82, 'COD', 240, 0);

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `check_balance` AFTER INSERT ON `orders` FOR EACH ROW BEGIN
SET @userId=new.userId;
SET @cnt=0;
SET @bal=0;
IF new.paymentType <> "COD" THEN
    SET @amt=new.totalAmount;
   select balance INTO @bal from wallet where userId=@userId;
   IF @bal>=new.totalAmount THEN
           
     INSERT into wallettransaction(userId,amount,status,transactionDate) values(@userId,new.totalAmount,'debit',CURDATE());
   END IF;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `penalty`
--

CREATE TABLE `penalty` (
  `penaltyId` int(11) NOT NULL,
  `orderItemId` int(11) NOT NULL,
  `overDueDays` int(11) NOT NULL,
  `penaltyAmount` float DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penalty`
--

INSERT INTO `penalty` (`penaltyId`, `orderItemId`, `overDueDays`, `penaltyAmount`, `isDelete`, `status`) VALUES
(2, 2, 2, 100, 0, NULL),
(3, 3, 1, 20, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `photoId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `manufacturer` varchar(50) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` float NOT NULL,
  `photo` varchar(200) NOT NULL,
  `discount` float DEFAULT NULL,
  `description` varchar(400) NOT NULL,
  `isApprove` tinyint(1) NOT NULL DEFAULT '1',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `productName`, `categoryId`, `manufacturer`, `userId`, `stock`, `price`, `photo`, `discount`, `description`, `isApprove`, `isDelete`) VALUES
(3, 'Remote Fan', 2, 'Orients', 23, 4, 100, 'Havels fan.jpeg', 10, 'Whether it is to delight your kids with our special Disney fans or cooling every corner of your room, our table fans, pedestal fans and wall fans will ensure that cool breeze is just a switch away.', 1, 0),
(4, 'Fan', 2, 'bajaj', 20, 10, 100, 'long fan.jpg', 10, 'Whether it is to delight your kids with our special Disney fans or cooling every corner of your room, our table fans, pedestal fans and wall fans will ensure that cool breeze is just a switch away.', 1, 0),
(6, 'Shirt', 1, 'NULL', 21, 10, 100, 'red child dress.jpg', 10, 'Browser our Men\\''s Cotton & Linen shirts Collection. All our shirts are beautifully tailored and crafted from the finest cotton making sure you have the perfect cotton shirt for everyday.', 1, 0),
(7, 'Shirt', 1, 'NULL', 23, 10, 100, 'stylish-childrens-wear.jpg', 10, 'Browser our KidsCotton & Linen shirts Collection. All our shirts are beautifully tailored and crafted from the finest cotton making sure you have the perfect cotton shirt for everyday.', 1, 0),
(8, 'Wooden', 3, 'NULL', 19, 20, 600, 'stylish-wooden.jpg', 10, 'Wooden Furniture is quite infamous for their incomparable and undeniable utility as well as beauty. Although a lot of modern houses keep furnishings that are made from glass, steel or other items, the magnificence of the wooden items is beyond excellence. The best thing about these items is that their beauty and class can last a whole life time. ', 1, 0),
(9, 'tablet', 2, 'lenovo', 25, 23, 400, 'tablat.jpg', 10, 'Lenovo provide brand new tablet with All basic functionality', 1, 0),
(11, 'design camera', 2, 'canon', 23, 20, 2000, 'camera.jpg', 10, 'nice camera', 1, 0),
(12, 'dslr camera', 2, 'canon', 25, 20, 600, 'canon dslr.jpg', 10, 'nice camera', 0, 0),
(13, 'canon camera ', 2, 'canon', 25, 20, 600, 'canon new dslr.jpg', 10, 'nice camera', 0, 0),
(14, 'coat', 1, 'canon', 25, 20, 600, 'coats.jpg', 10, 'nice coats', 0, 0),
(15, 'Latest', 2, 'Nikon', 23, 12, 600, 'dslr Camera.jpg', 10, 'nice clarity of photo', 0, 0),
(16, 'Generator', 2, 'orient', 23, 12, 600, 'generator.jpg', 10, 'efficient', 0, 0),
(17, 'European style', 1, 'Dior', 23, 12, 100, 'European American summer style.jpg', 10, 'nice', 0, 0),
(18, 'girls-set', 1, 'Dior', 25, 12, 100, 'girls set.jpg', 10, 'nice', 0, 0),
(19, 'girls-wear-15', 1, 'Dior', 23, 20, 100, 'girls-wear-15.jpg', 10, 'it''s best for 15 year girls', 0, 0),
(20, 'india Sofa set', 3, 'Ameriacn Signature', 23, 20, 1000, 'india Sofa set.jpg', 10, 'nice', 0, 0),
(21, 'jodhpur sofa set', 3, 'Ameriacn Signature', 23, 20, 1000, 'jodhpur sofa set.jpg', 10, 'very nice', 0, 0),
(22, 'key board', 2, 'nikon', 23, 20, 800, 'key board.jpg', 10, 'very nice', 0, 0),
(23, 'menswear', 2, 'Diaor', 25, 20, 200, 'menswear.jpg', 10, 'very nice for mens', 0, 0),
(24, 'red lehenga', 2, 'Diaor', 25, 20, 200, 'red lehenga.jpg', 10, 'very nice for womens', 0, 0),
(25, 'royal sofa set', 3, 'American signature', 23, 20, 600, 'royal sofa set.JPG', 10, 'very nice', 0, 0),
(26, 'simple sofa set', 3, 'American signature', 23, 20, 500, 'simple sofa set.jpg', 10, 'very nice', 0, 0),
(27, 'smallChildChair', 3, 'American signature', 25, 20, 300, 'smallChildChair.jpg', 10, 'very nice', 0, 0),
(28, 'woman cloth', 3, 'Diaor', 25, 20, 300, 'woman cloth.jpg', 10, 'very nice', 0, 0),
(29, 'fsdfsdf', 0, 'fsdf', 23, 6, 5, 'package.json', 5, 'fsdfdsf', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `contactNo` varchar(13) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `userType` varchar(20) NOT NULL,
  `creditPoints` float DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userName`, `email`, `password`, `contactNo`, `address`, `dob`, `userType`, `creditPoints`, `token`, `isDelete`) VALUES
(18, 'om', 'om@gmail.com', '$2a$10$9Ntdtt4X2rLjeh/ntRAjNOcD0gVTXC8YHZTo8u2UQErRdQQzHE4xe', '1234512345', 'ghjk', '2001-03-16', 'borrower', NULL, NULL, 0),
(19, 'jyoti', 'jyoti@gmail.com', '$2a$10$Idvutn3waKRuP2Fjk7ZST.c6asdJKoN6GC0zA7jRV8sRWqD8lYbnu', '1234567890', 'jhhjk', '1996-03-23', 'inventoryUser', NULL, NULL, 0),
(20, 'er', 'er@gmail.com', '$2a$10$t30va4opL1/lf8A/8/w2O.szzHye0yUlFAzA2vwtArNMTaXvS0ft6', '1234567890', 'hjhjkhjk', '1996-03-09', 'inventoryUser', NULL, NULL, 0),
(21, 'a', 'a@gmail.com', '$2a$10$t30va4opL1/lf8A/8/w2O.szzHye0yUlFAzA2vwtArNMTaXvS0ft6', '1234567890', 'zxdfcsdf', '2018-03-01', 'inventoryUser', NULL, NULL, 0),
(22, 'b', 'b@gmail.com', '$2a$10$t30va4opL1/lf8A/8/w2O.szzHye0yUlFAzA2vwtArNMTaXvS0ft6', '1234567890', 'dfsdf', '2018-03-06', 'borrower', NULL, NULL, 0),
(23, 'admin', 'admin@gmail.com', '$2a$10$BwOVOWmHuvHQSCfFF7/knOoU5B9XxsHsXzRtj8WVrvPvglacm8ir.', '123456789265', 'sardar Socity', '0000-00-00', 'admin', NULL, NULL, 0),
(24, 'a1', 'a1@gmail.com', '$2a$10$G6aPv9tjW4vWMWb9.m7Ocerwx0zL.1bE0OQcCWjkRNCqvQpA2GU6a', '1234567', 'sardar Society', '0000-00-00', 'borrower', NULL, NULL, 0),
(25, 'b1', 'b1@gmail.com', '$2a$10$3q/kvLzDKzfGlX7AdRdWp.3ejKyPRGeGTvQhAHHS66TNWu/QUEAj.', '1234567000', 'Housing', '0000-00-00', 'inventoryUser', NULL, NULL, 0),
(26, 'swapanalee', 'swa@gmail.com', '$2a$10$Lhn4Q.4vVl0sKnM7YC6iAOtliYtzSwlvJ6P0w5VslfI.dB0kT7obW', '1234567890', 'Vyara', '1996-03-14', 'borrower', NULL, NULL, 0),
(27, 'jyotipadhi', 'jyotipadhi1@gmail.com', '$2a$10$stjQBo55AXglzQg9lzncIOKDxc5CA9j3gsNO9FZcmgndvEQkhYQ5a', NULL, 'sardar nagar', '2000-06-20', 'inventoryUser', NULL, NULL, 0),
(28, 'khjk', 'hhfgh@gmail.com', '$2a$10$DCvnMlHzR8oyXusFnbLyLudstQMdhUKld.hrY6u1nPAQdnXe9Xy1m', NULL, 'jghjghj', '2018-03-15', 'inventoryUser', NULL, NULL, 0),
(29, 'rashika', 'rashika@gmail.com', '$2a$10$KfNewQmfZjbZ64Kei8BpxeOaXN2CuJ8s2UrHbyEF9iRyfQ82uzNfu', NULL, 'sardar nagar', '1995-06-13', 'inventoryUser', NULL, NULL, 0),
(77, 'rashika', 'lanetteam.bhavna@gmail.com', '$2a$10$cQ9s8OQend6njcrDLlDnTuUEnmB.gNI4ZZCh7elolH1s/hMauYXbu', '1234567890', 'xyz', '1990-02-02', 'inventoryUser', NULL, NULL, 0),
(78, 'rashika', 'lanetteam.rashika@gmail.com', '$2a$10$DhTq/C2RosShRbBQA4sgdeCzvNaRj7.RaSUl4K4VWN1ztaoLtsrjK', '1234567', 'sardar nagar', '2000-03-20', 'inventoryUser', NULL, NULL, 0),
(79, 'deeksha', 'deeksha@gmail.com', '$2a$10$kGErE4MwFUVKrekjYm.oKOxuypfadKa8ORD/on.P1Tkkl3pc8.S1G', '1234567890', 'fsdfsdfsdfsdf', '1998-06-16', 'borrower', NULL, NULL, 0),
(80, 'kd', 'kd@gmail.com', '$2a$10$YNZQ6QHBxyDQ8NZKumt3cuHvH3hXIay..pKQPfh1KZzuJnrExa71e', '5766756767', '5676767657', '0000-00-00', 'borrower', NULL, NULL, 0),
(81, 'shashvat', 'lanetteam.shashvat@gmail.com', '$2a$10$wCUSGsCpYOkHa5MDnW4mguWpCIiFW5OjNw3f.J1UhHeYSFvZwOjQW', '7458123985', 'asdasdasdasdasdasdasdasdasdasddas', '1997-04-05', 'borrower', NULL, NULL, 0),
(82, 'prajakta', 'praju@gmail.com', '$2a$10$PGaqWXqhz2Aq4RajdsjVTOedtY1L4fiSU6ro6K4bp7tPGQ6aDW1cK', '121231221', 'Surat', '1996-03-17', 'borrower', NULL, NULL, 0);

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `WalletTransEntry` AFTER INSERT ON `user` FOR EACH ROW BEGIN
IF  new.userType='borrower' THEN
     INSERT into wallettransaction(userId,amount,status,transactionDate) values(new.userId,50,'credit',CURDATE());
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `walletId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `balance` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`walletId`, `userId`, `balance`) VALUES
(2, 22, 40),
(3, 24, 5345500),
(4, 26, 50),
(5, 79, 50),
(6, 80, 50),
(7, 81, 50),
(8, 82, 150);

-- --------------------------------------------------------

--
-- Table structure for table `wallettransaction`
--

CREATE TABLE `wallettransaction` (
  `walletTransactionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `transactionDate` date NOT NULL,
  `cardDetails` varchar(50) DEFAULT NULL,
  `amount` float NOT NULL,
  `status` varchar(7) NOT NULL,
  `isDelete` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wallettransaction`
--

INSERT INTO `wallettransaction` (`walletTransactionId`, `userId`, `transactionDate`, `cardDetails`, `amount`, `status`, `isDelete`) VALUES
(13, 23, '2018-03-13', NULL, 50, 'credit', 0),
(14, 18, '2018-03-13', NULL, 50, 'credit', 0),
(15, 19, '2018-03-15', NULL, 50, 'credit', 0),
(16, 20, '2018-03-15', NULL, 50, 'credit', 0),
(18, 22, '2018-03-15', NULL, 50, 'credit', 0),
(19, 24, '2018-03-19', NULL, 50, 'credit', 0),
(20, 26, '2018-03-19', NULL, 50, 'credit', 0),
(21, 24, '2018-03-20', 'kl,1234567890123456,2018-03-31,123', 100, 'credit', 0),
(22, 79, '2018-03-23', NULL, 50, 'credit', 0),
(23, 80, '2018-03-24', NULL, 50, 'debit', 0),
(24, 22, '2018-03-24', NULL, 10, 'debit', 0),
(25, 81, '2018-03-26', NULL, 50, 'credit', 0),
(26, 24, '2018-03-26', 'fsdfdsf,6546456756576877,2018-03-30,gfdgfdg', 5345340, 'credit', 0),
(27, 82, '2018-03-27', NULL, 50, 'credit', 0),
(28, 82, '2018-03-27', 'Master Card,1234567787797979,2020-03-24,12342534', 100, 'credit', 0);

--
-- Triggers `wallettransaction`
--
DELIMITER $$
CREATE TRIGGER `WalletEntry` AFTER INSERT ON `wallettransaction` FOR EACH ROW BEGIN
SET @userId=new.userId;
SET @cnt=0;

select count(*) INTO @cnt from wallet where userId=@userId;
IF @cnt >0 THEN
    IF new.status="credit" THEN
    UPDATE wallet set balance=balance+new.amount where userId=@userId;
   END IF;
   IF new.status="debit" THEN
    UPDATE wallet set balance=balance-new.amount where userId=@userId;
   END IF;
ELSE 
    INSERT INTO wallet (userId,balance)values(@userId,new.amount);
END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`),
  ADD KEY `parentId` (`parentId`);

--
-- Indexes for table `creditpointtransaction`
--
ALTER TABLE `creditpointtransaction`
  ADD PRIMARY KEY (`creditPointTransactionId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `orderItemId` (`orderItemId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `penalty`
--
ALTER TABLE `penalty`
  ADD PRIMARY KEY (`penaltyId`),
  ADD KEY `orderItemId` (`orderItemId`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`photoId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`walletId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `wallettransaction`
--
ALTER TABLE `wallettransaction`
  ADD PRIMARY KEY (`walletTransactionId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `creditpointtransaction`
--
ALTER TABLE `creditpointtransaction`
  MODIFY `creditPointTransactionId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `orderItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `penalty`
--
ALTER TABLE `penalty`
  MODIFY `penaltyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `photoId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `walletId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `wallettransaction`
--
ALTER TABLE `wallettransaction`
  MODIFY `walletTransactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `category` (`categoryId`);

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `penalty`
--
ALTER TABLE `penalty`
  ADD CONSTRAINT `penalty_ibfk_1` FOREIGN KEY (`orderItemId`) REFERENCES `orderitem` (`orderItemId`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `wallettransaction`
--
ALTER TABLE `wallettransaction`
  ADD CONSTRAINT `wallettransaction_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

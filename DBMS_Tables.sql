CREATE TABLE [PaymentType]
(
  PaymentType_ID INT IDENTITY(1,1) NOT NULL,
  TypeName VARCHAR(50) NOT NULL,
  PRIMARY KEY (PaymentType_ID)
);
CREATE TABLE [Seller]
(
  Seller_ID INT IDENTITY(1,1) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Location VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  PRIMARY KEY (Seller_ID),
  UNIQUE (Email),
  UNIQUE (Username)
);

CREATE TABLE [Buyer]
(
  Buyer_ID INT IDENTITY(1,1) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Location VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  PRIMARY KEY (Buyer_ID),
  UNIQUE (Email),
  UNIQUE (Username)
);

CREATE TABLE [SellerMeetingLocation]
(
  Location_ID INT IDENTITY(1,1) NOT NULL,
  Seller_ID INT NOT NULL,
  MeetingLocation VARCHAR(255) NOT NULL,
  PRIMARY KEY (Location_ID),
  FOREIGN KEY (Seller_ID) REFERENCES [Seller](Seller_ID)
);

CREATE TABLE [SellerAvailability]
(
  Availability_ID INT IDENTITY(1,1) NOT NULL,
  Seller_ID INT NOT NULL,
  AvailableFrom DATETIME NOT NULL,
  AvailableTo DATETIME NOT NULL,
  PRIMARY KEY (Availability_ID),
  FOREIGN KEY (Seller_ID) REFERENCES [Seller](Seller_ID)
);


CREATE TABLE [SellerPaymentType]
(
  SellerPaymentType_ID INT IDENTITY(1,1) NOT NULL,
  Seller_ID INT NOT NULL,
  PaymentType_ID INT NOT NULL,
  PRIMARY KEY (SellerPaymentType_ID),
  FOREIGN KEY (Seller_ID) REFERENCES [Seller](Seller_ID),
  FOREIGN KEY (PaymentType_ID) REFERENCES [PaymentType](PaymentType_ID)
);

CREATE TABLE [BuyerPaymentType]
(
  BuyerPaymentType_ID INT IDENTITY(1,1) NOT NULL,
  Buyer_ID INT NOT NULL,
  PaymentType_ID INT NOT NULL,
  PRIMARY KEY (BuyerPaymentType_ID),
  FOREIGN KEY (Buyer_ID) REFERENCES [Buyer](Buyer_ID),
  FOREIGN KEY (PaymentType_ID) REFERENCES [PaymentType](PaymentType_ID)
);



CREATE TABLE [Listings]
(
  Listings_ID INT IDENTITY(1,1) NOT NULL,
  Seller_ID INT NOT NULL,
  Description VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Location_ID INT, -- Changed to Location_ID
  Transaction_Date DATETIME,
  Buyer_ID INT,
  PRIMARY KEY (Listings_ID),
  FOREIGN KEY (Seller_ID) REFERENCES [Seller](Seller_ID),
  FOREIGN KEY (Buyer_ID) REFERENCES [Buyer](Buyer_ID),
  FOREIGN KEY (Location_ID) REFERENCES [SellerMeetingLocation](Location_ID) -- Corrected foreign key reference
);


CREATE TABLE Rating
(
  Rating_ID INT IDENTITY(1,1) NOT NULL,
  Rated_user_ID INT NOT NULL,
  Rating_user_ID INT NOT NULL,
  Rating INT NOT NULL,
  Feedback VARCHAR(255) NOT NULL,
  PRIMARY KEY (Rating_ID),
  FOREIGN KEY (Rated_user_ID) REFERENCES [Seller](Seller_ID),
  FOREIGN KEY (Rating_user_ID) REFERENCES [Buyer](Buyer_ID)
);

ALTER TABLE [SellerPaymentType]
ADD CONSTRAINT FK_SellerPaymentType_Seller
FOREIGN KEY (Seller_ID) REFERENCES [Seller](Seller_ID);

ALTER TABLE [SellerPaymentType]
ADD CONSTRAINT FK_SellerPaymentType_PaymentType
FOREIGN KEY (PaymentType_ID) REFERENCES [PaymentType](PaymentType_ID);

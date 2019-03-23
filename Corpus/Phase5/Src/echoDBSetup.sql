CREATE TABLE user (
userID INT NOT NULL AUTO_INCREMENT,
username VARCHAR(20) NOT NULL,
fullname VARCHAR(40) NOT NULL,
passwordHash VARCHAR(20) NOT NULL,
hasRead BOOLEAN,
hasCreateEdit BOOLEAN,
hasEditFull BOOLEAN,
hasExportSimple BOOLEAN,
hasExportFull BOOLEAN,
hasAdmin BOOLEAN,
 PRIMARY KEY (userID)
);

CREATE TABLE rfidtag (
nfcRFID VARCHAR(10) UNIQUE NOT NULL,
nfcRFIDInternal VARCHAR(20) UNIQUE NOT NULL,
PRIMARY KEY (nfcRFID, nfcRFIDInternal)
);

CREATE TABLE feeder (
feederID INT NOT NULL AUTO_INCREMENT,
createdBy INT,
feederDescription VARCHAR(200),
PRIMARY KEY (feederID),
FOREIGN KEY (createdBy) REFERENCES user(userID)
);

CREATE TABLE nestsite (
nestID VARCHAR(10) NOT NULL,
createdBy INT,
nestDescription VARCHAR(200),
PRIMARY KEY (nestID),
FOREIGN KEY (createdBy) REFERENCES user(userID)
);

CREATE TABLE bird (
birdID INT NOT NULL AUTO_INCREMENT,
createdBy INT,
lastEdit INT,
createdOn DATETIME NOT NULL,
birdName VARCHAR(20),
nfcRFID VARCHAR(10),
studID VARCHAR(20) UNIQUE,
newStudID VARCHAR(20) UNIQUE,
leftRingID VARCHAR(30),
rightRingID VARCHAR(30),
sex ENUM('M', 'F'),
layDate DATE,
hatchedWhere VARCHAR (20),
hatchDate DATE,
incubationDays INT,
birdFledged boolean,
fledgedWhere VARCHAR(20),
releasedWhere VARCHAR(20),
releasedWhen DATETIME,
groupName VARCHAR(20),
currentNestSite VARCHAR(10),
motherName VARCHAR(20),
motherID INT,
fatherName VARCHAR(20),
fatherID INT,
secondFatherName VARCHAR(20),
secondFatherID INT,
birdCondition VARCHAR(200),
researcherNotes VARCHAR(200),
dateOut DATE,
PRIMARY KEY (birdID),
FOREIGN KEY (createdBy) REFERENCES user(userID),
FOREIGN KEY (nfcRFID) REFERENCES rfidtag(nfcRFID),
FOREIGN KEY (currentNestSite) REFERENCES nestsite(nestID),
FOREIGN KEY (motherID) REFERENCES bird(birdID),
FOREIGN KEY (fatherID) REFERENCES bird(birdID),
FOREIGN KEY (secondFatherID) REFERENCES bird(birdID)
);

CREATE TABLE visit (
visitID INT NOT NULL AUTO_INCREMENT,
feederID INT,
birdID INT,
ncfRFIDInternal VARCHAR(20),
PRIMARY KEY(visitID),
FOREIGN KEY (feederID) REFERENCES feeder(feederID),
FOREIGN KEY (birdID) REFERENCES bird(birdID),
FOREIGN KEY (ncfRFIDInternal) REFERENCES rfidtag(nfcRFIDInternal)
);

CREATE TABLE changelog (
logID INT NOT NULL AUTO_INCREMENT,
userID INT,
birdID INT,
changes VARCHAR(20) NOT NULL,
changedOn DATETIME NOT NULL,
PRIMARY KEY (logID),
FOREIGN KEY (userID) REFERENCES user(userID),
FOREIGN KEY (birdID) REFERENCES bird(birdID)
);

ALTER TABLE bird
ADD FOREIGN KEY (lastEdit) REFERENCES changelog(logID)
/*Deletes All Data currently in tables*/
TRUNCATE TABLE birdcondition;
TRUNCATE TABLE birdnest;
TRUNCATE TABLE user;
TRUNCATE TABLE nestsite;
TRUNCATE TABLE visit;
TRUNCATE TABLE rfidtag;
TRUNCATE TABLE bird;

/*Populates all the above tables with designed testing data*/

INSERT INTO bird 
(createdAt, updatedAt, id, birdName, studID, newStudID, leftRingID, rightRingID, sex, isBreeder, status, layDate, hatchDate, incubationDays, fledgeDate, releasedWhen, groupName, motherName, fatherName, secondFatherName, motherStudID, fatherStudID, secondFatherStudID, researcherNotes, createdBy, editedBy, laidWhere, hatchedWhere, fledgedWhere, releasedWhere) 
VALUES (1546884006,1543047022,1,'byran','262988','39lgf4','violet, green: stripe','green: solid','unknown','unknown','alive',1536928299,1488844800,18,1546288320,1552651158,'sierra','veronika','cullin',NULL,'04xpj8','66enj6',NULL,'morbi non lectus. aliquam sit amet diam in magna bibendum imperdiet.',3,3,1,2,3,4),
(1546549597,0,2,'cullin','089424','66enj6','puce: solid','fuscia: solid','male','no','alive',1538356406,1545935950,8,1545994846,1550864979,NULL,'reyna','byran',NULL,'528170','39lgf4',NULL,'praesent id massa id nisl venenatis lacinia. aenean sit amet justo.',3,NULL,9,5,4,6),
(1546875810,0,3,'tandi','985254','64oel3','pink, green: stripe','mauv: solid','female','yes','alive',1537740296,1545527581,13,1545840701,1551201785,'sierra','reyna','byran',NULL,'528170','39lgf4',NULL,'curabitur in libero ut massa volutpat convallis. morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',3,NULL,5,2,4,1),
(1546748576,0,4,'bronson','574443','53vnx3','puce: solid','khaki: solid','male','yes','missing',1539832783,1545360095,12,1545935715,1550259276,NULL,'reyna','byran',NULL,'528170','39lgf4',NULL,'curabitur at ipsum ac tellus semper interdum. mauris ullamcorper purus sit amet nulla.',4,NULL,1,1,1,1),
(1546769095,0,5,'winna','895986','89hux8','aquamarine, green: stripe','indigo, green: stripe','unknown','unknown','alive',1534602371,1546017945,17,1545655651,1551446768,'hotel','reyna','byran',NULL,'528170','39lgf4',NULL,'donec vitae nisi. nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',4,NULL,1,3,1,3),
(1546440052,1538543956,6,'jerrylee','038351','10rlo3','green, cyan: stripe','orange: solid','female','yes','alive',1536316679,1547301603,17,1547277178,1549504240,'hotel','reyna','byran',NULL,'528170','39lgf4',NULL,'cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. in blandit ultrices enim.',4,4,1,3,1,3),
(1546328243,0,7,'dale','317794','32tfk6','maroon, green: stripe','crimson, green: stripe','unknown','unknown','missing',1533508915,1545564991,18,1547765290,1551051108,'india','reyna','cullin',NULL,'528170','66enj6',NULL,'nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. fusce posuere felis sed lacus.',4,NULL,1,3,1,3),
(1546634488,0,8,'spike','605357','36ytp0','fuscia, green: stripe','orange, green: stripe','male','yes','missing',1537104367,1546426518,5,1547129144,1552867557,'india','reyna','cullin',NULL,'528170','66enj6',NULL,'nulla tempus. vivamus in felis eu sapien cursus vestibulum.',6,NULL,6,6,6,3),
(1546709923,0,9,'stevena','723168','95org4','turquoise: solid','khaki: solid','female','yes','missing',1533910954,1547614208,6,1545181610,1550151309,NULL,'reyna','shepherd',NULL,'528170','78gyd7',NULL,'morbi a ipsum. integer a nibh.',6,NULL,10,6,10,3),(1546408415,0,10,'mayer','672533','64ijl8','fuscia, green: stripe','crimson, green: stripe','male','yes','missing',1533908340,1546715082,7,1546845493,1552107923,NULL,'reyna','byran',NULL,'528170','39lgf4',NULL,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; mauris viverra diam vitae quam. suspendisse potenti.',3,NULL,10,6,10,3),
(1546471933,0,11,'veronika','476384','04xpj8','mauv, green: stripe','teal: solid','female','yes','missing',1535105378,1547824692,14,1547529956,1551337788,NULL,'reyna','byran','cullin','528170','39lgf4','66enj6','fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. aliquam erat volutpat.',3,NULL,10,6,10,3),
(1546870995,0,12,'de','810303','79nlz9','green, cyan: stripe','green, cyan: stripe','unknown','unknown','missing',1533871529,1547132354,14,1545720157,1550562084,NULL,'reyna','byran',NULL,'528170','39lgf4',NULL,'quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. nunc purus.',3,NULL,10,7,10,3),
(1546767191,0,13,'giusto','331745','47zgh6','crimson, green: stripe','yellow, green: stripe','male','no','missing',1537135033,1545429218,9,1546064623,1551368727,'echo','elli','shepherd',NULL,'41do3','78gyd7',NULL,'fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. aliquam erat volutpat.',6,NULL,10,7,10,7),
(1546592603,0,14,'glad','681453','67yrv7','purple: solid','indigo: solid','female','yes','missing',1539481536,1546481120,5,1545523846,1553544985,'echo','kathe','byran',NULL,'28fvt4','39lgf4',NULL,'phasellus in felis. donec semper sapien a libero.',4,NULL,10,7,10,7),
(1546426728,0,15,'ardra','004459','18imw3','teal: solid','crimson, cyan: stripe','female','yes','missing',1537657338,1546620062,9,1545200916,1550598965,NULL,'veronika','byran',NULL,'04xpj8','39lgf4',NULL,'morbi ut odio. cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',4,NULL,10,7,NULL,7),
(1546741870,0,16,'marje','730641','16dck3','orange, cyan: stripe','blue: solid','female','no','missing',1534636618,1547232693,6,1545817313,1550208617,NULL,'reyna','cullin',NULL,'528170','66enj6',NULL,'aliquam erat volutpat. in congue.',3,NULL,NULL,7,NULL,7),
(1546480166,0,17,'coretta','313997','29ptp0','yellow, cyan: stripe','fuscia: solid','female','no','missing',1534421362,1546611228,19,1546380976,1549159408,NULL,'reyna','cullin',NULL,'528170','66enj6',NULL,'praesent blandit lacinia erat. vestibulum sed magna at nunc commodo placerat.',4,NULL,NULL,NULL,NULL,7),
(1546344808,0,18,'chev','027587','18lic9','purple: solid','puce, cyan: stripe','male','yes','missing',1539570748,1546392247,17,1545646512,1551328225,NULL,'reyna','byran',NULL,'528170','39lgf4',NULL,'mauris lacinia sapien quis libero. nullam sit amet turpis elementum ligula vehicula consequat.',3,NULL,NULL,1,NULL,7),(1546461694,0,19,'mariquilla','656317','64lez0','orange, cyan: stripe','green: solid','female','no','alive',1534750994,1546487502,12,1546242338,1551015581,'lima','kathe','byran',NULL,'28fvt4','39lgf4',NULL,'integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. morbi porttitor lorem id ligula.',4,NULL,NULL,1,NULL,7),
(1546866379,0,20,'elli','874850','41vdo3','goldenrod, cyan: stripe','teal: solid','female','no','alive',1540210646,1545237587,9,1546686003,1553014766,'lima','kathe','jerrylee','byran','28fvt4','10rlo3','39lgf4','duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. donec dapibus.',3,NULL,NULL,1,NULL,7),
(1546630731,0,21,'noah','849384','40nud2','mauv: solid','purple: solid','male','no','alive',1533314666,1547642652,8,1547666501,1551333259,NULL,'kathe','shepherd',NULL,'28fvt4','78gyd7',NULL,'cras in purus eu magna vulputate luctus. cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',4,NULL,NULL,1,NULL,7),
(1546454834,0,22,'reyna','528170','','turquoise, cyan: stripe','indigo: solid','unknown','unknown','alive',1539295156,1547757558,9,1546805200,1551840092,'lima','kathe','byran',NULL,'28fvt4','39lgf4',NULL,'fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. suspendisse potenti.',4,NULL,NULL,1,NULL,7),(1546621812,0,23,'shepherd','691869','78gyd7','red: solid','purple: solid','male','no','alive',1537376553,1546482743,9,1547552668,1553602927,'shield','veronika','byran',NULL,'04xpj8','39lgf4',NULL,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; mauris viverra diam vitae quam. suspendisse potenti.',3,NULL,9,1,NULL,7),
(1546557471,0,24,'putnam','540546','51vtv8','indigo, cyan: stripe','khaki: solid','unknown','unknown','alive',1540447189,1546768555,6,1546759267,1550640345,'shield','reyna','cullin',NULL,'528170','66enj6',NULL,'morbi quis tortor id nulla ultrices aliquet. maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',4,NULL,9,1,NULL,7),
(1546728796,0,25,'dani','597383','96vkf7','red, cyan: stripe','pink, cyan: stripe','male','yes','alive',1537517291,1547800133,19,1545728323,1553702214,NULL,'reyna','cullin',NULL,'528170','66enj6',NULL,'vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. aenean lectus.',4,NULL,9,1,NULL,7),
(1546639965,1530283082,26,'kathe','728504','28fvt4','green: solid','violet, cyan: stripe','unknown','unknown','alive',1539758601,1546214629,5,1547562216,1551723612,'shield','reyna','shepherd',NULL,'528170','78gyd7',NULL,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; nulla dapibus dolor vel est. donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',3,6,9,1,NULL,6),
(1546754531,1533010778,27,'dehlia','499013','43eff3','pink: solid','turquoise: solid','unknown','unknown','alive',1533908375,1547788299,8,1547212435,1551194939,'shield','veronika','byran',NULL,'04xpj8','39lgf4',NULL,'phasellus sit amet erat. nulla tempus.',3,6,9,1,NULL,6),
(1546596697,1530283082,28,'johan','851955','18jyh5','mauv: solid','yellow, cyan: stripe','male','no','alive',1534269370,1545841784,9,1546129722,1553205006,NULL,'reyna','cullin',NULL,'528170','66enj6',NULL,'etiam faucibus cursus urna. ut tellus.',4,6,9,5,NULL,6),
(1546429854,0,29,'gennie','281204','48squ2','orange: solid','maroon, cyan: stripe','female','yes','alive',1538784581,1546596377,17,1546304620,1549220822,NULL,'reyna','cullin',NULL,'528170','66enj6',NULL,'donec posuere metus vitae ipsum. aliquam non mauris.',4,NULL,9,5,NULL,6),
(1546464009,0,30,'teressa','203876','16oka2','green, cyan: stripe','aquamarine: solid','female','no','alive',1534002219,1545871340,6,1545462003,1553068143,NULL,'veronika','byran',NULL,'04xpj8','39lgf4',NULL,'integer non velit. donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',6,NULL,9,5,4,6);


INSERT INTO rfidtag (createdAt, updatedAt, nfcRFID, nfcRFIDInternal, colour, birdID, createdBy) VALUES 
(1486425600,0,'yw721', '585a0971f66fcf', 'yellow, red : stripe', null, 1),
(1486425600,0,'fq546', '585a0971f56fcf', 'green, red : stripe', null, 2),
(1486425600,0,'yv156', '585a0971f662cf', 'blue : solid', null, 3),
(1486425600,0,'dx752', '585a0971f66fcc', 'green, red : stripe', null, 4),
(1486425600,0,'ay656', '585a0971f66faf', 'green, yellow : stripe', null, 6),
(1486425600,0,'rl905', '585a0971f66fcd', 'green, red : stripe', null, 6),
(1486425600,0,'lt613', '585a0971f66fce', 'green : solid', null, 1),
(1486425600,0,'gs552', '585a0971f66fca', 'blue, red : stripe', null, 2),
(1486425600,0,'in108', '585a0971f34fc0', 'green, red : stripe', null, 3),
(1486425600,0,'bl107', '585a0971f66fc9', 'yellow, red : stripe', null, 4),
(1486425600,0,'yd856', '585a0971f66fc8', 'cyan, red : stripe', 1, 5),
(1486425600,0,'ju409', '585a0971f66fc7', 'green, red : stripe', 2, 6),
(1486425600,0,'qh729', '585a0971f66fc6', 'green, red : stripe', 3, 1),
(1486425600,0,'gg486', '585a0971f66fc5', 'blue, red : stripe', 4, 2),
(1486425600,0,'dm702', '585a0971f66fc4', 'yellow : solid', 5, 2),
(1486425600,0,'ch536', '585a0971f66fc3', 'green, yellow : stripe', 6, 3),
(1486425600,0,'sx185', '585a0971f66fc2', 'green, red : stripe', 7, 1),
(1486425600,0,'em283', '585a0971f66fc1', 'green, yellow : stripe', 8, 1),
(1486425600,0,'qy367', '585a0971f66fc0', 'yellow, red : stripe', 9, 2),
(1486425600,0,'kv808', '585a0971066fca', 'green, red : stripe', 10, 3),
(1486425600,0,'ba104', '58534971f66faa', 'blue, red : stripe', 11, 4),
(1486425600,0,'dp550', '58534971f66fbb', 'green, red : stripe', 12, 5),
(1486425600,0,'ah714', '03e70000000688', 'green, red : stripe', 13, 1),
(1486425600,0,'vc268', 'a1223344556677', 'green, cyan : stripe', 14, 2),
(1486425600,0,'tb066', '1a223344556677', 'green, red : stripe', 15, 3),
(1486425600,0,'gr418', '11a23344556677', 'green, blue : stripe', 16, 4),
(1486425600,0,'fr595', '112a3344556677', 'green, red : stripe', 17, 5),
(1486425600,0,'yz771', '1122a344556677', 'green, red : stripe', 18, 1),
(1486425600,0,'ji217', '11223a44556677', 'green, red : stripe', 19, 2),
(1486425600,0,'gy457', '112233a4556677', 'blue : solid', 20, 3),
(1486425600,0,'jj386', '1122334a556677', 'green, red : stripe', 21, 4),
(1486425600,0,'eo856', '11223344a56677', 'green, red : stripe', 22, 5),
(1486425600,0,'wq188', '112233445a6677', 'green, red : stripe', 23, 1),
(1486425600,0,'gy147', '1122334455a677', 'green, red : stripe', 24,6),
(1486425600,0,'sz450', '11223344556a77', 'blue, red : stripe', 25,3),
(1486425600,0,'yu552', '112233445566a7', 'green, red : stripe', 26,1),
(1486425600,0,'wv281', '1122334455667a', 'green, red : stripe', 27,1),
(1486425600,0,'ph629', 'b1223344556677', 'green, red : stripe', 28, 2),
(1486425600,0,'jt522', '1b223344556677', 'cyan, red : stripe', 29, 6),
(1486425600,0,'yu015', '11b23344556677', 'green, red : stripe', 30, 3),
(1486425600,0,'kz416', '112b3344556677', 'green, red : stripe', null, 5),
(1486425600,0,'zn211', '1122b344556677', 'green, blue : stripe', null, 1),
(1486425600,0,'tl851', '11223b44556677', 'green, red : stripe', null, 4),
(1486425600,0,'yz492', '112233b4556677', 'green, red : stripe', null, 6),
(1486425600,0,'xe709', '1122334b556677', 'blue, red : stripe', null, 2),
(1486425600,0,'pf924', '11223344b56677', 'green, red : stripe', null, 1),
(1486425600,0,'bu764', '112233445b6677', 'green, red : stripe', null, 1),
(1486425600,0,'cj570', '1122334455b677', 'green : solid', null, 2),
(1486425600,0,'sj693', '11223344556b77', 'green, red : stripe', null, 3),
(1486425600,0,'ya514', '112233445566b7', 'green : solid', null, 5),
(1486425600,0,'ex484', '1122334455667b', 'green, red : stripe', null, 2),
(1486425600,0,'dm970', 'c1223344556677', 'cyan, red : stripe', null, 4),
(1486425600,0,'cu142', '1c223344556677', 'green, red : stripe', null, 4),
(1486425600,0,'vr560', '11c23344556677', 'green, blue : stripe', null, 1),
(1486425600,0,'st489', '112c3344556677', 'green, red : stripe', null, 2),
(1486425600,0,'je858', '1122c344556677', 'cyan : solid', null, 3),
(1486425600,0,'cg767', '11223c44556677', 'green, cyan : stripe', null, 3),
(1486425600,0,'tb223', '112233c4556677', 'green, red : stripe', null, 3),
(1486425600,0,'eu529', '1122334c556677', 'blue, red : stripe', null, 1),
(1486425600,0,'nq323', '11223344c56677', 'green, red : stripe', null, 2);

INSERT INTO visit (createdAt, id, birdID, nfcRFID) VALUES 
(UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')), 1, 1,'yd856'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:45:00')), 3, 1,'yd856'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:06:00')), 2, 1,'yd856'),
(UNIX_TIMESTAMP(concat(curdate(), ' 07:12:00')), 5, 1,'yd856'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')), 6, 1,'yd856'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:45:00')), 8, 2,'ju409'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:06:00')), 4, 2,'ju409'),
(UNIX_TIMESTAMP(concat(curdate(), ' 03:12:00')), 7, 2,'ju409'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')), 9, 2,'ju409'),
(UNIX_TIMESTAMP(concat(curdate(), ' 04:45:00')), 10,2,'ju409'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:06:00')), 11, 3,'qh729'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:12:00')), 12, 4,'gg486'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:30:00')), 13, 5,'ah714'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:45:00')), 14, 6,'ch536'),
(UNIX_TIMESTAMP(concat(curdate(), ' 07:06:00')), 15, 7,'sx185'),
(UNIX_TIMESTAMP(concat(curdate(), ' 07:12:00')), 16, 8,'em283'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')), 17, 9,'qy367'),
(UNIX_TIMESTAMP(concat(curdate(), ' 03:45:00')), 18, 10,'kv808'),
(UNIX_TIMESTAMP(concat(curdate(), ' 03:06:00')), 19, 11,'ba104'),
(UNIX_TIMESTAMP(concat(curdate(), ' 04:12:00')), 20, 12,'dp550'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')), 21, 13,'ah714'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:45:00')), 22, 14,'vc268'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:06:00')), 23, 15,'tb066'),
(UNIX_TIMESTAMP(concat(curdate(), ' 08:12:00')), 24, 16,'gr418'),
(UNIX_TIMESTAMP(concat(curdate(), ' 08:30:00')), 25, 17,'fr595'),
(UNIX_TIMESTAMP(concat(curdate(), ' 08:30:00')), 31, null,'ah714'),
(UNIX_TIMESTAMP(concat(curdate(), ' 07:45:00')), 26, 18,'yz771'),
(UNIX_TIMESTAMP(concat(curdate(), ' 06:06:00')), 27, 19,'ji217'),
(UNIX_TIMESTAMP(concat(curdate(), ' 05:12:00')), 28, 20,'gy457'),
(UNIX_TIMESTAMP(concat(curdate(), ' 04:30:00')), 29, 21,'jj386'),
(UNIX_TIMESTAMP(concat(curdate(), ' 03:45:00')), 30, 22,'eo856');

INSERT INTO nestsite
(nestID, nestDescription, distanceToHoppersKm, latitude, longitude, createdBy, editedBy) VALUES
('novigrad','The capital of the forest, the cradle of culture',1.23,-20.348404,57.552151,3,null),
('whiterun','Lies in the heart of the forest, its central located position making it into an important target in the on-going civil war.',0.5,-27.348404,57.552151,6,3),
('oxenfurt','Located on the northern shore of the Pontar river and southeast of Novigrad.',0.11,-21.348404,57.552151,3,null),
('solitude','Located on the eastern coast of a peninsula in Haafingar',0.36,-28.348404,53.552151,6,null),
('temeria','The strongest of the Northern Nestsites',3.14,-22.348404,-14.552151,3,null),
('vizima','Was built on the foundations of an elven nest',2.5,-26.348404,58.552151,4,null),
('kronos','A turbulent atmosphere and extremes of both warm and frigid weather.',12,-23.348404,52.552151,3,6),
('riverwood','Built on the eastern bank of the White River',2,21.348404,51.552151,4,null),
('kaer morhen','The last remaining stronghold of some very powerful birds, rumoured to have eyes similar to cats.',1,-24.348404,57.552151,3,null);

INSERT INTO user 
(id,username,fullName,password,hasRead,hasCreateEdit,hasEditFull,hasExport,hasAdmin, isSuperAdmin, createdAt, updatedAt) VALUES
(1,'superadmin','Roman Superadmin','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,1,0,1,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00'))),
(2,'reader','John Reader','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,0,0,0,0,0,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00'))),
(3,'creator','Bayley Creator','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,0,0,0,0,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00'))),
(4,'editor','Seth Editior','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,0,0,0,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00'))),
(5,'exporter','Alexa Exporter','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,0,0,1,0,0,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00'))),
(6,'admin','Vince Admin','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,1,1,0,UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')),UNIX_TIMESTAMP(concat(curdate(), ' 05:30:00')));

INSERT INTO birdnest 
(id,dateEntered,dateLeft,birdID,nestID) VALUES
(1,1536908299,1536921299,1,1),
(2,1536918299,null,1,1),
(3,1536928299,null,2,3),
(4,1536938299,null,3,3),
(5,1536948299,1536922299,4,5),
(6,1536958299,null,6,6),
(7,1536968299,1536923299,7,7),
(8,1536978299,null,9,8),
(9,1536988299,null,2,9),
(10,1536928299,1536924299,3,2);


INSERT INTO birdcondition 
(createdAt,updatedAt,id,birdCondition,birdID,dateNoted) VALUES
(1549094046,1550275200,1,'Broken Right Wing, claiming bridifits.',4,1536328299),
(1549094046,0,2,'Seems to be possessed with the sprit of the ghost rider.',15,1536528299),
(1549097646,1550275200,3,'all good.',1,1536921299),
(1549097646,0,4,'wearing an eyepatch.',1,1532548299),
(1549097646,0,5,'bit a researcher, it was funny.',4,1536921444),
(1549097646,0,6,'second toe on left foot appears injured.',15,1536228299),
(1549529646,1550275200,7,'had a fight with a pigeon, the pigeon did not survive. this bird is now know as the punisher amoung it\'s peers.',15,1536921339),
(1549238400,0,8,'has a bit of a drinking problem.',18,1536928144),
(1549529646,0,9,'been eating a lot of seeds, struggling to fly. Suggesting a membership to PureGym.',18,1536108299),
(1549875246,1550275200,10,'Much Health. Such Wow.',18,1536920299),
(1549529646,0,11,'thinks it is a dog, keeps fetching sticks.',18,1536920000),
(1549875246,0,12,'upon further inspection it might actually be pregnant.',4,1536910399);

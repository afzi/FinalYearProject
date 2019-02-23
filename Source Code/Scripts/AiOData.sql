/*Deletes All Data currently in tables*/
TRUNCATE TABLE birdcondition;
TRUNCATE TABLE birdnest;
TRUNCATE TABLE user;
TRUNCATE TABLE nestsite;
TRUNCATE TABLE visit;
TRUNCATE TABLE rfidtag;
TRUNCATE TABLE bird;

/*Populates all the above tables with designed testing data*/

TRUNCATE TABLE bird;
INSERT INTO bird 
(createdAt, updatedAt, id, birdName, studID, newStudID, leftRingID, rightRingID, sex, isBreeder, status, layDate, hatchDate, incubationDays, fledgeDate, releasedWhen, groupName, motherName, fatherName, secondFatherName, researcherNotes, createdBy, editedBy, laidWhere, hatchedWhere, fledgedWhere, releasedWhere) VALUES 
(1546884006,1543047022,1,'bryan','262988','39lgf4','violet, green: stripe','green: solid','unknown','unknown','alive',1536928299,1546748413,18,1546288320,1552651158,'sierra','veronika','cullin',NULL,'morbi non lectus. aliquam sit amet diam in magna bibendum imperdiet.',3,3,1,2,3,4),
(1546549597,0,2,'cullin','089424','66enj6','puce: solid','fuscia: solid','male','no','alive',1538356406,1545935950,8,1545994846,1550864979,NULL,'reyna','byran',NULL,'praesent id massa id nisl venenatis lacinia. aenean sit amet justo.',3,NULL,9,5,4,6),
(1546875810,0,3,'tandi','985254','64oel3','pink, green: stripe','mauv: solid','female','yes','alive',1537740296,1545527581,13,1545840701,1551201785,'sierra','reyna','byran',NULL,'curabitur in libero ut massa volutpat convallis. morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',3,NULL,5,2,4,1),
(1546748576,0,4,'bronson','574443','53vnx3','puce: solid','khaki: solid','male','yes','missing',1539832783,1545360095,12,1545935715,1550259276,NULL,'reyna','byran',NULL,'curabitur at ipsum ac tellus semper interdum. mauris ullamcorper purus sit amet nulla.',4,NULL,1,1,1,1),
(1546769095,0,5,'winna','895986','89hux8','aquamarine, green: stripe','indigo, green: stripe','unknown','unknown','alive',1534602371,1546017945,17,1545655651,1551446768,'hotel','reyna','byran',NULL,'donec vitae nisi. nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',4,NULL,1,3,1,3),
(1546440052,1538543956,6,'jerrylee','038351','10rlo3','green, cyan: stripe','orange: solid','female','yes','alive',1536316679,1547301603,17,1547277178,1549504240,'hotel','reyna','byran',NULL,'cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. in blandit ultrices enim.',4,4,1,3,1,3),
(1546328243,0,7,'dale','317794','32tfk6','maroon, green: stripe','crimson, green: stripe','unknown','unknown','missing',1533508915,1545564991,18,1547765290,1551051108,'india','reyna','cullin',NULL,'nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. fusce posuere felis sed lacus.',4,NULL,1,3,1,3),
(1546634488,0,8,'spike','605357','36ytp0','fuscia, green: stripe','orange, green: stripe','male','yes','missing',1537104367,1546426518,5,1547129144,1552867557,'india','reyna','cullin',NULL,'nulla tempus. vivamus in felis eu sapien cursus vestibulum.',6,NULL,6,6,6,3),
(1546709923,0,9,'stevena','723168','95org4','turquoise: solid','khaki: solid','female','yes','missing',1533910954,1547614208,6,1545181610,1550151309,NULL,'reyna','shepherd',NULL,'morbi a ipsum. integer a nibh.',6,NULL,10,6,10,3),
(1546408415,0,10,'mayer','672533','64ijl8','fuscia, green: stripe','crimson, green: stripe','male','yes','missing',1533908340,1546715082,7,1546845493,1552107923,NULL,'reyna','byran',NULL,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; mauris viverra diam vitae quam. suspendisse potenti.',3,NULL,10,6,10,3),
(1546471933,0,11,'veronika','476384','04xpj8','mauv, green: stripe','teal: solid','female','yes','missing',1535105378,1547824692,14,1547529956,1551337788,NULL,'reyna','byran','cullin','fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. aliquam erat volutpat.',3,NULL,10,6,10,3),
(1546870995,0,12,'de','810303','79nlz9','green, cyan: stripe','green, cyan: stripe','unknown','unknown','missing',1533871529,1547132354,14,1545720157,1550562084,NULL,'reyna','byran',NULL,'quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. nunc purus.',3,NULL,10,7,10,3),
(1546767191,0,13,'giusto','331745','47zgh6','crimson, green: stripe','yellow, green: stripe','male','no','missing',1537135033,1545429218,9,1546064623,1551368727,'echo','elli','shepherd',NULL,'fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. aliquam erat volutpat.',6,NULL,10,7,10,7),
(1546592603,0,14,'glad','681453','67yrv7','purple: solid','indigo: solid','female','yes','missing',1539481536,1546481120,5,1545523846,1553544985,'echo','kathe','byran',NULL,'phasellus in felis. donec semper sapien a libero.',4,NULL,10,7,10,7),
(1546426728,0,15,'ardra','004459','18imw3','teal: solid','crimson, cyan: stripe','female','yes','missing',1537657338,1546620062,9,1545200916,1550598965,NULL,'veronika','byran',NULL,'morbi ut odio. cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',4,NULL,10,7,NULL,7),
(1546741870,0,16,'marje','730641','16dck3','orange, cyan: stripe','blue: solid','female','no','missing',1534636618,1547232693,6,1545817313,1550208617,NULL,'reyna','cullin',NULL,'aliquam erat volutpat. in congue.',3,NULL,NULL,7,NULL,7),
(1546480166,0,17,'coretta','313997','29ptp0','yellow, cyan: stripe','fuscia: solid','female','no','missing',1534421362,1546611228,19,1546380976,1549159408,NULL,'reyna','cullin',NULL,'praesent blandit lacinia erat. vestibulum sed magna at nunc commodo placerat.',4,NULL,NULL,NULL,NULL,7),
(1546344808,0,18,'chev','027587','18lic9','purple: solid','puce, cyan: stripe','male','yes','missing',1539570748,1546392247,17,1545646512,1551328225,NULL,'reyna','byran',NULL,'mauris lacinia sapien quis libero. nullam sit amet turpis elementum ligula vehicula consequat.',3,NULL,NULL,1,NULL,7),
(1546461694,0,19,'mariquilla','656317','64lez0','orange, cyan: stripe','green: solid','female','no','alive',1534750994,1546487502,12,1546242338,1551015581,'lima','kathe','byran',NULL,'integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. morbi porttitor lorem id ligula.',4,NULL,NULL,1,NULL,7),
(1546866379,0,20,'elli','874850','41vdo3','goldenrod, cyan: stripe','teal: solid','female','no','alive',1540210646,1545237587,9,1546686003,1553014766,'lima','kathe','jerrylee','byran','duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. donec dapibus.',3,NULL,NULL,1,NULL,7),
(1546630731,0,21,'noah','849384','40nud2','mauv: solid','purple: solid','male','no','alive',1533314666,1547642652,8,1547666501,1551333259,NULL,'kathe','shepherd',NULL,'cras in purus eu magna vulputate luctus. cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',4,NULL,NULL,1,NULL,7),
(1546454834,0,22,'reyna','528170','83dwi1','turquoise, cyan: stripe','indigo: solid','unknown','unknown','alive',1539295156,1547757558,9,1546805200,1551840092,'lima','reyna','byran',NULL,'fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. suspendisse potenti.',4,NULL,NULL,1,NULL,7),
(1546621812,0,23,'shepherd','691869','78gyd7','red: solid','purple: solid','male','no','alive',1537376553,1546482743,9,1547552668,1553602927,'shield','veronika','byran',NULL,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; mauris viverra diam vitae quam. suspendisse potenti.',3,NULL,9,1,NULL,7),
(1546557471,0,24,'putnam','540546','51vtv8','indigo, cyan: stripe','khaki: solid','unknown','unknown','alive',1540447189,1546768555,6,1546759267,1550640345,'shield','reyna','cullin',NULL,'morbi quis tortor id nulla ultrices aliquet. maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',4,NULL,9,1,NULL,7),
(1546728796,0,25,'dani','597383','96vkf7','red, cyan: stripe','pink, cyan: stripe','male','yes','alive',1537517291,1547800133,19,1545728323,1553702214,NULL,'reyna','cullin',NULL,'vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. aenean lectus.',4,NULL,9,1,NULL,7),
(1546639965,1530283082,26,'kathe','728504','28fvt4','green: solid','violet, cyan: stripe','unknown','unknown','alive',1539758601,1546214629,5,1547562216,1551723612,'shield','reyna','shepherd',NULL,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; nulla dapibus dolor vel est. donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',3,6,9,1,NULL,6),
(1546754531,1533010778,27,'dehlia','499013','43eff3','pink: solid','turquoise: solid','unknown','unknown','alive',1533908375,1547788299,8,1547212435,1551194939,'shield','veronika','byran',NULL,'phasellus sit amet erat. nulla tempus.',3,6,9,1,NULL,6),
(1546596697,1530283082,28,'johan','851955','18jyh5','mauv: solid','yellow, cyan: stripe','male','no','alive',1534269370,1545841784,9,1546129722,1553205006,NULL,'reyna','cullin',NULL,'etiam faucibus cursus urna. ut tellus.',NULL,6,9,5,NULL,6),
(1546429854,0,29,'gennie','281204','48squ2','orange: solid','maroon, cyan: stripe','female','yes','alive',1538784581,1546596377,17,1546304620,1549220822,NULL,'reyna','cullin',NULL,'donec posuere metus vitae ipsum. aliquam non mauris.',4,NULL,9,5,NULL,6),
(1546464009,0,30,'teressa','203876','16oka2','green, cyan: stripe','aquamarine: solid','female','no','alive',1534002219,1545871340,6,1545462003,1553068143,NULL,'veronika','byran',NULL,'integer non velit. donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',6,NULL,9,5,4,6);

INSERT INTO rfidtag (createdAt, updatedAt, nfcRFID, nfcRFIDInternal, colour, birdID) VALUES 
(1486425600,0,'yw721', '0ddcbc36-85c6-4e2f-b0ff-254b81e63885', 'yellow, red : stripe', null),
(1486425600,0,'fq546', '6b875dfa-058e-43f6-aab3-90f05f2d4e4c', 'green, red : stripe', null),
(1486425600,0,'yv156', 'c50684c4-1098-41ab-add0-ed3364b8d549', 'blue : solid', null),
(1486425600,0,'dx752', '621e1859-ec5c-45f9-9fca-b8d644b1d8f3', 'green, red : stripe', null),
(1486425600,0,'ay656', '211c3401-77d5-4a79-96f0-fb26e165f117', 'green, yellow : stripe', null),
(1486425600,0,'rl905', '4e7a840a-e7e5-432b-af28-bd5e3729593a', 'green, red : stripe', null),
(1486425600,0,'lt613', 'cd44021b-ad5b-44b4-818d-d27cef798f5b', 'green : solid', null),
(1486425600,0,'gs552', '8e1c3652-f93a-4744-8e9f-57cec2d128bd', 'blue, red : stripe', null),
(1486425600,0,'in108', '5a787a53-3bee-429c-90da-ea4a547aea1e', 'green, red : stripe', null),
(1486425600,0,'bl107', '3bd8294f-876e-4a34-9510-4078cbf6c2e2', 'yellow, red : stripe', null),
(1486425600,0,'yd856', '616f8ccc-51c5-4bc8-aa55-56f3a58ea507', 'cyan, red : stripe', 1),
(1486425600,0,'ju409', 'ff88f34b-c278-4d4d-898e-aff6489eee68', 'green, red : stripe', 2),
(1486425600,0,'qh729', 'db46cf3b-8450-43cd-bbc3-085dbff0100c', 'green, red : stripe', 3),
(1486425600,0,'gg486', '25798ba5-431c-40e9-b125-61a8d0d23e4b', 'blue, red : stripe', 4),
(1486425600,0,'dm702', '4ae1a9cd-da45-40f6-96f1-84abd846f235', 'yellow : solid', 5),
(1486425600,0,'ch536', 'a8da32f2-45c6-4aca-bf7c-c94d543d1d3f', 'green, yellow : stripe', 6),
(1486425600,0,'sx185', '531b84fd-a725-45f8-89a2-ae977699f1e6', 'green, red : stripe', 7),
(1486425600,0,'em283', '3d393d4f-5d1b-44e7-b007-8ba93d1f8057', 'green, yellow : stripe', 8),
(1486425600,0,'qy367', 'd64de149-7b26-4084-ac23-ff4a94d6af94', 'yellow, red : stripe', 9),
(1486425600,0,'kv808', '80d69413-be92-4245-84d1-1a17af7414ba', 'green, red : stripe', 10),
(1486425600,0,'ba104', '8630bbde-7273-46a3-8919-2cd5484552ad', 'blue, red : stripe', 11),
(1486425600,0,'dp550', '358403b2-47c5-4f20-b071-462f316e48ed', 'green, red : stripe', 12),
(1486425600,0,'ah714', '5f456152-069f-4b3c-90fb-81c29f5b2618', 'green, red : stripe', 13),
(1486425600,0,'vc268', '529bd19c-c425-4ad8-8f8e-a94b0e60979d', 'green, cyan : stripe', 14),
(1486425600,0,'tb066', '02e2ce0f-1605-484c-81e1-2d4471cf181b', 'green, red : stripe', 15),
(1486425600,0,'gr418', 'aef1910a-457d-4cde-bb04-c62cdfaeae4e', 'green, blue : stripe', 16),
(1486425600,0,'fr595', 'bd3a8a1a-8df6-4f78-956e-fdd2e10a2450', 'green, red : stripe', 17),
(1486425600,0,'yz771', 'd6c0ffc9-5297-45ab-961c-1ae7463498ef', 'green, red : stripe', 18),
(1486425600,0,'ji217', '7af8acc4-5183-4d42-bbd4-f42eddfe01a6', 'green, red : stripe', 19),
(1486425600,0,'gy457', 'c01cfef8-83d8-49f4-b546-a7bfcc669f99', 'blue : solid', 20),
(1486425600,0,'jj386', '4e227dba-6f98-40d6-9247-60720f214738', 'green, red : stripe', 21),
(1486425600,0,'eo856', 'c77b3c25-eff0-4f74-97cf-92e6c4f9eada', 'green, red : stripe', 22),
(1486425600,0,'wq188', 'f3b7403e-28ce-4455-b475-490cabc992ea', 'green, red : stripe', 23),
(1486425600,0,'gy147', 'ca1017d0-0ddb-45ae-9f60-41aa0be6b35c', 'green, red : stripe', 24),
(1486425600,0,'sz450', 'a249e11a-064d-469e-b7a7-c1c5443dbb6c', 'blue, red : stripe', 25),
(1486425600,0,'yu552', '617e69ab-a7f7-4d4b-9f0e-025d1732ed60', 'green, red : stripe', 26),
(1486425600,0,'wv281', 'a2545b6d-e6bc-410d-b51f-c211a63a9af1', 'green, red : stripe', 27),
(1486425600,0,'ph629', 'a254e659-4810-4b79-aaa6-7c2cd27878ea', 'green, red : stripe', 28),
(1486425600,0,'jt522', '209e2dab-9147-4366-8598-ab57871b6f3b', 'cyan, red : stripe', 29),
(1486425600,0,'yu015', '02c2ac96-9a5f-42e5-bed6-28ec55b08df7', 'green, red : stripe', 30),
(1486425600,0,'kz416', 'b7fc60c3-c9f6-4f2c-b900-c52649733275', 'green, red : stripe', null),
(1486425600,0,'zn211', '1fed1f5c-5d41-4874-8abf-bf0ad2770eb4', 'green, blue : stripe', null),
(1486425600,0,'tl851', '242e24fb-28d7-42d3-8f0b-84b4057a84c9', 'green, red : stripe', null),
(1486425600,0,'yz492', 'c59c3b22-0a1a-4e97-ba3f-37c49241bbb5', 'green, red : stripe', null),
(1486425600,0,'xe709', 'a40c1b84-63c5-4815-801e-132179608cb1', 'blue, red : stripe', null),
(1486425600,0,'pf924', '8de72df1-1ca0-450d-bdd6-4ae10edb54f1', 'green, red : stripe', null),
(1486425600,0,'bu764', 'ee4431fe-1fa2-455d-b0b7-bdce7066e58a', 'green, red : stripe', null),
(1486425600,0,'cj570', '02d10ce6-358f-4bcb-b127-389a41090ee4', 'green : solid', null),
(1486425600,0,'sj693', '227ef168-fe75-4ac2-a792-12b0dfb94ef2', 'green, red : stripe', null),
(1486425600,0,'ya514', '77a44c06-85f6-4ffe-8f74-14355bee6d84', 'green : solid', null),
(1486425600,0,'ex484', 'c323af20-f508-463f-acb6-6524743ef415', 'green, red : stripe', null),
(1486425600,0,'dm970', '59a47cc2-feba-4f82-bbe7-27d673a4e847', 'cyan, red : stripe', null),
(1486425600,0,'cu142', '43c5ad38-b448-42de-b2ba-11fe613bf97a', 'green, red : stripe', null),
(1486425600,0,'vr560', 'a2f7dc12-ce25-46df-bebd-af9a9cd23aa8', 'green, blue : stripe', null),
(1486425600,0,'st489', 'f9be7c8a-4cab-46a8-9dc3-e09dde78f0dc', 'green, red : stripe', null),
(1486425600,0,'je858', '35775a48-50d5-438b-a66c-2a76b6a896e5', 'cyan : solid', null),
(1486425600,0,'cg767', 'f4fc9623-97e0-44db-9569-51cc410c6c54', 'green, cyan : stripe', null),
(1486425600,0,'tb223', '15e59e63-dd48-4519-b2d0-4718468a265c', 'green, red : stripe', null),
(1486425600,0,'eu529', '25fd7bb4-2f4f-46fe-81ed-0906d294041b', 'blue, red : stripe', null),
(1486425600,0,'nq323', 'ae2fdb2e-fcd1-4e58-b0ae-ae09b12c3ce3', 'green, red : stripe', null);

INSERT INTO visit (createdAt, id, feederID, birdID, nfcRFID) VALUES 
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+100), 1, 'Avramovic', 2, '616f8ccc-51c5-4bc8-aa55-56f3a58ea507'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+100), 2, 'Samson', 3   , 'ff88f34b-c278-4d4d-898e-aff6489eee68'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+200), 3, 'Glisenan', 2 , 'db46cf3b-8450-43cd-bbc3-085dbff0100c'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+300), 4, 'Ollet', 26   , '25798ba5-431c-40e9-b125-61a8d0d23e4b'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+400), 5, 'Matovic', 3  , '4ae1a9cd-da45-40f6-96f1-84abd846f235'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+500), 6, 'Billyeald', 3, 'a8da32f2-45c6-4aca-bf7c-c94d543d1d3f'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+600), 7, 'Brixey', 18  , '531b84fd-a725-45f8-89a2-ae977699f1e6'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+700), 8, 'Petrovsky', 3, '3d393d4f-5d1b-44e7-b007-8ba93d1f8057'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+800), 9, 'Pardoe', 6   , 'd64de149-7b26-4084-ac23-ff4a94d6af94'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+900), 10, 'Maitland', 29,'80d69413-be92-4245-84d1-1a17af7414ba'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-100), 11, 'Kuller', 19 , '8630bbde-7273-46a3-8919-2cd5484552ad'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-200), 12, 'Reston', 19 , '358403b2-47c5-4f20-b071-462f316e48ed'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-300), 13, 'Beaty', 30  , '5f456152-069f-4b3c-90fb-81c29f5b2618'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-400), 14, 'Mucci', 12  , '529bd19c-c425-4ad8-8f8e-a94b0e60979d'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-500), 15, 'Annakin', 28, '02e2ce0f-1605-484c-81e1-2d4471cf181b'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-600), 16, 'Straine', 30, 'aef1910a-457d-4cde-bb04-c62cdfaeae4e'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-700), 17, 'Reyburn', 16, 'bd3a8a1a-8df6-4f78-956e-fdd2e10a2450'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-800), 18, 'Paute', 16  , 'd6c0ffc9-5297-45ab-961c-1ae7463498ef'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-900), 19, 'Breen', 24  , '7af8acc4-5183-4d42-bbd4-f42eddfe01a6'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+100), 20, 'Nother', 13 , 'c01cfef8-83d8-49f4-b546-a7bfcc669f99'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+200), 21, 'Caslane', 12, '4e227dba-6f98-40d6-9247-60720f214738'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+300), 22, 'Piser', 24  , 'c77b3c25-eff0-4f74-97cf-92e6c4f9eada'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+400), 23, 'Badman', 19 , 'f3b7403e-28ce-4455-b475-490cabc992ea'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+500), 24, 'Greg', 2    , 'ca1017d0-0ddb-45ae-9f60-41aa0be6b35c'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-300), 25, 'Gut', 25    , 'a249e11a-064d-469e-b7a7-c1c5443dbb6c'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-400), 26, 'Pittle', 17 , '617e69ab-a7f7-4d4b-9f0e-025d1732ed60'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-500), 27, 'Patten', 17 , 'a2545b6d-e6bc-410d-b51f-c211a63a9af1'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-600), 28, 'Mussetti', 9, 'a254e659-4810-4b79-aaa6-7c2cd27878ea'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()-700), 29, 'Brumbie', 25, '209e2dab-9147-4366-8598-ab57871b6f3b'),
(UNIX_TIMESTAMP(CURRENT_TIMESTAMP()+200), 30, 'Raspison', 2, '02c2ac96-9a5f-42e5-bed6-28ec55b08df7');

INSERT INTO nestsite 
(nestID, nestDescription, distanceToHoppersKm, latitude, longitude, createdBy, editedBy) VALUES
('novigrad','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendum rutrum.',1.23,-20.348404,57.552151,3,null),
('whiterun','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendum rutrum.',0.5,-27.348404,57.552151,6,3),
('oxenfurt','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendum rutrum.',0.11,-21.348404,57.552151,3,null),
('solitude','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendum rutrum.',0.36,-28.348404,53.552151,6,null),
('temeria','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendumm rutrum.',3.14,-22.348404,-14.552151,3,null),
('vizima','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentumm bibendumm rutrum.',2.5,-26.348404,58.552151,4,null),
('kronos','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendumm rutrumm.',12,-23.348404,52.552151,3,6),
('riverwood','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibendm rutrum.',2,21.348404,51.552151,4,null),
('kaer morhen','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum bibum rutrum.',1,-24.348404,57.552151,3,null);

INSERT INTO user 
(id,username,fullName,password,hasRead,hasCreateEdit,hasEditFull,hasExport,hasAdmin) VALUES
(1,'noprivs','Nia NoPrivs','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',0,0,0,0,0),
(2,'reader','John Reader','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,0,0,0,0),
(3,'creator','Bayley Creator','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,0,0,0),
(4,'editor','Seth Editior','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,0,0),
(5,'exporter','Alexa Exporter','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,0,0,1,0),
(6,'admin','Vince Admin','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,1,1);

INSERT INTO birdnest 
(id,dateEntered,dateLeft,birdID,nestID) VALUES
(1,'2019-01-17 00:00:00','2019-02-10 00:00:00',1,1),
(2,'2019-02-12 00:00:00',null,1,1),
(3,'2019-02-01 00:00:00',null,2,3),
(4,'2019-02-01 00:00:00',null,3,3),
(5,'2019-01-17 00:00:00','2019-02-10 00:00:00',4,5),
(6,'2019-01-17 00:00:00',null,6,6),
(7,'2019-01-17 00:00:00','2019-02-10 00:00:00',7,7),
(8,'2019-01-17 00:00:00',null,9,8),
(9,'2019-01-17 00:00:00',null,2,9),
(10,'2019-01-17 00:00:00','2019-01-31 00:00:00',3,2);


INSERT INTO birdcondition 
(createdAt,updatedAt,id,birdCondition,birdID,dateNoted) VALUES
(1549094046,1550275200,1,'Broken Right Wing, claiming bridifits.',3,'2019-01-13 00:00:00'),
(1549094046,0,2,'Seems to be possessed with the sprit of the ghost rider.',2,'2019-01-11 00:00:00'),
(1549097646,1550275200,3,'all good.',1,'2017-01-17 00:00:00'),
(1549097646,0,4,'wearing an eyepatch.',30,'2016-05-17 00:00:00'),
(1549097646,0,5,'bit a researcher, it was funny.',3,'2019-01-11 00:00:00'),
(1549097646,0,6,'second toe on left foot appears injured.',26,'2019-01-12 00:00:00'),
(1549529646,1550275200,7,'had a fight with a pigeon, the pigeon did not survive. this bird is now know as the punisher amoung it\'s peers.',12,'2019-01-14 00:00:00'),
(1549238400,0,8,'has a bit of a drinking problem.',11,'2019-01-19 00:00:00'),
(1549529646,0,9,'been eating a lot of seeds, struggling to fly. Suggesting a membership to PureGym.',11,'2019-01-10 00:00:00'),
(1549875246,1550275200,10,'Much Health. Such Wow.',4,'2019-02-17 00:00:00'),
(1549529646,0,11,'running out of ideas',6,'2015-01-17 00:00:00'),
(1549875246,0,12,'upon further inspection it might actually be pregnant.',11,'2011-01-17 00:00:00');

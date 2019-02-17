TRUNCATE TABLE user;
INSERT INTO user 
(id,username,fullName,password,hasRead,hasCreateEdit,hasEditFull,hasExport,hasAdmin) VALUES
(1,'noprivs','Nia NoPrivs','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',0,0,0,0,0),
(2,'reader','John Reader','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,0,0,0,0),
(3,'creator','Bayley Creator','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,0,0,0),
(4,'editor','Seth Editior','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,0,0),
(5,'exporter','Alexa Exporter','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,0,0,1,0),
(6,'admin','Vince Admin','$2a$10$6XAzUge1xnab3kDjOjb/LONHoFgZEV5wFJOmw8AgvClDIRMx8hrzK',1,1,1,1,1);
// All related sql 

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL,
  username char(32)  NOT NULL ,
  password char(32)  NOT NULL,
  email char(32)  NOT NULL, 
  UNIQUE (username) ,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE users
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

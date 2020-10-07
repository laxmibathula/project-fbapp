# project-fb
A basic facebook clone with form submit, login and user details.

## Getting started
Clone the repository and then run following command to install the packages.
``` 
npm install
```

## Environmental variables
Create .env file with the variables shown in **.env.example**
 ```
 PORT=8085
 DB_HOST=your-host
 DB_USERNAME=username
 DB_PASSWORD=db-password
 DB_NAME=databasename
 ```
 
 ### Create a table
```
CREATE  TABLE customers (

id int  NOT  NULL AUTO_INCREMENT PRIMARY  KEY,

name  VARCHAR(255),

address  VARCHAR(255),

Email VARCHAR(225),

password  VARCHAR(225)

);
```

## Run the server
``` 
npm start
```

### Now open the URL  http://localhost:8085/home




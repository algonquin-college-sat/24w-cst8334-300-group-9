# CST8334 Software Development Project
## Client

## Authors

## Description

## Prerequisites
Before getting started, ensure you have the following installed:

Node.js: [Node.js](https://nodejs.org/en/download/)
[SQL Server 2022 Developer](https://www.microsoft.com/en-us/sql-server/sql-server-downloads?ocid=ORSEARCH_Bing)
[SQL Server Mangement Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16#download-ssms)

Pull the project to your local machine, navigate to the backend dir using `cd backend`, run the following command to install neccessary packages:
```
npm i mssql msnodesqlv8 dotenv express cors

npm i -D nodemon
```
## Setting up the local environment (Still in development)
### Set up Environment Variables:

Under `backend` folder, create a .env file in the project root directory.
Add the following environment variables to the .env file:

```
DB_DATABASE=PRHDatabank
DB_SERVER=
DB_DRIVER=msnodesqlv8
DB_PORT=3000
```
Note: the `DB_SERVER` value should be your local machine's server name of SQL Server
To find server name, refer to this [link](https://stackoverflow.com/questions/16088151/how-to-find-server-name-of-sql-server-management-studio)

### Run the script
Connect to SQL Server using SQL Server Mangement Studio, inside the connection, execute the SQL script `PRHScripts.sql` located within the 'database' directory of the backend backend dir

## Running the application
Backend: 
```
cd backend
nodemon index.js
```

Frontend: 
```
cd frontend
npm start
```
or utilize `Go Live` VSCode extension

Note: You may need to install the http-server if you receive an error message when you run the npm start. This npm start script can be found on the package.json under scripts. You can install http-server using npm (Node.js package manager) by typing this on the terminal/console: *npm install -g http-server*. Once it is installed, ensure that you are in the right directory before running npm start. A browser should pop up after running the npm start script. 


## Future Recommendations


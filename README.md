# CST8334 Software Development Project
## Client

## Authors

## Description

## Prerequisites
Before running the application, ensure you have the following installed:

Node.js: [Node.js](https://nodejs.org/en/download/)

MySQL Server: [MySQL](https://dev.mysql.com/downloads/installer/)

## Setting up the local environment
### Set up Environment Variables:

Under `backend` folder, reate a .env file in the project root directory.
Add the following environment variables to the .env file:

```
DB_NAME=PRHDatabank
DB_SERVER=localhost

PORT=1433
```

## Running the application
Backend: `nodemon index.js`

Frontend: `npm start`  

Note: You may need to install the http-server if you receive an error message when you run the npm start. This npm start script can be found on the package.json under scripts. You can install http-server using npm (Node.js package manager) by typing this on the terminal/console: *npm install -g http-server*. Once it is installed, ensure that you are in the right directory before running npm start. A browser should pop up after running the npm start script. 


## Future Recommendations


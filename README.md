# CST8334 Software Development Project
## Client
Pembroke Regional Hospital (PRH)
## Authors
Byte Busters
## Description
### Purpose of the Project
PRH utilizes the Lean Daily Management System as a framework for Continuous Quality Improvement, 
and its departments use the “huddle-board” tool to organize their ideas and progress on making improvements.

The current virtual huddle-board was created within OneNote, but unfortunately only managers had access to the file. A workaround was created where ticket templates were saved as signature templates in Microsoft Outlook. Department members could download these templates and use them in emails sent to their managers to request a ticket be added or updated. Then during their virtual huddle meetings, the manager can share their screen to show the status of the huddle-board and make any changes that need to be made because 
of the discussions in that meeting.

**The creation of a proper virtual huddle-board** is required because some departments at PRH are not 
gathered at a single location and so a physical huddle-board cannot be used by the entire team. Unfortunately, the 
current virtual huddle-board system is held in a OneNote that is only accessible by managers. This means members 
of the department must submit ticket to their managers for their managers to add to the board, instead of simply 
adding it themselves. Similarly, whenever a ticket needs to be updated or moved, a manager must complete that 
task. It divorces the team members from the process and adds additional tasks to the workload of the managers.
### Users of the Project
The users of the new virtual huddle-board are the Department managers and members of the three 
departments that are currently using their unofficial virtual huddle-boards. All users should be able to create new 
tickets, move the tickets to various areas of the board, edit/update the contents of the ticket, archive the ticket upon 
completion, and view the whole board. Users of the board are not expected to have pre-existing knowledge of 
huddle-board process as that will be demonstrated to them at meetings. It is desired that the interface for the 
created virtual huddle-board be user-friendly and assume minimal technical skills. The ideal version of this project 
will be integrated into Microsoft Teams, however there is flexibility with the final implementation. Since the 
tickets are desired to be saved for future reference, there will need to be database connectivity.
## Prerequisites
Before getting started, ensure you have the following installed:

Node.js: [Node.js](https://nodejs.org/en/download/)

SQL Server: [SQL Server 2022 Developer](https://www.microsoft.com/en-us/sql-server/sql-server-downloads?ocid=ORSEARCH_Bing)

SQL Server GUI: [SQL Server Mangement Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16#download-ssms)

Pull the project to your local machine, navigate to the backend dir using `cd backend`, run the following command to install neccessary packages:
```
npm i mssql msnodesqlv8 dotenv express cors

npm i -D nodemon
```
## Setting up the local environment
### Set up Environment Variables:
Modify the following environment variables in the `.env` file under `backend` folder:

```
DB_DATABASE=PRHDatabank
DB_SERVER=
DB_DRIVER=msnodesqlv8
DB_PORT=3000
```
**NOTE**: the `DB_SERVER` value should be your local machine's server name of SQL Server

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

**NOTE**: You may need to install the http-server if you receive an error message when you run the npm start. This npm start script can be found on the package.json under scripts. You can install http-server using npm (Node.js package manager) by typing this on the terminal/console: *npm install -g http-server*. Once it is installed, ensure that you are in the right directory before running npm start. A browser should pop up after running the npm start script. 


## Future Recommendations


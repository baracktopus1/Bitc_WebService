# Bitc_WebService
Hello! This application was created as a test task for Genesis Software Engineering School.
Application was developed with node js.

This is Web service with API that allows you to send emails with current BTC|UAH rate to your mailing list. More info about documentation here https://github.com/AndriiPopovych/gses/blob/main/gses2swagger.yaml

## To make system running
To launch the application download all files from this repo. Install npm if it is not installed.

Then in terminal use "npm install" command to get all dependencies.

To run the application use "node app.js" command. After that application starts to listen on port 3000.

Application also could be run with Docker.

To do so use "docker build -t bitc" command to build an image

And then use  "docker run -p 3000:3000 bitc". In this case we expose local port 3000 to container and application will listen on 3000 port inside container.

## Functionality
GET /rate returns current BTC|UAH rate. Provided by open exchange rates API.

POST /subscribe has x-www-form-urlencoded content type with single field - email. Incoming email field is checked on format and uniqueness in local file system. 
Then, email will be stored inside file system.

POST /sendEmails gets rate from open exchange rates API and sends it by email to all stored mailboxes.

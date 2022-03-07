# HomeJamTask
## About The Project

#### Frameworks, tools and libraries used 

- Node Js - runtime environment
- Express - backend library
- Mongodb- dbms
- Mongoose- ORM library for mongodb 
- Nodemon- dev dependency for auto run incase of changes
- JsonWebToken- for authentication and authorization on the api routes 
- Dotenv- putting all your environmental variables in a .env file
- Chai and mocha - program testing. I did not have time to implement this.

### Getting started 
#### To get a local copy up and running follow these simple example steps
#### Installation

- Clone the repo
- npm install
- Your config file are alright, given that they have default values. The only setback is that you have to create a mongo db collection
- There will not be a problem If you have mongo db atlas installed. A collection would be created automatically by default. You can create a collection online via the mongodb -  atlas [Web site](https://cloud.mongodb.com/) if you don't have it installed.

### Map 
###### This would entail every file and it's uses 
- Index.js - the main js page. It imports everything's then runs the app. 
- Config- both config and db js inside the config are for configurations and secret variables like the port, mongoose connection, token functionalities.
- Requests.res - for testing the apis(install restcient extension on your vscode to make use of it )
- Middleware - containing the token passing, verifies if the user is an admin so as to give him the authorization to make api calls
- Api routes- this is where all the api endpoints are
- Model js- handling the mongoose schema. 
- Helper js- this contain the messageWrappers for validation and the calcoffset function for getting the iterable skips when getting the contacts
- Service- holds all the api functionalities. 
- test js - program testing 

### API routes
#### http://localhost:400/api/contact/add - post call to add user 
##### This will not be authorised as you have to add the admin user to the database first. Req.body should be like 
```javascript
{
  first_name, last_name, email, phone, country,
  isAdmin (default to false, change to true if it is admin), job_title, company_name, birthday_day, birthday_month
}
```
#### http://localhost:400/api/contact/bulk/add- post call to add bulk of contacts (authorised to admin only)

#### http://localhost:400/login - post call to get the authorization token. 
```javascript
  Request body - {"email": adminEmail}
```
#### GET http://localhost:400/api/contact/all -get all contacts. You can pass a pagination query or condition. Example
- http://localhost:400/api/contact/all?pageSize=3&pageNo=2&country=india is to get the 2nd page of 3 contacts with country field india. 
- By default pageSize is 3 and pageNo is 1.

#### Put http://localhost:400/api/contact/:id
- Authorized api to update a user contact by passing the id as a req params 

#### Delete http://localhost:400/api/contact/:id
- Authorized api to delete a user contact by passing the id as a req params

### N/B- You can test all apis with the requests.rest file after installing it to your vscode extension.

### Contact 
- Email- victorgbonna@gmail.com
- Whatsapp - +234 8102603301
- Linkedln - [https://www.linkedin.com/in/victor-ogbonna-5a3113230](https://www.linkedin.com/in/victor-ogbonna-5a3113230)
-  Project Link: https://github.com/victorgbonna/VouchDigitalTask


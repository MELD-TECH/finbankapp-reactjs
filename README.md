# Getting Started

# Overview
- This project is developed to show how authentication can be best handled between client and server. 
- This is a client application running on React JS
- Basic HTTP calls are made using axios and react-query libraries
- Basic Routing is achieved using React Router

# Prerequisites
Install Node JS on your local machine 
Refer to https://nodejs.org/en/ to install nodejs

Install create-react-app

Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```shell
npm install -g create-react-app
```

# Cloning and Running the Application in local
Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```shell
npm install
```

In order to run the application Type the following command

```shell
npm start
```

The Application Runs on localhost:3000

# Application design
Functional components
1. Login: This is the login menu for users
2. Logout: This is logout component
3. Register: This is the sign-up page
4. Change Password: This is the change password page

Other components will be added in the future

#### HTTP client
**axios** and **react query** libraries is used to make HTTP Calls

#### URL
The application has just one url /login which ties to *UserInfo*  list. Register a new client to log in to the system

#End
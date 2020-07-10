# FedTx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Running the application

1 - Make sure you have **NodeJs**, and **npm** installed on your machine, clone the repository and get into the folder from shell, then:

2 - run `npm i`: in order to install all dependecies needed to run the web-app

4 - run `npm start`: the web-app should get opened on default browser on `http://localhost:3330`

If you want to build for production run `npm run build:prod`, the outcome will be produced into **/dist** folder

If you want to run tests type `npm test`

PS: I also implemented a simply store (redux) where I put user status as
```
UserState: {
  user: [firstName, lastName, email, password]
  isLoggedIn: boolean
  loginTime: Date
}
```

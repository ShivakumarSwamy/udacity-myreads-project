# Udacity MyReads Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- node v22.14.0
- npm 11.1.0

If you face any version issues with node and npm, you can use volta to manage the versions of node and npm.
Refer [here](https://volta.sh/) to install volta.

## Run locally

In the project directory, you can run the following commands:

```shell
npm install
npm start
```

This will start the development server, and you can access the app at [http://localhost:3000](http://localhost:3000),
if not opened automatically.


# NOTE
> If a book is assigned to a shelf on the main page and that book also appears on the search page, 
> the correct shelf should be selected for that book on the search page. 
> If that book's shelf is changed on the search page, that change should be reflected on the main page as well. 
> The option "None" should be selected if a book has not been assigned to a shelf.

Please note, I have implemented the above feature as per how it's shown in video, where for new book "Add to..." is shown
instead of "Move to..." and "None" shelf option is not given with no default option. 
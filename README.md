# Bamazon

Bamazon is a node.js application that allows users to interact with a MySQL database using the command line interface.

## How to use Bamazon:

1. Once you are within the bamazon directory, type `npm install` to download all necessary packages. (See below for required packages)
2. The application requires the use of a SQL database. Once you have successfully connected to your database, paste the code from `bamazon.sql` to initiate your bamazon database and associated table.
3. After completing the above step, you will choose between two files, `bamazonCustomer.js` and `bamazonManager.js` depending upon the functionality you desire. This can be accomplished by typing `node bamazonCustomer.js` or `node bamazonManager.js`.
4. Make a selection from the options and follow the proceeding prompts.
5. Be amazed at how seemless node makes interacting with MySQL using JavaScript.

## Screenshots: bamazonCustomer.js
### Main menu

![Screenshot](/bamazonCustomer01.png)

### Selecting item for purchase

![Screenshot](/bamazonCustomer02.png)

### Selecting quantity for purchase

![Screenshot](/bamazonCustomer03.png)

### Finalize purchase (MySQL database reflects the change in quantity on hand)

![Screenshot](/bamazonCustomer04.png)

## Screenshots: bamazonManager.js
### Main menu

![Screenshot](/bamazonManager01.png)

### Products for sale

![Screenshot](/bamazonManager02.png)

### Low Inventory

![Screenshot](/bamazonManager03.png)

### Purchasing more stock

![Screenshot](/bamazonManager04.png)

![Screenshot](/bamazonManager05.png)

### Adding new items for sale 

![Screenshot](/bamazonManager06.png)

## Required Packages
Running `npm install` will install the below required packages.

- [CLI-TABLE](https://www.npmjs.com/package/cli-table) (add tables to your command line interface)
- [INQUIRER](https://www.npmjs.com/package/inquirer) (create interactive prompts and menus)
- [MYSQL](https://www.npmjs.com/package/mysql) (links MySQL to Node.js)

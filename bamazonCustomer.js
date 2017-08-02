var Table = require("cli-table");
var inquirer = require("inquirer");
var mysql = require("mysql");


// Connection to mySQL database
// =======================================
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("Successfully Connected");
  createTable();
});

// =======================================

// Initializes table and populates cells based on items within
// bamazon.sql databes.
var itemsLength;

var createTable = function() {
  var table = new Table({
    head: ["Item_ID", "Brand", "Product", "Department", "Price", "Quantity"],
    colWidths: [10, 15, 40, 15, 10, 10]
  });

  var query0 = "SELECT * FROM products";
  connection.query(query0, function(err, res) {
    // console.log(res);
    itemsLength = res.length;

    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].brand, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    productPurchase();
  });
};

// var itemChoice;

var productPurchase = function() {
  inquirer.prompt({
    name: "purchase",
    message: "Please choose the item_id of the product you would like to purchase."
  }).then(function(answer) {
    itemChoice = answer.purchase;
    choosenProduct();
    // choosenProduct(answer.purchase);
    // console.log(answer.purchase);
  });
};

var quantityPurchase = function() {
  inquirer.prompt({
    name: "quantity",
    message: "How many would you like?"
  }).then(function(quantity) {
    isAvailable(quantity.quantity);
    console.log("\n===============================\n");
    // console.log("\n===============================\n" +
    //             "\nQuantity: " + quantity.quantity + "\n");
  });
};

// Query Functions
// =======================================
var qty;

function choosenProduct() {
  var query = "SELECT * FROM products WHERE item_id = ?";
  connection.query(query, [itemChoice], function(err, res) {
    if (err) throw err;
    qty = res[0].stock_quantity;
    console.log("\n===============================\n\n" + res[0].product_name + ": $" + res[0].price + "\n\n===============================\n");
    quantityPurchase();
  });
}

function isAvailable(order) {
  var query = "SELECT stock_quantity, price, product_name  FROM products WHERE item_id = ?";
  connection.query(query, [itemChoice], function(err, res) {
    if (res[0].stock_quantity >= order) {
      console.log("TOTAL: $" + (res[0].price * order).toFixed(2) + "\n");
      inquirer.prompt([
        {
          name: "confirm",
          type: "confirm",
          message: "Are you sure you want to purchase?"
        }
      ]).then(function(confirm) {
        if (confirm.confirm === true) {
          console.log("\n===============================\n\nThank you for shopping at BAMAZON!\n");
          var newQty = (res[0].stock_quantity - order);
          updateQty(order, res[0].product_name, newQty);
        }
        else {
          productPurchase();
        }
      });
    }
    else {
      console.log("Order exceeds current inventory.\n");
      productPurchase();
    }
  });
}

function updateQty(order, product_name, newQty) {
  console.log("===============================\n\nReducing " + product_name + " inventory by " + order + ".\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQty
      },
      {
        product_name: product_name
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log("===============================\n\n" + res.affectedRows + " item updated!\n\n");
      createTable();
    }
  );
}

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
  managerOptions();
});

// =======================================


function managerOptions() {
  inquirer.prompt([
    {
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ]).then(function(answer) {
    switch (answer.options) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addProductInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
    }
  });
}

function viewProducts() {
  // Initializes table and populates cells based on items within
  // bamazon.sql databes.

  var table = new Table({
    head: ["Item_ID", "Brand", "Product", "Department", "Price", "Quantity"],
    colWidths: [10, 15, 40, 15, 10, 10]
  });

  var query0 = "SELECT * FROM products";
  connection.query(query0, function(err, res) {
    if (err) throw err;
    // console.log(res);

    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].brand, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    managerOptions();
  });
}

function lowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity <= 5";
  connection.query(query, function(err, res) {
    if (err) throw err;

    var table = new Table({
      head: ["Item_ID", "Brand", "Product", "Department", "Price", "Quantity"],
      colWidths: [10, 15, 40, 15, 10, 10]
    });

    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].brand, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    managerOptions();
  });
}

function addProductInventory() {
  var table = new Table({
    head: ["Item_ID", "Brand", "Product", "Department", "Price", "Quantity"],
    colWidths: [10, 15, 40, 15, 10, 10]
  });

  var query0 = "SELECT * FROM products";
  connection.query(query0, function(err, res) {
    if (err) throw err;
    // console.log(res);

    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].brand, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    inquirer.prompt([
      {
        name: "item",
        message: "Which item would you like to restock?"
      }
    ]).then(function(answer) {
      inquirer.prompt([
        {
          name: "quantity",
          message: "How many would you like to order?"
        }
      ]).then(function(qty) {
        var qtyNum = "SELECT stock_quantity FROM products WHERE item_id = ?";
        connection.query(qtyNum, [answer.item], function(err, res) {
          if (err) throw err;
          var newQty = (parseInt(res[0].stock_quantity) + parseInt(qty.quantity));
          console.log(newQty);
          var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQty
              },
              {
                item_id: answer.item
              }
            ],
            function(err, res) {
              if (err) throw err;
              console.log("===============================\n\n" + res.affectedRows + " item updated!\n\n");
              viewProducts();
            }
          );
        });
      });
    });
  });
}

function addProduct() {
  inquirer.prompt([
    {
      name: "brand",
      message: "Input Brand Name"
    },
    {
      name: "product",
      message: "Input Product Name"
    },
    {
      name: "department",
      message: "Input Department Name"
    },
    {
      name: "price",
      message: "Input Price",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      message: "Input Quantity",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answer) {
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        brand: answer.brand,
        product_name: answer.product,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
      },
      function(err, res) {
        console.log(res.affectedRows + " product inserted!\n");
        viewProducts();
      }
    );
  });
}

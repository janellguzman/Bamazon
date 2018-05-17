var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  welcome();
});

function welcome() {
  inquirer.prompt([
    {
      message: "Would you like to buy something today? ('yes' or 'no')",
      name: "welcome"
    }
  ]).then(function(datault) {
    if (datault.welcome === "yes") {
      listItems();
    } else {
      console.log("Thank you!");
      connection.end();
    }
  });
}

function welcomeAgain() {
  inquirer.prompt([
    {
      message: "Would you like to buy something else today? ('yes' or 'no')",
      name: "welcome"
    }
  ]).then(function(datault) {
    if (datault.welcome === "yes") {
      listItems();
    } else {
      console.log("Thank you!");
      connection.end();
    }
  });
}

function listItems() {
connection.query("SELECT * FROM products", function (err, data) {
  console.log("-----------------------------------------------------------------");
  console.log("| Item ID | Product Name | Department Name | Price | # In Stock |");

for (var i = 0; i < data.length; i++) {
        console.log("| " + data[i].item_id + " | " + data[i].product_name + " | " + data[i].department_name + " | " + data[i].price + " | " + data[i].stock_quantity + " | ");
      console.log("-----------------------------------------------------------------");
    }
    whatToBuy();
  });
}

function whatToBuy() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "What is the ID of the product you want to buy?"
    },
    {
      name: "amount",
      type: "input",
      message: "How many would you like to buy?"
    }
  ]).then(function(result) {
    buyItem(result.item_id, result.amount);
  });
  }

function buyItem(item_id, amount) {
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;
    if (item_id > data.length) {
      console.log("I'm sorry we don't have that item. Please check to see if your Item ID is correct.");
      welcome();
    } else if (data[item_id -1].stock_quantity < amount) {
      console.log("Insufficient quantity! We don't have that many in stock. Please check back again later.")
      welcomeAgain();
    } else {
      newStock = data[item_id - 1].stock_quantity - amount;
      connection.query("UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newStock
        },
        {
          item_id: item_id
        }
      ],
      function(err, result) {
        if (err) throw err;
        console.log("Your total comes to $" + // priceOfItemPurchased * amountOfItemPurchased +
        ". Thank you for shopping at Bamazon!");
        welcomeAgain();
      });
    }
  });
}

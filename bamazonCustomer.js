var mysql = require("mysql");
var inquirer = require("inquirer");

var customerRequest = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

function bamazonProduct (){
    connection.query("SELECT * FROM products", function (err,res){
        if (err) throw err;

        console.log("--------------------")
        console.log("Bamazon Products: ");
        console.log("--------------------")
        for(var i = 0; i < res.length; i++) {
            console.log("PRODUCT ID: " + res[i].item_id + "             PRODUCT:     " + res[i].product_name + 
            "                  PRODUCT PRICE:  " + res[i].price);
            customerRequest.push(res[i].product_name);
        }

        console.log("--------------------");
        userPurchase();
    });
}

function userPurchase(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to purchase today?",
            choices: customerRequest,
            name: "product"
          },
          {
            type: "input",
            message: "Enter Quantity: ",
            name: "quantity"
          }
        ]).then(function (inquirerResponse) {
          var item = inquirerResponse.product;
          var prodQuery = "SELECT * FROM products WHERE product_name='" + item + "' LIMIT 1";
          var custAmt = parseInt(inquirerResponse.quantity);
    
          connection.query(prodQuery, function (err, res) {
            if (err) throw err;
    
            var stock = res[0].stock_quantity;
            var price = res[0].price;
            var total = custAmt*price;
            var bamSales = res[0].product_sales;
    
            if (stock > custAmt) {
              productUpdate(item, stock, custAmt, total, bamSales);
            }
            else {
              console.log("Insufficient quantity to Fulfill Order! Try Purchasing Different Amount");
            }
    
          }); 
          
        }); 
    }
    
    function productUpdate(name, x, y,z,s) {
      var stockQty=x-y;
      var prodSales=s+z;
    
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: stockQty,
            product_sales: prodSales
          },
          {
            product_name: name
          }
        ],
        function (err, res) {
          console.log("Thank you for Your Purchase! Your Total: $" + z);
    
          connection.end();
        }
      );
    
    }
    
    
    bamazonProduct();


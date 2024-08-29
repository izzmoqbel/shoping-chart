const express = require("express");
const { Pool } = require("pg");
const body_parser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tt",
  password: "Ezo20901",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("PostgreSQL connection error:", err.stack);
  } else {
    console.log("PostgreSQL Database is connected Successfully");
  }
});

app.use(
  session({
    secret: "1234567890abcdefghijklmnopqrstuvwxyz",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Create Route for Loading Product Data
app.get("/", async (req, res) => {
  const query = `SELECT * FROM product`;

  try {
    const result = await pool.query(query);

    if (!req.session.cart) {
      req.session.cart = [];
    }

    res.render("product", {
      products: result.rows,
      cart: req.session.cart,
    });
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.send("Error loading products");
  }
});

app.post("/add_cart", (req, res) => {
  const { product_id, product_name, product_price } = req.body;

  let count = 0;

  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].product_id === product_id) {
      req.session.cart[i].quantity += 1;
      count++;
    }
  }

  if (count === 0) {
    const cart_data = {
      product_id: product_id,
      product_name: product_name,
      product_price: parseFloat(product_price),
      quantity: 1,
    };

    req.session.cart.push(cart_data);
  }

  res.redirect("/");
});

app.get("/remove_item", (req, res) => {
  const product_id = req.query.id;

  req.session.cart = req.session.cart.filter(
    (item) => item.product_id !== product_id
  );

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});

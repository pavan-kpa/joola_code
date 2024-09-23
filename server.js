const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Example products data
const products = {
  Pickleball: [
    {
      productName: "Racket 1",
      price: 10,
      productDescription: "Less weight racket",
    },
    {
      productName: "Racket 2",
      price: 20,
      productDescription: "Medium weight racket",
    },
    {
      productName: "Racket 3",
      price: 15,
      productDescription: "Durable lightweight design.",
    },
    {
      productName: "Racket 4",
      price: 25,
      productDescription: "Balanced design for power and control.",
    },
  ],
  TableTennis: [
    {
      productName: "Table Tennis Racket 1",
      price: 10,
      productDescription: "Lightweight design for quick shots.",
    },
    {
      productName: "Table Tennis Racket 2",
      price: 20,
      productDescription: "Ideal for precision and speed.",
    },
    {
      productName: "Table Tennis Ball Set",
      price: 5,
      productDescription: "Pack of 6 quality table tennis balls.",
    },
    {
      productName: "Table Tennis Paddle Set",
      price: 15,
      productDescription: "Includes 2 paddles and 3 balls.",
    },
  ],
};

// API endpoint to get products
app.get("/api/products", (req, res) => {
  res.json(products);
});

let cart = [];

// API endpoint to add products to the cart
app.post("/api/cart", (req, res) => {
  const { productName, price, productDescription } = req.body;
  cart.push({ productName, price, productDescription });
  res.json({ message: `${productName} added to cart`, cart });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

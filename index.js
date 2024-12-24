const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());

// Data

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Q1 Add an Item to the Cart

function addItems(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let cartItems = addItems(cart, productId, name, price, quantity);
  res.json({ cartItems });
});

// Q2 Edit Quantity of an Item in the Cart

function updateCartItemsQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let cartItems = updateCartItemsQuantity(cart, productId, quantity);
  res.json({ cartItems });
});

// Q3 Delete an Item from the Cart

function removeItemFromCart(items, productId) {
  return items.productId !== productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartItems = cart.filter((items) => removeItemFromCart(items, productId));
  res.json({ cartItems });
});

// Q4 Read Items in the Cart

function getCart(cart) {
  return cart;
}

app.get('/cart', (req, res) => {
  let cartItems = getCart(cart);
  res.json({ cartItems });
});

// Q5 Calculate Total Quantity of Items in the Cart

function getTotalQuantityOfItems(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = getTotalQuantityOfItems(cart);
  res.json({ totalQuantity });
});

// Q6 Calculate Total Price of Items in the Cart

function getTotalPriceOfItems(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = getTotalPriceOfItems(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

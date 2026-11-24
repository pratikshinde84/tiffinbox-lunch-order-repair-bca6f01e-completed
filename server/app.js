const express = require('express');
const { getMenu } = require('./data');

const app = express();
app.use(express.json());

const menu = getMenu();
const orders = [];
let nextOrderId = 1;

app.get('/api/menu', (req, res) => {
  const veg = req.query.veg;
  if (veg === true) {
    return res.json(menu.filter((dish) => dish.isVeg));
  }
  return res.json(menu);
});

app.get('/api/orders', (req, res) => {
  return res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { dishId, quantity } = req.body;

  const dish = menu.find((item) => item.id === dishId);

  const order = {
    id: nextOrderId++,
    dishId,
    quantity,
    total: dish.price * quantity
  };
  orders.push(order);
  return res.status(201).json(order);
});

module.exports = app;

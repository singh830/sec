const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let stock = [];

// CRUD operations

// Create
app.post('/stock', (req, res) => {
  const { item, quantity, price } = req.body;
  const newItem = { item, quantity, price };
  stock.push(newItem);
  res.json(newItem);
});

// Read
app.get('/stock', (req, res) => {
  res.json(stock);
});

// Update
app.put('/stock/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const { quantity, price } = req.body;
  const itemIndex = stock.findIndex(item => item.item === itemId);

  if (itemIndex !== -1) {
    stock[itemIndex].quantity = quantity;
    stock[itemIndex].price = price;
    res.json(stock[itemIndex]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete
app.delete('/stock/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  stock = stock.filter(item => item.item !== itemId);
  res.json({ message: 'Item deleted successfully' });
});

// Calculate Total Stock Value
app.get('/stock/value', (req, res) => {
  const totalValue = stock.reduce((acc, item) => acc + item.quantity * item.price, 0);
  res.json({ totalValue });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await db.any('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const product = await db.one('SELECT * FROM products WHERE id = $1', [id]);
    res.json(product);
  }
  catch(error){
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /products
router.post('/', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const newProduct = await db.one(
      'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, quantity]
    );
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /products/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const updatedProduct = await db.one(
      'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [name, description, price, quantity, id]
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await db.one('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
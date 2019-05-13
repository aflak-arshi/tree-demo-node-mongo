const express = require('express');
const router = express.Router();
// import controller
const TreeController = require('../controllers/tree.controller');

// GET Route
router.get('/', TreeController.get_tree);

// ADD Route
router.post('/', TreeController.add_tree);

// EDIT Route
router.put('/:id', TreeController.edit_tree);

// DELETE Route
router.delete('/:id', TreeController.delete_tree);

module.exports = router;
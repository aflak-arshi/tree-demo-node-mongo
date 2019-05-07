const express = require('express');
const router = express.Router();
const TreeController = require('../controllers/tree.controller');

router.get('/', TreeController.get_tree);

router.post('/', TreeController.add_tree);

router.put('/:id', TreeController.edit_tree);

router.delete('/:id', TreeController.delete_tree);

module.exports = router;
const express = require('express');
const router = express.Router();
const productController = require('./productController');

function restriction(req, res, next) {
    if (req.headers['sec'] == '123'){
        next();
    }
    
    else{
        res.status(401).send('Not authorized');
    }
}

router.post('/', restriction, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/item/:id', productController.getProductById);
router.put('/item/:id', restriction, productController.updateProduct);
router.delete('item/:id', restriction, productController.deleteProduct);
router.get('/categories', productController.getCategories);
router.post('/categories', restriction, productController.addCategory);
router.put('/categories/:id', restriction, productController.updateCategory);
router.get('/categories/:id', productController.getCategoryById);
router.delete('/categories/:id', restriction, productController.deleteCategory);
router.get('/images/:id', productController.getProductImages);
router.post('/images/:id', restriction, productController.addProductImage);
router.delete('/images/:id', restriction, productController.deleteProductImage);
router.get('/product-inventory', productController.getInventory);
router.get('/product-inventory/:id', productController.getInventoryById);
router.get('/product-inventory/:pid', productController.getInventoryByProductId)
router.post('/product-inventory/:id', restriction, productController.addInventory);
router.put('/product-inventory/:id', restriction, productController.updateInventory);
router.delete('/product-inventory/:id', restriction, productController.deleteInventory);


module.exports = router;

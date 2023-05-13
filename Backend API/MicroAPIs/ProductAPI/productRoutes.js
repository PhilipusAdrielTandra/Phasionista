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
router.get('/:id', productController.getProductById);
router.put('/:id', restriction, productController.updateProduct);
router.delete('/:id', restriction, productController.deleteProduct);
router.get('/categories', productController.getCategories);
router.post('/categories', restriction, productController.addCategory);
router.put('/categories/:id', restriction, productController.updateCategory);
router.get('/categories/:id', productController.getCategoryById);
router.delete('/categories/:id', restriction, productController.deleteCategory);
router.get('/images/:id', productController.getProductImages);
router.post('/images/:id', restriction, productController.addProductImages);
router.delete('/images/:id', restriction, productController.deleteProductImages);
router.get('/product-inventory', productController.getProductInventory);
router.get('/product-inventory/:id', productController.getProductInventoryById);
router.post('/product-inventory/:id', restriction, productController.addProductInventory);
router.put('/product-inventory/:id', restriction, productController.updateProductInventory);
router.delete('/product-inventory/:id', restriction, productController.deleteProductInventory);


module.exports = router;

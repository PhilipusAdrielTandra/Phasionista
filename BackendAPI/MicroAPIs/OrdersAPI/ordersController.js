const Sequelize = require('sequelize');
const sequelize = new Sequelize('pha_cart', 'admin', '9n49NvuQZjk6KoLdQLdv', {
    host: 'localhost',
    dialect: 'mysql',
  });

const initModels = require('./cartModels/init-models')(sequelize); 
const { order_items, orders } = initModels;
const OrderItems = order_items;
const Orders = orders;

exports.createOrder = (req, res) => {
  const { user_id, payment_method, status, total_price, order_items } = req.body;

  Orders.create({
    user_id,
    payment_method,
    status,
    total_price
  })
  .then(order => {
    const orderItemsToCreate = order_items.map(orderItem => ({
      order_id: order.id,
      product_inventory_id: orderItem.product_inventory_id,
      quantity: orderItem.quantity,
      price: orderItem.price
    }));
    OrderItems.bulkCreate(orderItemsToCreate)
    .then(orderItems => {
      res.status(201).json({ order, orderItems });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while creating the order items.' });
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the order.' });
  });
};

exports.getOrderById = async (req, res) => {
    try {
      const order = await Orders.findOne({
        where: { id: req.params.id },
        include: [{ model: OrderItems, as: 'order_items' }]
      });
  
      if (!order) {
        res.status(404).json({ message: 'Order not found.' });
      } else {
        res.status(200).json(order);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while retrieving the order.' });
    }
  };

exports.updateOrderById = (req, res) => {
  const { user_id, payment_method, status, total_price } = req.body;

  Orders.findByPk(req.params.id)
  .then(order => {
    if (!order) {
      res.status(404).json({ message: 'Order not found.' });
    } else {
      order.update({
        user_id,
        payment_method,
        status,
        total_price
      })
      .then(updatedOrder => {
        res.status(200).json(updatedOrder);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the order.' });
      });
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving the order.' });
  });
};

exports.deleteOrderById = (req, res) => {
  Orders.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(numDeleted => {
    if (numDeleted === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Order not found.' });
    }
})
    .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the order.' });
});
};

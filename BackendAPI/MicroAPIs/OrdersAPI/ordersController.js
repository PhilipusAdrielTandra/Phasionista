const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const argon = require('argon2');

const sequelize = new Sequelize('pha_orders', 'admin', '9n49NvuQZjk6KoLdQLdv', {
    host: 'phasionista-orders.ctjeibahvnce.ap-southeast-1.rds.amazonaws.com',
    dialect: 'mysql',
  });

const initModels = require('./orderModels/init-models')(sequelize); 
const { order_items, orders } = initModels;
const OrderItems = order_items;
const Orders = orders;

const uuid = require('uuid');

exports.getAll = (req, res) => {
  Orders.findAll({include: [{ model: OrderItems, as: 'order_items' }]})
  .then(orders => {
    res.status(200).json(orders);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving orders.' });
  });
};

exports.createOrder = (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  const { payment_method, status, total_price, order_items } = req.body;

  const orderId = uuid.v4(); 
  
  Orders.create({
    id: orderId, 
    user_id: userId,
    payment_method,
    status,
    total_price
  })
  .then(order => {
    const orderItemsToCreate = order_items.map(orderItem => ({
      id: uuid.v4(),
      order_id: order.id, 
      product_id: orderItem.product_id,
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
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  try {
    const order = await Orders.findAll({
      where: { user_id: userId },
      include: [{ model: OrderItems, as: 'order_items' }],
      order: [['created_at', 'DESC']]
    });

    if (!order) {
      res.status(200).json([]);
    } else {
      res.status(200).json(order);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving the order.' });
  }
};

exports.updateOrderById = (req, res) => {
  const token = req.headers['authorization'];
  const bearer = token ? token.split(" ")[1] : undefined;
  const decoded = jwt.decode(bearer);
  const userId = decoded ? decoded.id : null;

  const { id, payment_method, status, total_price } = req.body;

  Orders.findByPk(id)
  .then(order => {
    if (!order) {
      res.status(404).json({ message: 'Order not found.' });
    } else {
      const updatedFields = {
        user_id: userId,
      };
      if (payment_method !== "") {
        updatedFields.payment_method = payment_method;
      }
      if (status !== "") {
        updatedFields.status = status;
      }
      if (total_price !== "") {
        updatedFields.total_price = total_price;
      }

      order.update(updatedFields)
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

  const { id } = req.body;

  Orders.destroy({
    where: {
      id: id
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

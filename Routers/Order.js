// Importing External Packages

const express=require("express")

// Importing Model

const {Order}=require("../Models/OrderModel.js")

// ...............................................................
const OrderRoute =express.Router()


OrderRoute.post('/', async (req, res) => {
    try {
      const { user, restaurant, items, totalPrice, deliveryAddress, status } = req.body;
  
      const order = new Order({
        user,
        restaurant,
        items,
        totalPrice,
        deliveryAddress,
        status
      });
  
      await order.save();
  
      res.status(201).send({ msg: 'Order placed successfully' });
    } catch (error) {
      res.status(500).send({ msg: 'An error occurred',error:error.message });
    }

  });


// .................Get A single Order ..........................

OrderRoute.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findById(id)
  
      if (!order) {
        return res.status(404).send({ msg: 'Order not found' });
      }
  
      res.status(200).send({ order });
    } catch (error) {
      res.status(500).send({ msg: 'An error occurred',error:error.message });
    }
  });


  OrderRoute.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).send({ msg: 'Order not found' });
      }
  
      // Updating the order status
      order.status = status;
      await order.save();
  
      res.status(204).end(); 
    } catch (error) {
      res.status(500).send({ msg: 'An error occurred' });
    }
  });

  module.exports={
    OrderRoute
  }
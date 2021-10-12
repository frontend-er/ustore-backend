const {
   Basket
} = require("../models/models");

class CartService {

   async cart() {
      const carts = await Basket.find().populate({
         path: "items.productId",
         select: "name price total"
      });;
      return carts[0];
   };

   async addItem(payload) {
      const newItem = await Basket.create(payload);
      return newItem
   }
}


module.exports = new CartService()
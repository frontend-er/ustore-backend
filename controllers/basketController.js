const uuid = require('uuid');
const path = require('path');
const {
   Basket,
   BasketCourse
} = require('../models/models');
const ApiError = require('../errors/ApiError');
const cartService = require('../services/cart-service');

class BasketController {
   async addItemToCart(req, res, next) {
      try {
         const {
            basketId,
            courseId,
            poductPrice,
            productTitle,
            productDescription,
            unit
         } = req.body;
         if (!basketId && !courseId && !poductPrice && !productTitle && !productDescription && !unit) {
            return next(ApiError.badRequest('Не предоставлен id курса, id корзины, цена, название или описание'))
         };

         const basket = await BasketCourse.create({
            basketId,
            courseId,
            poductPrice,
            productTitle,
            productDescription,
            unit
         });

         return res.json(basket)
      } catch (error) {
         console.log(error)
      }
   }

   async getCart(req, res, next) {
      try {
         const id = req.query.id;
         const userBasket = await BasketCourse.findAll({
            where: {
               basketId: id
            }
         })
         return res.json(userBasket)
      } catch (error) {
         console.log(error)
      }

   }

   async emptyCart(req, res) {
      try {
         const basketId = req.query.basketId;
         const courseId = req.query.courseId;
         const userBasket = await BasketCourse.destroy({
            where: {
               basketId,
               courseId,
            }
         })
         return res.json(userBasket)
      } catch (error) {
         console.log(error)
      }
   }
}

module.exports = new BasketController()
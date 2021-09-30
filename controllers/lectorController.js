const {
   Lector
} = require('../models/models')
const ApiError = require("../errors/ApiError")


class LectorController {
   async create(req, res, next) {
      const {
         name
      } = req.body;

      if (!name) {
         return next(ApiError.badRequest('Name not provided'))
      }
      const lector = await Lector.create({
         name
      })
      return res.json(lector)
   }


   async getAll(req, res) {
      const lector = await Lector.findAll();
      res.json(lector)
   }
}

module.exports = new LectorController()
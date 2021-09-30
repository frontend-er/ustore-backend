const {
   Section
} = require('../models/models')
const ApiError = require("../errors/ApiError")

class SectionController {
   async create(req, res, next) {
      const {
         name
      } = req.body;

      if (!name) {
         return next(ApiError.badRequest('Name not provided'))
      }
      const section = await Section.create({
         name
      })
      return res.json(section)
   }


   async getAll(req, res) {
      const sections = await Section.findAll();
      res.json(sections)
   }
}

module.exports = new SectionController()
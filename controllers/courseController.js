const uuid = require('uuid');
const path = require('path');
const {
   Course,
   CourseInfo
} = require('../models/models');
const ApiError = require('../errors/ApiError')

class CourseController {
   async create(req, res, next) {
      try {
         let {
            name,
            price,
            lectorId,
            sectionId,
            info
         } = req.body;


         const {
            img
         } = req.files

         let fileName = uuid.v4() + ".jpeg";

         img.mv(path.resolve(__dirname, '..', 'static', fileName));

         const course = await Course.create({
            name,
            price,
            lectorId,
            sectionId,
            img: fileName
         })


         if (info) {
            info = JSON.parse(info);
            info.forEach(element => {
               CourseInfo.create({
                  title: element.title,
                  description: element.description,
                  courseId: course.id

               })

            });

         }



         return res.json(course)
      } catch (error) {
         next(ApiError.badRequest(error.message))
      }

   }



   async getAll(req, res) {
      let {
         sectionId,
         lectorId,
         limit,
         page

      } = req.query;

      page = page || 1;
      limit = limit || 9;

      let offset = page * limit - limit

      let courses;

      if (!lectorId && !sectionId) {
         courses = await Course.findAndCountAll({
            limit,
            offset
         })
      }

      if (lectorId && !sectionId) {
         courses = await Course.findAndCountAll({
            where: {
               lectorId
            },
            limit,
            offset
         })

      }

      if (!lectorId && sectionId) {
         courses = await Course.findAndCountAll({
            where: {
               sectionId
            },
            limit,
            offset
         })
      }

      if (lectorId && sectionId) {
         courses = await Course.findAndCountAll({
            where: {
               sectionId,
               lectorId
            },
            limit,
            offset
         })
      }

      return res.json(courses)
   }



   async getOne(req, res) {
      let {
         id
      } = req.params;
      let course = await Course.findOne({
         where: {
            id
         }
      })
      return res.json(course)
   }
}

module.exports = new CourseController()
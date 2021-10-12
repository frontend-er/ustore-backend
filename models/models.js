const sequelize = require('../db')
const {
   DataTypes
} = require("sequelize");


const User = sequelize.define('users', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   email: {
      type: DataTypes.STRING,
      unique: true
   },
   password: {
      type: DataTypes.STRING,
   },
   role: {
      type: DataTypes.STRING,
      defaultValue: "USER"
   },
   isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
   },
   activationLink: {
      type: DataTypes.STRING
   }
})


const Basket = sequelize.define('basket', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   }
})


const BasketCourse = sequelize.define('basket_course', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   poductPrice: {
      type: DataTypes.INTEGER,
   },
   productTitle: {
      type: DataTypes.STRING,

   },
   productDescription: {
      type: DataTypes.STRING,
   },
   unit: {
      type: DataTypes.STRING,

   }
})

const Course = sequelize.define('course', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
   price: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
   },
   img: {
      type: DataTypes.STRING,
      allowNull: false
   },
})

const Section = sequelize.define('section', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
})

const Lector = sequelize.define('lector', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
})


const Rating = sequelize.define('rating', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   rate: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
})



const CourseInfo = sequelize.define('course_info', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   title: {
      type: DataTypes.STRING,
      allowNull: false
   },
   description: {
      type: DataTypes.STRING,
      allowNull: false
   },
})


const LectorSection = sequelize.define('lector_section', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
});



const Token = sequelize.define('token', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   userId: {
      type: DataTypes.INTEGER,
   },
   refreshToken: {
      type: DataTypes.STRING,
   }

});

User.hasMany(Token);
Token.belongsTo(User);

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating);
Rating.belongsTo(User);


Basket.hasMany(BasketCourse)
BasketCourse.belongsTo(Basket)

Section.hasMany(Course)
Course.belongsTo(Section);

Lector.hasMany(Course);
Course.belongsTo(Lector);

Course.hasMany(Rating);
Rating.belongsTo(Course);

Course.hasMany(BasketCourse);
BasketCourse.belongsTo(Course);


Course.hasMany(CourseInfo, {
   as: 'info'
})
CourseInfo.belongsTo(Course);


Section.belongsToMany(Lector, {
   through: LectorSection
});
Lector.belongsToMany(Section, {
   through: LectorSection
});

module.exports = {
   User,
   Basket,
   Course,
   BasketCourse,
   CourseInfo,
   Lector,
   Section,
   LectorSection,
   Rating,
   Token
}
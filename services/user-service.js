const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service.js')
const tokenService = require('./token-service.js')
const UserDto = require('../dtos/user-dto.js')
const ApiError = require('../errors/ApiError')
const {
   User,
   Basket
} = require('../models/models')

class UserService {
   async registration(email, password, role) {
      const candidate = await User.findOne({
         where: {
            email
         }
      })

      // Проверяем нет ли с таким емейлом пользователя в базе
      if (candidate) {
         throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} существует`)
      }
      // Хэштруем пароль и сохраняем кащ базу данных

      const hashedPasswor = await bcrypt.hash(password, 3)
      // Гененрируем рандомную строку для активации по почте
      const activationLink = uuid.v4() // brbterb.bertbb/brtbertb

      const user = await User.create({
         email,
         role,
         password: hashedPasswor,
         activationLink,
      })

      const basket = Basket.create({
         userId: user.id
      })
      // Отправляем ссылку 
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
      // Генерируем токины 
      const userDto = new UserDto(user)
      const token = tokenService.generateToken({
         ...userDto
      })

      await tokenService.saveToken(user.id, token.refreshToken)

      return {
         ...token,
         user: userDto
      }

   }

   async activate(activationLink) {
      const user = await User.findOne({
         where: {
            activationLink
         }
      })

      if (!user) {
         throw ApiError.badRequest('Wrong activation link')
      }
      user.isActivated = true
      await user.save();

   }



   async login(email, password) {
      const user = await User.findOne({
         where: {
            email
         }
      })

      if (!user) {
         throw ApiError.badRequest('User with this email is undefined')
      }

      const isPassEquals = await bcrypt.compareSync(password, user.password)
      if (!isPassEquals) {
         throw ApiError.badRequest('Password in incorect')
      }

      const userDto = new UserDto(user)
      const token = tokenService.generateToken({
         ...userDto
      })

      await tokenService.saveToken(user.id, token.refreshToken)

      return {
         ...token,
         user: userDto
      }


   }


   async logout(refreshToken) {
      const token = tokenService.deleteToken(refreshToken)
      return token;
   }


   async refresh(refreshToken) {
      if (!refreshToken) {
         throw ApiError.forbidden('Не зарагестрирован');
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);



      if (!userData || !tokenFromDb) {
         throw ApiError.forbidden('Не зарагестрирован');
      }



      const user = await User.findOne({
         where: {
            id: userData.id
         }
      });




      const userDto = new UserDto(user);
      const tokens = tokenService.generateToken({
         ...userDto
      });

      await tokenService.saveToken(user.id, tokens.refreshToken);
      return {
         ...tokens,
         user: userDto
      }
   }

   async getAllUser() {
      const users = await User.findAll()
      return users
   }


}


module.exports = new UserService()
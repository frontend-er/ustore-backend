const jwt = require('jsonwebtoken')
const {
   Token
} = require('../models/models')


class TokenService {
   generateToken(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
         expiresIn: '15m'
      })
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
         expiresIn: '30d'
      })
      return {
         accessToken,
         refreshToken
      }
   }

   validateAccessToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
         return userData;
      } catch (error) {
         return null;
      }
   }


   validateRefreshToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
         return userData;
      } catch (error) {
         return null;
      }
   }

   async saveToken(userId, refreshToken) {
      try {
         const tokenData = await Token.findOne({
            where: {
               userId: userId
            }
         })
         if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
         }
         const token = await Token.create({
            userId,
            refreshToken
         })
         return token;
      } catch (error) {
         console.log(error)
      }

   }


   async deleteToken(refreshToken) {
      const tockenData = await Token.destroy({
         where: {
            refreshToken
         }
      });
      return tockenData;
   }



   async findToken(refreshToken) {
      const tockenData = await Token.findOne({
         where: {
            refreshToken
         }
      });
      return tockenData;
   }

}


module.exports = new TokenService()
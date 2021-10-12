require("dotenv").config()
const express = require("express")
const sequelize = require("./db");
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000;
const app = express()


app.use(express.json());
app.use(cookieParser())
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL
}))
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);


// Обработка ошибок, последний слой 
app.use(errorHandler);



const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync()
      app.listen(PORT, () => {
         console.log("Server run on port " + PORT)
      })
   } catch (error) {
      console.log(error)
   }
}


start()
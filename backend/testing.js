
import User from './models/userModel.js'
import asyncHandler from 'express-async-handler'
import connectDB from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import express from 'express'
const app = express()


dotenv.config()
connectDB()


User.findOne({email: 'admin@email.com'}).then(function(res){
    const jsonRes = res.toJSON()
   bcrypt.compare('123456', jsonRes.password).then(function(res){
       console.log(res)
   })
})


app.use((req, res, next) => {
    req.headers.authorization.startsWith()
})
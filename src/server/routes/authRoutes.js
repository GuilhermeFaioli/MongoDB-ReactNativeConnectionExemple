const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../../keys')

require('../models/User')

const router = express.Router()
const User = mongoose.model("User")

router.post('/signup', async (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        Date: req.body.Date
    })
    user.save().then(data => {
        console.log(data)
        const token = jwt.sign({userId: user._id}, jwtkey)
        res.send({token})
    }).catch(err => {
        console.log(err)
        return res.status(422).send(err.message)
    })
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(422).send({error: "must provide email or password"})
    }
    const user = await User.findOne({email})
    if(!user) {
        return res.status(422).send({error: "must provide email or password"})
    }
    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, jwtkey)   
        res.send({token})
    } catch(err) {
        return res.status(422).send({error: "must provide email or password"})
    }
    
})

module.exports = router
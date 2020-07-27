const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../../keys')

require('../models/User')

const router = express.Router()
const User = mongoose.model("User")

router.post('/signup', (req, res) => {
    console.log(req.body)

    const user = new User({
        email: req.body.email,
        password: req.body.password
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

module.exports = router
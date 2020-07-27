const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./models/User')
require('./models/Employee')
const requireToken = require('./middleware/requireToken')
const {CONNECTION} = require('../keys')// import of secret key with your mongoDB Connection and password
const authRoutes = require('./routes/authRoutes')
const { useReducer } = require('react')

app.use(bodyParser.json())
app.use(authRoutes)
const Employee = mongoose.model("employee")

const mongoUri = CONNECTION// imported of .env (mongoDB connection)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo!")
})

mongoose.connection.on("error", (err) => {
    console.log("Error", err)
})

mongoose.set('useFindAndModify', false);

app.get('/', requireToken, (req, res) => {
    Employee.find({}).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/auth', requireToken, (req, res) => {
    res.send('your email is '+ req.user.email)
})

app.post('/send-data', (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    employee.save().then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
    
})

app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('Server running!')
})

    
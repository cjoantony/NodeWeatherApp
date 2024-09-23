const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// define directory paths
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up public directory location
app.use(express.static(publicDirectory))

const name = 'Cjo'

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sijo'
    })
})

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is help page',
        name: 'Sijo'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<title>About</title>')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Sijo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide search location' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }
        // console.log(geocode_data)
        forecast({ latitude, longitude, location }, (err, forecast_data) => {
            if (err) {
                return res.send(err)
            }
            // console.log(forecast_data)
            // console.log(req.query)
            res.send({ forecast: forecast_data, location, address: req.query.address })

        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404-error', {
        errMsg: 'Help content not found',
        name
    })
})

app.get('*', (req, res) => {
    res.render('404-error', {
        errMsg: '404 Page not found',
        name
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})
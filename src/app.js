const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()
const port = process.env.PORT || 3000

const publicPath =path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials' )

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))




app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Vaibhav korat'
    })
})



app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About me',
        name : 'Vaibhav korat'
    })
})


app.get('/help',(req,res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
         name: 'Vaibhav Korat'
       
    })
})

// app.get('*',(req,res)=>{
//     res.send('404')
// })
app.get('/weather',(req,res) =>{
    if(!req.query.address)
    {
        return res.send({
            erroe : 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})
        }

        forecast(data.latitude, data.longitude,(error, forecastData) => {
            if (error) {
                return  res.send({error})
            }

            res.send({
                forecast: forecastData,
                location : data.location,
                address : req.query.address
            })
        })
    })
    // res.send({
    //     adddress : req.query.adddress
    // }) 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})


app.listen(port,()=> {
    console.log('running')
})
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()
const publicPath =path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials' )

app.set('view engine', 'hbs')
app.set('views', viewpath)
app.use(express.static(publicPath))

hbs.registerPartials(partialPath)



app.get('',(req,res)=>{
    res.render('index')
})



app.get('/about',(req,res)=>{
    res.render('about', {
        name: 'vaibhav',
        surname : 'korat'
    })
})


app.get('/help',(req,res)=>{
    res.render('help', {
        name: 'vaibhav',
        surname : 'korat'
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

app.get('/products',(req,res) =>{
    console.log(req.query)
    res.send({
        products : []
    }) 
})

app.listen(3000,()=> {
    console.log('running')
})
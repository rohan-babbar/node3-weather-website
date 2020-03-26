const path = require('path') //core module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
//console.log(__dirname) // dirname = directory name, dirname here refers to src. i.e path to the folder this file lives in
// console.log(path.join(__dirname,'../public')) //path to the folder we wanna serve up
//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') //our custom directory
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //pointing express  to our custom directory
hbs.registerPartials(partialsPath)//it takes a path to the directory where partial live
//Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath)) //static takes tha path to the folder we wanna serve up

app.get('',(req,res)=>{ //rout handler for root page
    res.render('index',{ //passing an object
        title : 'Weather',
        name : 'Rohan Babbar'
    })
})
app.get('/about',(req,res)=>{ //rout handler for about page
    res.render('about',{ //about here,name of the new template
        title : 'About Me',
        name : 'Rohan Babbar'
    })
})
app.get('/help',(req,res)=>{ //rout handler for help page, '' it contains url.
    res.render('help',{
        helpText : 'This is some helpful text',
        title : 'Help',
        name : 'Rohan Babbar'
    })
})
app.get('',(req,res)=>{  //'' = app.com (root page)
    res.send('<h1>Weather</h1>') //req=request, res=response.
})
  // app.get('/help',(req,res)=>{
  //     res.send({
  //         name: 'Rohan', // seding of an object.
  //         age: 21
  //     })
  // })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name :  'Rohan'
//     },{                     //sending of array of objects.
//         name : 'Babbar'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<title> Udemy Courses </title>')  //sending back HTML
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Provide Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location }={})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })

    })
    // res.send({
    //     location : 'New Delhi',
    //     forecast :'High Humidity',
    //     address  : req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'Provide Search Term'
        })
    }
    res.send({
       products : []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Rohan Babbar',
        errorMessage :'Help Article Not Found'
    })
})
app.get('*',(req,res)=>{ //* represents match anything that hasn't been matched so far
res.render('404',{
    title :  '404',
    name  : 'Rohan Babbar',
    errorMessage :'Page Not Found'
})
})
app.listen(3000,()=>{
    console.log('Server Is Up On 3000 Port')
})
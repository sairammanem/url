const express = require('express')
const mongoose = require('mongoose')
const Shorturl = require('./models/shorturls')
const port = process.env.PORT || 5000;
const app = express()
let dburl  = "mongodb+srv://sairam:sairamvirat@cluster0.qxjo5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dburl,{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
 
app.get('/', async (req,res)=> {
    const shorturls = await Shorturl.find()
    res.render('index',{shorturls:shorturls})
})


app.post('/shorturls',async (req,res)=>{
  await Shorturl.create({full: req.body.fullurl})
  res.redirect('/')
})

app.get('/:shorturl', async (req,res)=> {

  const shorturl = await Shorturl.findOne({short: req.params.shorturl})
 if(shorturl == null) return res.sendStatus(404)

 shorturl.clicks++
 shorturl.save()

 res.redirect(shorturl.full)
})


app.listen(port, () => console.log('Server started'))
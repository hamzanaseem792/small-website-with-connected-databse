const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance'); }

const port = 8000;


// Define mongoose sechema

const contactSchema = new mongoose.Schema({
    name: String, // JavaScript string data type
    phone: String, // JavaScript string data type
    email: String, // JavaScript string data type
    address: String, // JavaScript string data type
    edc: String // JavaScript string data type
});


  const contact = mongoose.model('contact', contactSchema);


// stuff related to express 
app.use('/static', express.static('static'));  //  for serving static files
app.use(express.urlencoded());


// pug specific stuff
app.set('view engine', 'pug'); // set the view engine pug 
app.set('views', path.join(__dirname, 'views'));// set the view directory I mean path 

// ENd points

app.get('/',   (req,res)=>{
    
    res.status(200).render('home.pug');

})
app.get('/contact',   (req,res)=>{
    
    res.status(200).render('contact.pug');

})
app.post('/contact',   (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(  ()=>{

        res.send("Your application has been submitted successfully we will response you as soon as possible");

    }).catch(  ()=> {
        res.status(400).send("sorry your application has not been submitted becasue of some technical issue")
    });
    
    // res.status(200).render('contact.pug');

})


// server running 
app.listen(port,  ()=>{
   console.log(`The application successfully started on port ${port}`);
})
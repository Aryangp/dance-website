const express  = require("express")
const path  = require("path")
const app = express()
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb+srv://aryan:aryangupta05@user.nzzo7.mongodb.net/dance?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
  const contact = mongoose.model('contact', contactSchema);





app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({extended:"true"}))


app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
   var myData = new contact(req.body)
   myData.save().then(()=>{
       res.send("the data is saved in data base")
   }).catch(()=>{
       res.status(400).send("item is not data base")
       })
    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
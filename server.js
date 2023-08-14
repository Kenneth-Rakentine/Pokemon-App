const express = require('express');   
const app = express();
const PORT = 3000;
require("dotenv").config();
const mongoose = require("mongoose");



//Middleware:________________________


//sets engine
app.set('view engine', 'jsx');

//starts engine
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log("I run for all routes")
  next()
});

const pokemon = require("./models/Pokemon");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.once("open", () => {
    console.log("connected to mongo")
  });


//Routes:________________________

app.get('/', (req,res)=>{
    res.send('<h1>Welcome to the Pokemon App!</h1>')
});

app.get('/pokemon', (req,res)=>{
    res.render("Index", {pokemon:pokemon})
});

  app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id;
    res.render("Show", { pokemon: pokemon, id })
  });


//SERVER:__________________________

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`)
});
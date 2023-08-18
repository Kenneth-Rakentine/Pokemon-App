const express = require('express');   
const app = express();
const PORT = 3000;
// const connectDB = require('./config/db');
require('dotenv').config();
const mongoose = require("mongoose");
const Pokemons = require('./models/Pokemons')



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



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.once("open", () => {
    console.log("connected to mongo")
  });

 
  app.get('/pokemon/new', (req, res) => {
    res.render('New');
  });

  //NEW:________________________


//Routes:________________________

app.get('/', (req,res)=>{
    res.send('<h1>Welcome to the Pokemon App!</h1>')
});

app.get('/pokemon', async (req, res) => {
  const pokemonList = await Pokemons.find()
  res.render('Index', { pokemonList })
});

 //Create:________________


app.get('/pokemon/:id', async (req, res) => {
  const id = req.params.id;
  const selectedPokemon = await Pokemons.findById(id)
  res.render('Show', { pokemon: selectedPokemon });
});


//_________________SHOW

 app.post('/pokemon', async (req, res) => {
  const { name, img } = req.body;
  const newPokemon = new Pokemons({ name, img }); 
  await newPokemon.save();
  res.redirect('/pokemon');
});

  // app.post("/pokemon", async (req, res) => {
  //   const newPokemon = await Pokemons.create(req.body)
  //   console.log(newPokemon);
  //   res.redirect("/pokemon");
  // });


//________________Post
  
app.delete('/pokemon/:id', async(req,res)=>{
  await Pokemons.findByIdAndRemove(req.params.id)
  res.redirect('/pokemon')
})

//________________Delete
  
app.put('/pokemon/:id', async(req, res)=>{
  const updatedPokemon = await Pokemons.findByIdAndUpdate(req.params.id,req.body)
      
  res.redirect(`/pokemon/${req.params.id}`);
  });


  app.get('/pokemon/:id/edit', async(req, res)=>{
const foundDog =  await Pokemons.findById(req.params.id) 
console.log("FoundPokemon:", foundPokemon)
res.render('pokemon/Edit',{
  dog: foundPokemon
})
})

  //________________Edit



//SERVER:__________________________

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`)
});


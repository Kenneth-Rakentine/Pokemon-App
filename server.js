const express = require('express');   
const app = express();
const PORT = 3000;
const methodOverride = require('method-override');
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

app.use(express.json({extended: false}));

app.use((req, res, next) => {
  console.log("I run for all routes")
  next()
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('500 Internal Server Error')
});

app.use(methodOverride('_method'));



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.once("open", () => {
    console.log("connected to mongo")
  });

 

//Routes:________________________

app.get('/', (req,res)=>{
    res.send('<h1>Welcome to the Pokemon App!</h1> <br> <p><a href="/pokemon">Pokemon</a></p>')
});

app.get('/pokemon', async (req, res) => {
  const pokemonList = await Pokemons.find()
  res.render('Index', { pokemonList })
});

 //Create:________________

 app.get('/pokemon/new', (req, res) => {
  res.render('New')
});

//NEW:________________________

// app.get('/pokemon/seed', async(req, res)=>{
//   //Delete existing db data:
//   await Pokemons.deleteMany({})
//   pokemonSchema
//   //Create new list
//   await Pokemons.create( pokemon )
//   res.redirect('/pokemon')
// })

//SEED________________________


app.get('/pokemon/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const selectedPokemon = await Pokemons.findById(id)
    if (!selectedPokemon) {
      return res.status(404).render('Error404')
    }
    res.render('Show', { pokemon: selectedPokemon })
  } catch (error) {
    console.error(error)
    res.status(500).render('Error500')
  }
});


//_________________SHOW

app.post('/pokemon', async (req, res) => {
  try {
    const { name, img } = req.body
    const newPokemon = new Pokemons({ name, img })
    await newPokemon.save()
    res.redirect('/pokemon')
  } catch (error) {
    console.error(error)
    res.status(500).render('Error500')
  }
});

//________________Post
  
app.delete('/pokemon/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedPokemon = await Pokemons.findByIdAndRemove(id)
    if (!deletedPokemon) {
      return res.status(404).render('Error404'); 
    }
    res.redirect('/pokemon')
  } catch (error) {
    console.error(error)
    res.status(500).render('Error500')
  }
});

//________________Delete
  
app.put('/pokemon/:id', async (req, res) => {
  try {
    const id = req.params.id
    console.log('Edit ID:', id)
    console.log('Edit Body:', req.body)
    const updatedPokemon = await Pokemons.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatedPokemon) {
      return res.status(404).render('Error404'); 
    }
    res.redirect(`/pokemon/${id}`)
  } catch (error) {
    console.error(error)
    res.status(500).render('Error500');
  }
});


  app.get('/pokemon/:id/edit', async(req, res)=>{
const foundPokemon =  await Pokemons.findById(req.params.id) 
console.log("FoundPokemon:", foundPokemon)
res.render('Edit',{
  pokemon: foundPokemon
})
})

  //________________Edit



//SERVER:__________________________

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`)
});


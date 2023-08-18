const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    img:  { type: String, required: false }
});

const Pokemons = mongoose.model('Pokemons', pokemonSchema);

module.exports = Pokemons;
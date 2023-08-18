import React from "react";
import pokemon from "../models/Pokemon";

function Index(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  };

  const myStyle = {
    color: "#ffffff",
    backgroundColor: "#34eb7a"
  }

  return (
    <div style={myStyle}>
      <h1>See All The Pokemon!</h1>
      {/* <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <a href={`/pokemon/${index}`}>{capitalizeFirstLetter(pokemon.name)}</a>
          </li>
        ))}
      </ul> */}

      <ul>
        {props.pokemonList.map(pokemon => (
          <li key={pokemon._id}>
            <a href={`/pokemon/${pokemon._id}`}>{capitalizeFirstLetter(pokemon.name)}</a>
          </li>
        ))}
      </ul>

      <a href="/pokemon/new">Create New Pokemon</a> 

    

    </div>
  )
};



export default Index;
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
      <img src='https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Pok%C3%A9mon-Logo-PNG.png?fit=1600%2C1200&ssl=1' style={{width: "20%"}}></img>
      {/* <h1>See All The Pokemon!</h1> */}
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
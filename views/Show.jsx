import React from "react";

function Show(props) {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    };
  
    const myStyle = {
      color: "#ffffff",
      backgroundColor: "#000000",
    }
    const id = props.id
    const pokemon = props.pokemon[id];
    const addJpg = `${pokemon.img}.jpg`

    return (
      <div style={myStyle}>
        <h1 className="catchTitle">Gotta Catch 'Em All</h1>
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
        <img src={addJpg} alt={`${pokemon.name} Image`} />
        <a href="/pokemon">back</a>
      </div>
    )
  };

//   <link rel="stylesheet" type="text/css"   href="/css/style.css"/>
  
  export default Show;
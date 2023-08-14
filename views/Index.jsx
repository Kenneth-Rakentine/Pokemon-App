import React from "react";

function Index(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  };

  const myStyle = {
    color: "#ffffff",
    backgroundColor: "#044030"
  }

  return (
    <div style={myStyle}>
      <h1>See All The Pokemon!</h1>
      <ul>
        {props.pokemon.map((pokeName, index) => (
          <li key={index}>
            <a href={`/pokemon/${index}`}>{capitalizeFirstLetter(pokeName.name)}</a>
          </li>
        ))}
      </ul>
    </div>
  )
};

{/* <link rel="stylesheet" type="text/css"   href="/css/style.css"/> */}

export default Index;
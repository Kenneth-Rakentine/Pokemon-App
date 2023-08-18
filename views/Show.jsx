import React from "react";

function Show(props) {
  const pokemon = props.pokemon;
  if (!pokemon) {
      return <div>Loading...</div>;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const myStyle = {
    color: "#ffffff",
    backgroundColor: "#a4eb34",
  };

  const addJpg = `${pokemon.img}.jpg`;

  return (
    <div style={myStyle}>
      <h1 className="catchTitle">Gotta Catch 'Em All</h1>
      <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
      <img src={addJpg} alt={`${pokemon.img} Image`} />
      <br></br>
      <a href={`/pokemon/${pokemon._id}/edit`}>Edit This Pokemon</a>
<br></br>
<form action={`/pokemon/${pokemon._id}?_method=DELETE`} method="POST"  >
      <input type="submit" value="DELETE"/>

      </form>
      <br></br>
      <a href="/pokemon">back</a>
    </div>
  );
}

export default Show;
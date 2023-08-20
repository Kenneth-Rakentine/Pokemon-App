import React from "react";

function Edit(props) {
    const pokemon = props.pokemon
  return (
    <div>
    <form action={`/pokemon/${pokemon._id}?_method=PUT`} method="POST">
    <input type="hidden" name="_id" value={pokemon._id} />
        Name:{" "}
        <input type="text" name="name" defaultValue={pokemon.name} />
        <br />
        Image:{" "} 
        <input type="text" name="img" defaultValue={pokemon.img} /> 
        <br />
        <input type="submit" value="Submit Changes" />
      </form>

      <br></br>
      <a href="/pokemon">back</a>
    </div>
  );
}

export default Edit;
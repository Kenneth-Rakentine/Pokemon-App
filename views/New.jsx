import React from "react";

function New() {
  return (
    <div>
      <a href="../">Go back</a> <br />
      <form action="/pokemon" method="POST">
        Name: <input type="text" name="name" />
        <br />
        Image: <input type="text" name="img" /> 
        <br />
        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
}

export default New;
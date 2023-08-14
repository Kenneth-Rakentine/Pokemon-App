const React = require("react");

class Index extends React.Component {

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

  render() {
    const myStyle = {
      color: '#ffffff',
      backgroundColor:'#000000',
    };

    return (
          <div style={myStyle}>
            <h1>See All The Pokemon!</h1>
            <ul>
              {this.props.pokemon.map((poke, index) => (
                <li key={index}>
                  <a href={`/pokemonroute/${index}`}>
                    {this.capitalizeFirstLetter(poke.name)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
    )
  }
}

module.exports = Index;






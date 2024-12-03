/* nombre de pokemon a prendre */
const pokemonCount= 151;

/* Chemin a suivre pour attribuer des valeur dans mon pokedex */

var pokedex={}; // {1 : {"name" : "bulbsaur", "img" : url, type : ["grass","poison"], "desc" : "...."}}

/* function asynchrone  */

window.onload = async function () {
    getPokemon(1);
}
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    /* attend de la reponse par fetch avec l'attribu await */

    let res = await fetch(url);
    let pokemon = await res.json();
    console.log(pokemon)
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon ["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    console.log(pokemonDesc);


}
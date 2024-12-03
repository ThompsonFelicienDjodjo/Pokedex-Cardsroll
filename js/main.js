/* nombre de pokemon a prendre */
const pokemonCount= 151;

/* Chemin a suivre pour attribuer des valeur dans mon pokedex */

var pokedex={}; // {1 : {"name" : "bulbsaur", "img" : url, type : ["grass","poison"], "desc" : "...."}}

/* function asynchrone  */

window.onload = async function () {
    //getPokemon(1);

    /* Ajoutons a chaque fois une valeur pour le pokemon suivant*/
    for (let i = 1; i<= pokemonCount; i++) {
        await getPokemon(i);
        //<div id = "1" class="pokemon-name">BULBASAUR</div>
        let pokemon = document.createElement("div")

        /* une fois qu'on click sur le pokemon on obtient les infortions sur son numéro dans le pokedex situé du coté gauche */
        pokemon.id = i;

        /* une fois qu'on click sur le pokemon on obtient les informations sur le nom du pokemon */
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"]. toUpperCase();
        pokemon.classList.add("pokemon-name");

        /* une fois qu'on clique sur un pokemon ca nous l'affiche a gauche avec ses caractéristiques*/
        pokemon.addEventListener("click", updatePokemon);

        document.getElementById("pokemon-list").append(pokemon);
    }

    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
    console.log(pokedex);
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

    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"]

    pokedex[num]= {"name" : pokemonName, "img" : pokemonImg, "type" : pokemonType, "desc" : pokemonDesc}

}

function updatePokemon(){
    document.getElementById("pokemon-img"). src = pokedex[this.id]["img"];

    // En lever le type précèdent
    let typesDiv = document.getElementById("pokemon-types");
    while(!typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    // mis a jour du type
    let types = pokedex[this.id]["types"];
    for(let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typesDiv.append(type);

    }

    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}


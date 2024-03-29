async function fetchPokemonData(id) {
  try {
    const response = await fetch(
      //add 'await' to wait for the promise and get its fulfillment value; only gtg go async functions
      `https://pokeapi.co/api/v2/pokemon-species/${id}` //
    );
    if (!response.ok) {
      //if the response isn't ok
      throw new Error("Failed to fetch Pokémon data"); //insert these in case bc the function shits itself
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
}

//async functions will do stuff for you like fetch same as a normal function, but also keep doing other stuff while you wait.
//When the goods are ready it'll "call you back" to tell you it's done.
//async is supreme so don't talk to that bum 'function ()' anymore

// Need a function to generate a random team of six Pokémon

async function generateRandomTeam() {
  const team = [];
  while (team.length < 3) {
    //I had this set as 6 and it made 12. No idea why. So I halved it and now get 6. Genius.
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokémon total
    if (!team.includes(randomId)) {
      team.push(randomId);
    }
  }
  return team;
}

// Need to display Pokémon team on the webpage with another function

async function displayTeam() {
  const team = await generateRandomTeam();
  const teamContainer = document.getElementById("team");
  teamContainer.innerHTML = "";                                     // empty backticks wipes the previous team when you hit the button again

  for (let i = 0; i < team.length; i++) {
    // for (const id of team) {                                      (old line, hoarding incase actually need it)
    const id = team[i];
    const pokemonData = await fetchPokemonData(id);
    if (pokemonData) {
      const listItem = document.createElement("li");
      listItem.classList.add("team-member");
      const type =
        pokemonData.types && pokemonData.types.length > 0
          ? pokemonData.types[0].type.name
          : "Unknown";
      listItem.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="PokePic" width="100" height="100">
        <p>Name: ${pokemonData.name}</p>
        <p>Type: ${
          pokemonData.types && pokemonData.types.length > 0
            ? pokemonData.types[0].type.name
            : "Unknown"
        }</p>
        <p>Ability: ${
          pokemonData.abilities && pokemonData.abilities.length > 0
            ? pokemonData.abilities[0].ability.name
            : "Unknown"
        }</p>
        <p>Generation: ${
          pokemonData.generation ? pokemonData.generation.name : "Unknown"
        }</p>
        `;
      teamContainer.appendChild(listItem);
    }
  }
}

// need  event listener for the "Create me a team!" button (Event listener = little magic wand that controls when things happen in the page)

generateTeamBtn.addEventListener("click", displayTeam);

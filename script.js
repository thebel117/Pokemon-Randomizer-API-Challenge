async function fetchPokemonData(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
};
// This JavaScript function asynchronously fetches data about a Pokémon species from the PokeAPI using its ID. 
// If the fetch operation fails or encounters an error, it logs the error to the console and returns null.

//async functions will do stuff for you like fetch same as a normal function, but also keep doing other stuff while you wait.
//When the goods are ready it'll "call you back" to tell you it's done.

async function fetchPokemonTypeData(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon type data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon type data:', error);
        return null;
    }
};

// Same as above, function fetches data about a Pokémon's type from the PokeAPI using its ID. 
// If the fetch fails or encounters an error, it logs the error to the console and returns null.

async function generateRandomTeam() {
    const team = [];
    while (team.length < 6) {                                 // Decides how many Pokemon will be generated on the team
        const randomId = Math.floor(Math.random() * 898) + 1;
        if (!team.includes(randomId)) {
            team.push(randomId);
        }
    }
    return team;
};

// This JavaScript function generates a random Pokémon team of six members by repeatedly selecting 
// random Pokémon IDs from 1 to 898 (inclusive) until the team has six unique IDs. It then returns the array containing 
// the IDs of the randomly generated team.

async function displayTeam() {                                                  //Makes the team show up on the page
    const team = await generateRandomTeam();
    const teamContainer = document.getElementById('team');
    teamContainer.innerHTML = '';                                               // empty backticks will clear previous team

// generates a random Pokémon team using the generateRandomTeam() function and then displays the team on the webpage. 
// It first retrieves the element with the ID 'team' from the document, clears its content, and then populates it with the new team data.

for (let i = 0; i < team.length; i++) {
    const id = team[i];
    const pokemonData = await fetchPokemonData(id);
if (pokemonData) {
    const listItem = document.createElement('li');

    listItem.classList.add('team-member');

    const generation = pokemonData.generation ? pokemonData.generation.name : "Unknown";
    const eggGroups = pokemonData.egg_groups ? pokemonData.egg_groups.map(group => group.name).join(', ') : "Unknown";

// I need to fetch Pokémon type data, stored on separate part of API than name/gen/egg-group//
    const typeData = await fetchPokemonTypeData(id);
    const type = typeData ? (typeData.types && typeData.types.length > 0 ? typeData.types[0].type.name : "Unknown") : "Unknown";

// Iterates over each Pokémon ID in the generated team. For each ID, it fetches the Pokémon's data using 
// the fetchPokemonData() function and its type data using the fetchPokemonTypeData() function. Then, it creates a list item element 
// representing the Pokémon, displaying its name, generation, egg groups, and type. If the data is unavailable, it displays "Unknown".

listItem.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="PokePic" width="300" height="300">
                <p>Name: ${pokemonData.name}</p>
                <p>Generation: ${generation}</p>
                <p>Egg-Group: ${eggGroups}</p>
                <p>Type: ${type}</p>
                `;
            teamContainer.append(listItem);
        }
    }
};

// Populates each list item (<li>) with data for a Pokémon from the generated team. It sets the HTML content of each list item with an 
// image sourced from the PokeAPI sprites, along with the Pokémon's info. Appends each list item to the container element representing 
// the team.

// Page needs an event listener for the "Create me a team!" button to make it do the things

const generateTeamBtn = document.getElementById('generateTeamBtn');         //Refers back to the button made on the HTML sheet
generateTeamBtn.addEventListener('click', displayTeam);                     //clicking button = team generated

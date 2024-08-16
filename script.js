const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const allValidPokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const fetchAllPokemonData = async () => {
    try {
        const res = await fetch(allValidPokemonUrl);
        const data = await res.json();
        showPokemonData(data);
    } catch (err) {
        console.log(err);
    }
};

const fetchSpecificPokemonData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showSpecificPokemonData(data);
    } catch (err) {
        console.log(err);
    }
};

const fetchPokemonById = async (id) => {
    const pokemonUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`;
    try {
        const res = await fetch(pokemonUrl);
        if (!res.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await res.json();
        showSpecificPokemonData(data);
    } catch (err) {
        alert('Pokémon not found');
    }
};

const showPokemonData = (data) => {
    const { results } = data;
    const searchValue = searchInput.value.toLowerCase();
    const id = parseInt(searchValue);

    if (isNaN(id)) {
        const pokemon = results.find(item => searchValue === item.name.toLowerCase());
        if (pokemon) {
            fetchSpecificPokemonData(pokemon.url);
        } else {
            alert('Pokémon not found');
        }
    } else {
        fetchPokemonById(id);
    }
};

const showSpecificPokemonData = (data) => {
    const { height, weight, name, id, stats, sprites, types } = data;

    document.getElementById('pokemon-name').innerText = `${name.toUpperCase()}`;
    document.getElementById('pokemon-id').innerText = `#${id}`;
    document.getElementById('weight').innerText = `Weight: ${weight}`;
    document.getElementById('height').innerText = `Height: ${height}`;

    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = `<img src="${sprites.front_default}" alt="${name}-img" id="sprite">`;

    const typesElement = document.getElementById('types');
    typesElement.innerHTML = '';
    typesElement.innerHTML = types.map(el => {
        return `<span class="type ${el.type.name}">${el.type.name}</span>`;
    }).join('');

    document.getElementById('hp').innerText = `${stats[0].base_stat}`;
    document.getElementById('attack').innerText = `${stats[1].base_stat}`;
    document.getElementById('defense').innerText = `${stats[2].base_stat}`;
    document.getElementById('special-attack').innerText = `${stats[3].base_stat}`;
    document.getElementById('special-defense').innerText = `${stats[4].base_stat}`;
    document.getElementById('speed').innerText = `${stats[5].base_stat}`;
};

searchButton.addEventListener('click', fetchAllPokemonData);
searchInput.addEventListener('keypress', e => {
    if (e.key === "Enter")
        e.preventDefault();
    fetchAllPokemonData
})
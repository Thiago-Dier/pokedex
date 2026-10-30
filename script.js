
async function buscarPokemon(nome) {

    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome}`
    );

    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado!");
    }

    const dados = await resposta.json();

    return dados;
}


function mostrarCarta(pokemon) {

    const nome = pokemon.name.charAt(0).toUpperCase()
        + pokemon.name.slice(1);

    const altura = pokemon.height / 10;
    const peso = pokemon.weight / 10;

    const imagem = pokemon.sprites.other["official-artwork"].front_default;

    const tipos = pokemon.types.map(item => item.type.name).join(", ");

    const hp = pokemon.stats[0].base_stat;
    const ataque = pokemon.stats[1].base_stat;
    const defesa = pokemon.stats[2].base_stat;
    const velocidade = pokemon.stats[5].base_stat;

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <div class="carta">
            <h2>#${pokemon.id} - ${nome}</h2>
            <img src="${imagem}" alt="${nome}">
            <p><strong>Tipo:</strong> ${tipos}</p>
            <p><strong>Altura:</strong> ${altura} m</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <h3>Atributos</h3>
            <p>HP: ${hp}</p>
            <p>Ataque: ${ataque}</p>
            <p>Defesa: ${defesa}</p>
            <p>Velocidade: ${velocidade}</p>
        </div>
    `;
}


const formulario = document.getElementById("formulario");
const campoPokemon = document.getElementById("pokemon");

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = campoPokemon.value.trim().toLowerCase();
    const resultado = document.getElementById("resultado");

    if (nome === "") {
        resultado.innerHTML = "<p>Digite o nome de um Pokémon!</p>";
        campoPokemon.focus();
        return;
    }

    resultado.innerHTML = "<p>Carregando...</p>";

    try {
        const pokemon = await buscarPokemon(nome);
        mostrarCarta(pokemon);

    } catch (erro) {
        resultado.innerHTML = "<p>Pokémon não encontrado. Tente novamente!</p>";
    }

    campoPokemon.focus();

});

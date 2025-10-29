let allPokemon = [];

// Remplir le select avec les types
function populateTypeSelect(pokemon) {
    const types = new Set();
    pokemon.forEach(p => {
        p.type.forEach(t => types.add(t));
    });
    
    const select = document.getElementById('type');
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    });
}

// Afficher les Pokémon
function displayPokemon(pokemon) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (pokemon.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">Aucun Pokémon trouvé</div>';
        return;
    }

    pokemon.forEach(p => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        
        const types = p.type.map(t => 
            `<span class="pokemon-type">${t}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="pokemon-id">#${p.id}</div>
            <div class="pokemon-name">${p.name.french}</div>
            <div>${types}</div>
        `;
        
        resultsDiv.appendChild(card);
    });
}

// Filtrer les Pokémon
function filterPokemon() {
    const idFilter = document.getElementById('id').value.trim();
    const nomFilter = document.getElementById('nom').value.trim().toLowerCase();
    const typeFilter = document.getElementById('type').value;

    let filtered = allPokemon;

    if (idFilter) {
        filtered = filtered.filter(p => p.id == idFilter);
    }

    if (nomFilter) {
        filtered = filtered.filter(p => 
            p.name.french.toLowerCase().includes(nomFilter)
        );
    }

    if (typeFilter) {
        filtered = filtered.filter(p => p.type.includes(typeFilter));
    }

    displayPokemon(filtered);
}

// Événement clic sur le bouton filtrer
document.getElementById('filtrer').addEventListener('click', function() {
    fetch('pokemon.json')
        .then(response => response.json())
        .then(data => {
            allPokemon = data;
            if (document.getElementById('type').options.length === 1) {
                populateTypeSelect(allPokemon);
            }
            filterPokemon();
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.getElementById('results').innerHTML = 
                '<div class="no-results" style="color: red;">Erreur lors du chargement des données</div>';
        });
});


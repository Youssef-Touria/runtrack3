<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 03 - Filtrage Pokémon</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Filtrage des Pokémon</h1>
    
    <div class="filter-form">
        <div class="form-group">
            <label for="id">ID :</label>
            <input type="text" id="id" placeholder="Ex: 25">
        </div>
        
        <div class="form-group">
            <label for="nom">Nom :</label>
            <input type="text" id="nom" placeholder="Ex: Pikachu">
        </div>
        
        <div class="form-group">
            <label for="type">Type :</label>
            <select id="type">
                <option value="">Tous les types</option>
            </select>
        </div>
        
        <button type="button" id="filtrer">Filtrer</button>
    </div>

    <div id="results"></div>
    
    <script src="script.js"></script>
</body>
</html>
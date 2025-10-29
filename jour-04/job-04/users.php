<?php
header('Content-Type: application/json');

// Configuration de la connexion à la base de données
$host = 'localhost';
$dbname = 'utilisateurs';
$username = 'root';
$password = '';

try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Requête pour récupérer tous les utilisateurs
    $query = "SELECT id, nom, prenom, email FROM utilisateurs ORDER BY id";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    // Récupérer tous les résultats
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Retourner les données en JSON
    echo json_encode($users);
    
} catch(PDOException $e) {
    // En cas d'erreur, retourner un message d'erreur en JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
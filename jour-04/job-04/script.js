// Fonction pour charger et afficher les utilisateurs
function loadUsers() {
    fetch('users.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            
            // Vérifier s'il y a une erreur
            if (data.error) {
                tableBody.innerHTML = `<tr><td colspan="4" class="error">Erreur: ${data.error}</td></tr>`;
                return;
            }
            
            // Vérifier si des utilisateurs existent
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4" class="no-data">Aucun utilisateur trouvé</td></tr>';
                return;
            }
            
            // Afficher chaque utilisateur
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nom}</td>
                    <td>${user.prenom}</td>
                    <td>${user.email}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '<tr><td colspan="4" class="error">Erreur lors du chargement des données</td></tr>';
        });
}

// Charger les utilisateurs au clic sur le bouton
document.getElementById('update').addEventListener('click', loadUsers);

// Charger les utilisateurs au chargement de la page
window.addEventListener('load', loadUsers);
//gestion des bouttons 
const inputElement = document.querySelector('#input-user');
const boutonAfficher = document.querySelector('#btn-find');
const imageElement = document.querySelector('.imagePP');
const idElement = document.querySelector('#id-user');
const nomElement = document.querySelector('#nom-user');
const repElement = document.querySelector('#rep-user');
const dateElement = document.querySelector('#date-user');

boutonAfficher.addEventListener('click', function () {
	console.log(inputElement.value);
    fetch('https://api.github.com/users/' + inputElement.value)
		.then(reponse =>  {
			if(!reponse.ok) {
				if(reponse.status === 404){
					window.alert(`Utilisateur ${inputElement.value} instrouvable.`);
				} else {
					throw new Error('Erreur ' + reponse.status);
				}
			}
			return reponse.json();
		})
		.then(data => {
			const dateDonnee = new Date(data.created_at);
			const dateActuelle = new Date();
			const millisecondsDateDonnee = dateDonnee.getTime();
			const millisecondsDateActuelle = dateActuelle.getTime();
			const differenceMilliseconds = millisecondsDateActuelle - millisecondsDateDonnee;
			const differenceJours = Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24));
			
			
			
			imageElement.src = data.avatar_url ?? "";
			idElement.innerText = data.id ?? "";
			nomElement.innerText = data.name ?? "";
			repElement.innerText = data.public_repos ?? "";
			dateElement.innerText = `${differenceJours} jours` ?? "";
		})
});

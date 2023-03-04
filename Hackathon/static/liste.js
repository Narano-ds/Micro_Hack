doAfficherPersons1()
// cursus etudiant pagee etudiants
function getPersons () {
	const inputBox = document.querySelector("input");
	id=inputBox.value;
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData/'+id);	
	httpRequest.onreadystatechange = doAfficherPersons;	
	httpRequest.send();
}

function doAfficherPersons1 () {
	const table =document.getElementsByTagName("table")[0];
	rows = table.getElementsByClassName("row");
	for(row of rows){
			row.remove();
	}
	lignes=0;
	total_points = 0;
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendallData');
	httpRequest.onreadystatechange = function(){
		if (httpRequest.readyState === XMLHttpRequest.DONE) {	
			if (httpRequest.status === 200) {	
				reponse = httpRequest.responseText;	
				persons = JSON.parse(reponse)
				console.log(persons)		
				for (person of persons) { 
					
					//doInsert(person.annee, person.specialite, person.nom,person.prenom,person.sexe,person.id,person.Matricule,person.moyenne);
				}	
			} 
			else {
					alert('Petit soucis');
			}
		}}
		httpRequest.send();
}
function deletePerson(){
	const table =document.getElementsByTagName("table")[0];
	rows = table.getElementsByClassName("row");
	for(row of rows){
			row.remove();
	}
}
// afficher cursus etudiant pagee etudiants
function doAfficherPersons() {
	const table =document.getElementsByTagName("table")[0];
	rows = table.getElementsByClassName("row");
	for(row of rows){
			row.remove();
	}
	lignes=0;
	total_points = 0;
	if (httpRequest.readyState === XMLHttpRequest.DONE) {	
		if (httpRequest.status === 200) {	
			reponse = httpRequest.responseText;	
			persons = JSON.parse(reponse)
			console.log(persons)
			deletePerson()		
			for (person of persons) { 
				
				doInsert(person.annee, person.specialite, person.nom,person.prenom,person.sexe,person.id,person.Matricule,person.moyenne);
			}	
		} 
		else {
				alert('Petit soucis');
		}
	}
}

function doInsertRowTable(annee, spec,nom,prenom,sexe,id,matricule, moy){
	const table = document.getElementsByTagName("table")[0];
	row = document.createElement("tr");	

	row.setAttribute("class", "row");

	col1 = document.createElement("td");
	col2 = document.createElement("td");
	col3 = document.createElement("td");
    col4 = document.createElement("td");
	col5 = document.createElement("td");
	col6 = document.createElement("td");
    col7 = document.createElement("td");
	col8 = document.createElement("td");

	
	col1.innerText = matricule;
	col2.innerText = annee;
	col3.innerText = nom;
    col4.innerText = prenom;
	col5.innerText = sexe;
	col6.innerText = id;
    col7.innerText = spec;
	col8.innerText = moy;

		
	row.append(col1);
	row.append(col2);
	row.append(col3);	
    row.append(col4);
    row.append(col5);
    row.append(col6);
    row.append(col7);
    row.append(col8);
	
	table.append(row);
}

function doInsert(annee, spec,nom,prenom,sexe,id,matricule, moy){	
	
	doInsertRowTable(annee, spec,nom,prenom,sexe,id,matricule, moy);	
}

new Chart(document.getElementById("polar-chart"), {
	type: 'polarArea',
	data : {
		datasets: [{
			backgroundColor: ["#a6e4f2", "#005073","#1ebbd7","#107dac","#005073","#0000ff "],

			data: [20, 40, 40]
		}],
	
		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			'18-35',
			'35-45',
			'45+'
		]
	},
	options: {
	  title: {
		display: true,
	  },
	  legend:{
		position: 'left'
	}
	}
});

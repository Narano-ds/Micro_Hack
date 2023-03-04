loadData();
/****************************** page index *******************************************/
function loadData(){	
	//nombre d'etudiant par section
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
		    update_BigNumbers(jsonData1);			
		}
	};
	httpRequest.send();

	//nombre d'etudiant par année
	httpRequest1 = new XMLHttpRequest();	
	httpRequest1.open('GET', '/api/data1');
	httpRequest1.onreadystatechange = function () {
		if (httpRequest1.readyState === 4 && httpRequest1.status === 200) {
			jsonData1 = JSON.parse(httpRequest1.response);
		    update_Numbers_by_Year(jsonData1);			
		}
	};
	httpRequest1.send();
}

//afficher le nombre d'etudiant par section
function update_BigNumbers(jsonData){	
	var i=1;
	for(d of jsonData){		
		s = document.getElementById("specialite"+i);	
		
		
		specialite = s.getElementsByClassName("numeros")[0];
		
		specialite.innerText = d["nombre"];		
		i++;
	}
	
	
}

// afficher le nombre d'etudiant par année
function update_Numbers_by_Year(jsonData){	
	var i=1;
	for(d of jsonData){		
		specialites = document.getElementById("nb"+i);	
		
		
		specialite = specialites.getElementsByClassName("nb_etud")[0];
		console.log(specialite);
		console.log(d)
		specialite.innerText = d["nombre"]+'\n'+"étudiants " ;		
		i++;
	}
	
	
}


/****************************** page etudiants *******************************************/
// cursus etudiant pagee etudiants
function getPersons () {
	const inputBox = document.querySelector("input");
	id=inputBox.value;
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData/'+id);	
	httpRequest.onreadystatechange = doAfficherPersons;	
	httpRequest.send();
}
// afficher cursus etudiant pagee etudiants
function doAfficherPersons () {
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
			for (person of persons) { 
				nom=document.getElementById("text-etudiant")
				nom1=document.getElementById("text-etudiant1")
				nom.innerText=person.nom+' '+person.prenom+' '+'('+person.sexe+')'
				nom1.innerText=person.nom+' '+person.prenom+' '+'('+person.sexe+')'
				if (person.sexe=='H'){
					nom.style.color='#6979F8';
				}
				else{
					nom.style.color='#E85766';
				}
				doInsert(person.annee, person.specialite, person.moyenne);
			}	
		} 
		else {
				alert('Petit soucis');
		}
	}
}

function doInsertRowTable(annee, spec, moy){
	const table = document.getElementsByTagName("table")[0];
	row = document.createElement("tr");	

	row.setAttribute("class", "row");

	col1 = document.createElement("td");
	col2 = document.createElement("td");
	col3 = document.createElement("td");
	
	col1.innerText = annee;
	col2.innerText = spec;
	col3.innerText = moy;
		
	row.append(col1);
	row.append(col2);
	row.append(col3);	
	
	table.append(row);
}

function doInsert(annee,specialite, moyenne){	
	
	doInsertRowTable(annee, specialite, moyenne);	
}





/****************************** page specialité *******************************************/
//liste d'etudiants de la specialité n
function getPersons_par_specialité () {
	const inputBox = document.querySelector("input");
	id=inputBox.value;
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData_spec/'+id);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			num=document.getElementById("text-specialité")
			num.innerText= id
		}
	};
	httpRequest.send();
}

//podium par année et specialité 
function getPersons_par_specialité_et_année () {
	const inputBox = document.getElementById("input-spec");
	id=inputBox.value;
	const annee = document.getElementById("input-année");
	a=annee.value;

	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData_spec1/'+id+'&'+a);	
	httpRequest.onreadystatechange = doAfficherPersons_par_specialité;	
	httpRequest.send();
}
// afficher podium par année et specialité 
function doAfficherPersons_par_specialité  () {
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
			for (person of persons) { 
				nom_prenom = person.nom+' '+person.prenom;
				
				doInsert(person.annee, nom_prenom, person.moyenne);
			}	
		} 
		else {
				alert('Petit soucis');
		}
	}
}

function doInsertRowTable(annee, spec, moy){
	const table = document.getElementsByTagName("table")[0];
	row = document.createElement("tr");	

	row.setAttribute("class", "row");

	col1 = document.createElement("td");
	col2 = document.createElement("td");
	col3 = document.createElement("td");
	
	col1.innerText = annee;
	col2.innerText = spec;
	col3.innerText = moy;
		
	row.append(col1);
	row.append(col2);
	row.append(col3);	
	
	table.append(row);
}

/****************************** page annee *******************************************/
//listes d'etudiants par année
function getPersons_par_année () {
	const inputBox = document.querySelector("input");
	id=inputBox.value;
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData_annee/'+id);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			num=document.getElementById("text-annee")
			num.innerText= id
		}
	};
	httpRequest.send();
}

//podium par année 
function getPersons_par_année_et_specialité () {
	const inputBox = document.getElementById("input-année");
	a=inputBox.value;
	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData_spec2/'+a);	
	httpRequest.onreadystatechange = doAfficherPersons_par_année;	
	httpRequest.send();
}
//afficher podium par année 
function doAfficherPersons_par_année  () {
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
			num=document.getElementById("text-anne")
			num.innerText= id	
			for (person of persons) { 
				nom_prenom = person.nom+' '+person.prenom;
				
				doInsert(person.specialite, nom_prenom, person.moyenne);
			}	
		} 
		else {
				alert('Petit soucis');
		}
	}
}
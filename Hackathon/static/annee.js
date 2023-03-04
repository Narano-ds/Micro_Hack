loadData_annee()
function loadData_annee(){
	const input = document.querySelector("#input-année");
	id=input.value;
	if(id==""){
		input.value=2019
		id=input.value;
		txt = document.querySelector("#text-annee");
		txt.innerText=2019;
	}    	
    httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/Getperson_f_h_année/'+id);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
            console.log(jsonData1);
			update_pie(jsonData1);	           			
		}
	};
    httpRequest.send();

    httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/Getperson_spec_année/'+id);
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
            console.log(jsonData2);
			update_pie2(jsonData2);	
            	
		}
	};
    httpRequest2.send();

    httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/Getperson_plus10_année/'+id);
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData3 = JSON.parse(httpRequest3.response);
            console.log(jsonData3);
            update_pie3(jsonData3);			
		}
	};
    httpRequest3.send();

    httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/nb_students_per_year/'+id);
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData4 = JSON.parse(httpRequest4.response);
            console.log('js4:',jsonData4);
			update_Lines(jsonData4);
		}
	};
	httpRequest4.send();

    httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/moyennes_par_année/'+id);
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			jsonData5 = JSON.parse(httpRequest5.response);
			update_Bars(jsonData5);			
		}
	};
	httpRequest5.send();
	
}



function update_pie(jsonData){	
	var labels = jsonData.map(function(e) {
		return e.sexe;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.number;
	 });
     console.log(labels);
	 new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [
			{
			  backgroundColor: ["#D1627B", "#8EDBE9"],
			  data: data
			}
		  ]
		},

		options: {
        legend:{
            display:false,
                labels:{
                    usePointStyle:true,
                    pointStyle:"rectR"
                }
            }
        ,
		  title: {
			display: true,
            text:"Femme et homme (année)",
            position:"bottom"
		  }
		}
	});
    document.getElementById("pie-chart").style.width = "165px";
	document.getElementById("pie-chart").style.height= "115px";
}

function update_pie2(jsonData){	
	var labels = jsonData.map(function(e) {
		return e.specialite;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.number;
	 });
     console.log(labels);
	 new Chart(document.getElementById("pie-chart2"), {
		type: 'polarArea',
		data: {
		  labels: labels,
		  datasets: [
			{
			  backgroundColor: ["#D1627B", "#8EDBE9","#FEC37C","#A6EC8D","#E76B25","#BB1616","#711F8E"],
			  data: data
			}
		  ]
		},
		options: {
        legend:{
            display:false,
                labels:{
                    usePointStyle:true,
                    pointStyle:"rectR"
                }
            }
        ,
		title: {
			display: true,
            text:"nb étudiants par specialité ",
            position:"bottom"
		  }
		}
	});
    document.getElementById("pie-chart2").style.width = "180px";
	document.getElementById("pie-chart2").style.height= "130px";
}

function update_pie3(jsonData){	
	var labels = jsonData.map(function(e) {
		return e.specialite;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.n;
	 });
     console.log(labels);
	 new Chart(document.getElementById("pie-chart3"), {
		type: 'doughnut',
		data: {
		  labels: labels,
		  datasets: [
			{
			  backgroundColor: ["#D1627B", "#8EDBE9","#FEC37C","#A6EC8D","#E76B25","#BB1616","#711F8E"],
			  data: data
			}
		  ]
		},
		options: {
            
				legend:{
                    display:false,
					labels:{
						usePointStyle:true,
						pointStyle:"rectR"
					}
				}
			,
		  title: {
			display: true,
            text:"Nb etudiants Admis",
            position:"bottom"
		  }

		}
	});
    document.getElementById("pie-chart3").style.width = "180px";
	document.getElementById("pie-chart3").style.height= "130px";
}

function update_Lines(jsonData){
	var labels = jsonData.specialite;
    
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {	
            					
			responsive: false,
			maintainAspectRatio: true,
            
                legend:{
                position:"left",
                labels:{
                    usePointStyle:true,
                    pointStyle:"rectR",
                    
                }
            
            }
            
		}
	});
    document.getElementById("line-chart").style.width = "340px";
	document.getElementById("line-chart").style.height= "170px";
}

function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.specialite;
	});
	
	var data = jsonData.map(function(e) {
	   return e.n;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Students",
			  backgroundColor: ["#D1627B", "#8EDBE9","#FEC37C","#A6EC8D","#E76B25","#BB1616","#711F8E"],
			  data: data
			}
		  ]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
		  }
		}
	});
    document.getElementById("bar-chart").style.width = "300px";
	document.getElementById("bar-chart").style.height= "180px";
}
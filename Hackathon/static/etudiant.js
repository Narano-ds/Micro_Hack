loadData_etudiant()
function loadData_etudiant(){	
    const inputBox = document.querySelector("input");
	id=inputBox.value;
	if(id==""){
		inputBox.value=2019001
		id=inputBox.value;
	}   
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/sendData/'+id);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			update_Bars(jsonData1);			
		}
	};

	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2/'+id);
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
            console.log(jsonData2);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();
}

function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.moyenne;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Students",
			  backgroundColor: ["#FEC37C", "#E85766","#8EDBE9"],
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
		  legend: { display: true, 
                    position: 'bottom'},
		  
		}
	});
    document.getElementById("bar-chart").style.width = "380px";
	document.getElementById("bar-chart").style.height= "180px";
}

function update_Lines(jsonData){
	var labels = jsonData.annee;
	
	console.log(jsonData.datasets)
	jsonData.datasets[0].fill = false;				  
	jsonData.datasets[0].borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	jsonData.datasets[0].borderWidth=2;
	jsonData.datasets[0].radius=1;			
		
	
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
				position:'bottom'
			}
		}
	});
    document.getElementById("line-chart").style.width = "400px";
	document.getElementById("line-chart").style.height= "170px";
}
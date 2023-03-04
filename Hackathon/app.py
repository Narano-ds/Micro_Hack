from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json

# Step_1
from flaskext.mysql import MySQL

app = Flask(__name__)
# Step_2
mysql = MySQL()

# Step_4
app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

# Step_3
mysql.init_app(app)



app = Flask(__name__)
@app.route('/')
def begin():
	return render_template('debut.html')

@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/etudiant')
def etud():
	return render_template('etudiant.html')

@app.route('/data_visualization')
def data():
	return render_template('data_vis.html')
	
@app.route('/spec')
def spec():
	return render_template('spec.html')

@app.route('/annees')
def annee():
	return render_template('annee.html')

@app.route('/liste')
def liste():
	return render_template('liste.html')

@app.route('/debut')
def debut():
	return render_template('debut.html')

#nombre d'etudiant par section
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT count(*) as nombre FROM resultats group by specialite;")	

	data = cursor.fetchall()
	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	
	#data_JSON = json.dumps(data2)	
	#sreturn data_JSON 

#nombre d'etudiant par année
@app.route('/api/data1')
def doGetData1():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT count(*) as nombre FROM resultats group by annee;")	

	data = cursor.fetchall()
	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	
	#data_JSON = json.dumps(data2)	
	#sreturn data_JSON 	
#les moyennes de chaque année de l'etudiant n
@app.route('/api/data2/<string:id>')
def doGetData2(id):
	
	data = {"annee":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats group by Matricule")	

	annee_tuple = cursor.fetchall()
	annee_list =  [item[0] for item in annee_tuple]
	data["annee"]=annee_list	

	cursor.execute("SELECT DISTINCT moyenne FROM resultats WHERE Matricule="+id+";")	

	specialite_tuple = cursor.fetchall()
	moyenne_list =  [item[0] for item in specialite_tuple]
	
	for moyenne in moyenne_list:
		data["datasets"].append({"label":moyenne, "data":moyenne_list})	
	
	data_JSON = json.dumps(data)	
	print(data)
	return data_JSON 	

# cursus etudiant pagee etudiants
@app.route('/api/sendData/<string:id>', methods=["GET"]) 
def searchPerson(id): 
    
    
	conn = mysql.connect()	
	cursor =conn.cursor()	

	cursor.execute("SELECT *  FROM resultats WHERE Matricule="+id+";")	
	
	data = cursor.fetchall()
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

# cursus etudiant pagee etudiants
@app.route('/api/sendallData', methods=["GET"]) 
def getallPersons(): 
      
	conn = mysql.connect()	
	cursor =conn.cursor()	

	cursor.execute("SELECT *  FROM resultats")	
	
	data = cursor.fetchall()
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


#liste d'etudiants de la specialité n
@app.route('/api/sendData_spec/<string:id>', methods=["GET"])
def searchPerson_par_specialité(id): 
    
    
	conn = mysql.connect()	
	cursor =conn.cursor()	

	cursor.execute("SELECT *  FROM resultats WHERE specialite='SPECIALITE_"+id+"';")	

	data = cursor.fetchall()
	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


#podium par année et specialité 
@app.route('/api/sendData_spec1/<string:id>&<string:a>', methods=["GET"])
def searchPerson_par_specialité_et_année(id,a): 
    
    
	conn = mysql.connect()	
	cursor =conn.cursor()	

	cursor.execute("SELECT * FROM resultats  WHERE specialite='SPECIALITE_"+id+"' AND annee="+a+" ORDER BY moyenne DESC LIMIT 3;")	

	data = cursor.fetchall()
	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

#podium par année 
@app.route('/api/sendData_spec2/<string:id>', methods=["GET"])
def podium_année(id): 
    
    
	conn = mysql.connect()	
	cursor =conn.cursor()	

	cursor.execute("SELECT * FROM resultats  WHERE annee="+id+" ORDER BY moyenne DESC LIMIT 3;")	

	data = cursor.fetchall()
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


#listes d'etudiants par année
@app.route('/api/sendData_annee/<string:id>', methods=["GET"])
def searchPerson_par_année(id): 
    
    
	conn = mysql.connect()	
	cursor =conn.cursor()	

	cursor.execute("SELECT *  FROM resultats WHERE annee="+id+";")	

	data = cursor.fetchall()
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

#nombre d'homme et femme par annee
@app.route('/api/Getperson_f_h_année/<string:id>', methods=["GET"])
def Getperson_f_h_année(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT sexe,COUNT(*) as number FROM resultats WHERE annee="+id+" GROUP BY sexe;")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)
#nombre d'etudiants par specialité annee n
@app.route('/api/Getperson_spec_année/<string:id>', methods=["GET"])
def Getperson_spec_année(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT specialite,COUNT(*) as number FROM resultats WHERE annee="+id+" GROUP BY specialite;")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)
#nombre d'etudiants par specialité annee n avec une moyenne > 10
@app.route('/api/Getperson_plus10_année/<string:id>', methods=["GET"])
def Getperson_plus10_année(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select specialite, count(*) as n from resultats where annee="+id+" and moyenne>=10 group by specialite;")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)

#nombre de femme et homme par specialite année n
@app.route('/api/nb_students_per_year/<string:id>', methods=["GET"])
def nb_students_per_year(id):
	
	data = {"specialite":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	data["specialite"]=specialite_list	

	cursor.execute("SELECT DISTINCT sexe FROM resultats")	

	sexe_tuple = cursor.fetchall()
	sexe_list =  [item[0] for item in sexe_tuple]
	
	for sexe in sexe_list:
		cursor.execute("SELECT count(*) as n  FROM resultats WHERE sexe='"+sexe+"' and annee="+id+" group by specialite")	
		n_tuple = cursor.fetchall()
		n_list =  [item[0] for item in n_tuple]
		data["datasets"].append({"label":sexe, "data":n_list})	
	
	data_JSON = json.dumps(data)	
	print(data)
	return data_JSON 	


#moyenne generale par année
@app.route('/api/moyennes_par_année/<string:id>', methods=["GET"])
def moyennes_par_année(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select specialite, AVG(moyenne) as n from resultats where annee="+id+" group by specialite")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)








#nombre d'homme et femme par specialité
@app.route('/api/Getperson_f_h_spec/<string:id>', methods=["GET"])
def Getperson_f_h_spec(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT sexe,COUNT(*) as number FROM resultats WHERE specialite='SPECIALITE_"+id+"' GROUP BY sexe;")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)


#nombre d'etudiants par année specialité n
@app.route('/api/Getperson_annee_spec/<string:id>', methods=["GET"])
def Getperson_annee_spec(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee,COUNT(*) as number FROM resultats WHERE specialite='SPECIALITE_"+id+"' GROUP BY annee;")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)

#nombre d'etudiants par specialité annee n avec une moyenne > 10
@app.route('/api/Getperson_plus10_spec/<string:id>', methods=["GET"])
def Getperson_plus10_spec(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select annee, count(*) as n from resultats where specialite='SPECIALITE_"+id+"' and moyenne>=10 group by annee;")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)

#nombre de femme et homme par specialite année n
@app.route('/api/nb_students_per_spec/<string:id>', methods=["GET"])
def nb_students_per_sec(id):
	
	data = {"specialite":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	annee_tuple = cursor.fetchall()
	annee_list =  [item[0] for item in annee_tuple]
	data["annee"]=annee_list	

	cursor.execute("SELECT DISTINCT sexe FROM resultats")	

	sexe_tuple = cursor.fetchall()
	sexe_list =  [item[0] for item in sexe_tuple]
	
	for sexe in sexe_list:
		cursor.execute("SELECT count(*) as n  FROM resultats WHERE sexe='"+sexe+"' and specialite='SPECIALITE_"+id+"' group by annee")	
		n_tuple = cursor.fetchall()
		n_list =  [item[0] for item in n_tuple]
		data["datasets"].append({"label":sexe, "data":n_list})	
	
	data_JSON = json.dumps(data)	
	print(data)
	return data_JSON 	

#moyenne generale des 3 annee par specialité
@app.route('/api/moyennes_par_spec/<string:id>', methods=["GET"])
def moyennes_par_spec(id):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select annee, AVG(moyenne) as n from resultats where specialite='SPECIALITE_"+id+"' group by annee")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
	print(json_data)				
	return jsonify(json_data)


if __name__ == '__main__':
	app.run(debug=True, port=5000)
	
	
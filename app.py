from flask import Flask,request ,redirect ,url_for ,render_template,flash,session
from werkzeug.utils import secure_filename
from lxml import etree
import os
from xml.etree import ElementTree
import xml.etree.cElementTree as ET 
#import magic
import urllib.request


app = Flask(__name__)

app.secret_key = "Cairocoders-Ednalan"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

''' BASE DE DONNER '''
ntree = ET.parse('static/BD/users.xml')
root = ntree.getroot()

@app.route('/')
def Home_page():
 return render_template('page_Home.html')

''' Register '''
@app.route('/Register.html')
def register_page():
      if 'username' in session:
            return render_template('Accueil.html')
      return render_template('Register.html')

@app.route('/Register.html', methods=['POST'])
def register_file():
      
      check=request.form['check']
      ''' Login  & Register '''
      if check=="login":
            email=request.form['email']
            password=request.form['pass']

            if userRech(email,password):
               session['username'] = getUser(email,password)
              
               return redirect('/Accueil.html')
            else:
               flash(str(3))
               return redirect('/Register.html')
      elif check=="register":
            nom=request.form['nom']
            prenom=request.form['prenom']
            email=request.form['email']
            password=request.form['pass']
            val=2
            if userExists(email):
                val=1
            else:
                AjouterUser(nom,prenom,email,password)
          
            flash(str(val))
            return redirect('/Register.html')
             
        
     


@app.route('/Accueil.html')
def accueil_page():
 return render_template('Accueil.html')

@app.route('/logout.html')
def logout_page():
  session.pop('username')    
  return redirect('/')

''' DTD Externe '''

@app.route('/dtdexterne.html')
def dtdexterne_page():
 return render_template('dtdexterne.html')

@app.route('/dtdexterne.html', methods=['POST'])
def Validationdtd_file():
  etat=False   
  try:   
    filexml=request.files['xmlf']
    filedtd=request.files['dtdf']
    
    xml = etree.parse(filexml)
    dtd = etree.DTD(filedtd)
    
    etat = dtd.validate(xml)     
    
  except etree.XMLSyntaxError as e:
         etat=False 
  flash(str(etat))
  return redirect('/dtdexterne.html')

''' DTD Interne '''
@app.route('/dtdinterne.html')
def dtdinterne_page():
 return render_template('dtdinterne.html')

@app.route('/dtdinterne.html', methods=['POST'])
def ValidationdtdI_file():
  etat=False   
  try:   
    filexml=request.files['xmlf']
    
    xml = etree.parse(filexml)

    dtd = xml.docinfo.internalDTD
    etat = dtd.validate(xml)    
    
  except etree.XMLSyntaxError as e:
         etat=False 
  flash(str(etat))
  return redirect('/dtdinterne.html')


''' XML Schema '''
@app.route('/xmlschema.html')
def xmlschema_page():
 return render_template('xmlschema.html')

@app.route('/xmlschema.html', methods=['POST'])
def ValidationXsd_file():
  etat=False   
  try:   
    filexml=request.files['xmlf']
    filedtd=request.files['dtdf']
    ''' dtd
    xml = etree.parse(filexml)
    dtd = etree.XMLSchema(filedtd)
    
    etat = dtd.validate(xml)     
    '''
    xmlschema_doc = etree.parse(filedtd)
    xmlschema = etree.XMLSchema(xmlschema_doc)

    xml_doc = etree.parse(filexml)
    etat = xmlschema.validate(xml_doc)
    
  except etree.XMLSyntaxError as e:
         etat=False
  flash(str(etat))
  return redirect('/xmlschema.html')




''' Manipulation '''

def getid():
    maxid = 0
    for user in root.findall('user'):
        id= int(user.find('id').text)
        if id>maxid:
            maxid=id
    return maxid+1

def userExists(email):
    
    retValue=False
    for user in root.findall('user'):
        emailb = user.find('email').text

        if emailb==email:
            retValue=True
    return retValue

def userRech(email,password):
    
    retValue=False
    for user in root.findall('user'):
        emailb = user.find('email').text
        passwordb = user.find('password').text

        if emailb==email and passwordb==password:
            retValue=True
    return retValue

def AjouterUser(nom,prenom,email,password):
        id=getid()

        
        newuser = ET.SubElement(root, "user")
        
        ET.SubElement(newuser,"id").text = str(id)
        ET.SubElement(newuser, "nom").text = nom
        ET.SubElement(newuser, "prenom").text = prenom
        ET.SubElement(newuser, "email").text = email
        ET.SubElement(newuser, "password").text = password
       
        ntree.write("static/BD/users.xml",encoding="utf-8",xml_declaration=True) 

def getUser(email,password):
    
    for user in root.findall('user'):
        emailb = user.find('email').text
        passwordb = user.find('password').text
        nomComplet=""
        if emailb==email and passwordb==password:
            nomComplet = user.find('nom').text+' '+user.find('prenom').text
        return nomComplet    



if __name__ == '__main__':
 app.run(debug=True)
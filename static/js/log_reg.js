$(document).ready(function(){
             
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");

    $('#login_titre').click(function(){

           $('#login').css("left","50px");
           $('#register').css("left","450px");
           $('#btn').css("left","0");
           $('#login_titre').addClass('active');
           $('#login_titre').removeClass('active2');
           $('#register_titre').removeClass('inactive');
    });

    $('#register_titre').click(function(){

           $('#login').css("left","-400px");
           $('#register').css("left","50px");
           $('#btn').css("left","110px");
           $('#login_titre').removeClass('active');
           $('#login_titre').addClass('active2');
           $('#register_titre').addClass('inactive');
    });


});


/*************************/

const visibilityToggle = document.querySelector('.visibility');

const input = document.querySelector('.reg');

var password = true;

visibilityToggle.addEventListener('click', function() {
  if (password) {
    input.setAttribute('type', 'text');
    visibilityToggle.innerHTML = 'visibility';
  } else {
    input.setAttribute('type', 'password');
    visibilityToggle.innerHTML = 'visibility_off';
  }
  password = !password;
  
});

/****************************/

const visibilityToggle1 = document.querySelector('.visibility1');

const input1 = document.querySelector('.log');

var password1 = true;

visibilityToggle1.addEventListener('click', function() {
  if (password1) {
    input1.setAttribute('type', 'text');
    visibilityToggle1.innerHTML = 'visibility';
  } else {
    input1.setAttribute('type', 'password');
    visibilityToggle1.innerHTML = 'visibility_off';
  }
  password1 = !password1;
  
});

/*********validité de login ********/

//login email
$(document).ready(function(){

$('#login').submit(function (event){

  var pattern = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
  var chaine = $('#login_email').val();
  var pattern1 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/;
  var chaine1 = $('#login_password').val();

  if((pattern.test(chaine)==false)){
    $('.erreur_mail').text("Veuillez saisir une email correct");
    $('.erreur_mail').addClass('mail_log');
    event.preventDefault();
  }else{
    $('.erreur_mail').removeClass('mail_log');
  } 
  
  //login password
  if(pattern1.test(chaine1)==false){
    
    $('.erreur_pass').text("Veuillez saisir un mot de pass correct");
    $('.erreur_pass').addClass('pass_log');
    event.preventDefault();
  }else{
        $('.erreur_pass').removeClass('pass_log');
    }

    var valeur = $('#bd').val();
    if (valeur==0) {
        $('.erreur_pass').text("Mot de passe érroné");
        $('.erreur_pass').addClass('errone');
    }else{
         $('.erreur_pass').removeClass('errone');
    }

});

});

/***********validité de register **********/

$('#register').submit(function (event) {
    
 // nom
  if (($('#reg_nom').val()=="")){
    $('.erreur_nom').text("Veuillez Mr/Ms remplir ce champ");
    $('.erreur_nom').addClass('nom_erreur');
    event.preventDefault();
  }else{
    $('.erreur_nom').removeClass('nom_erreur');
  }

  //prenom
  if($('#prenom_reg').val()==""){
    $('.erreur_prenom').text("Veuillez Mr/Ms remplir ce champ");
    $('.erreur_prenom').addClass('prenom_erreur');
    event.preventDefault();
  }else{
    $('.erreur_prenom').removeClass('prenom_erreur');
  }


    //email
    var pattern2 = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    var mail = $('#email_reg').val();
    if((pattern2.test(mail)==false)){
      $('.erreur_mail_reg').text("Veuillez saisir une email correct");
      $('.erreur_mail_reg').addClass('mail_erreur');
      event.preventDefault();
    }else{
      $('.erreur_mail_reg').removeClass('mail_erreur');
    }

    //password
    var pattern3 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})/;
    var pass = $('#password_reg').val();
    if(pattern3.test(pass)==false){
    
      $('.erreur_pass_reg').text("Veuillez saisir un mot de pass correct au moins 8 caractères une Maj en Min et un chiffre");
      $('.erreur_pass_reg').addClass('pass_erreur');
      event.preventDefault();
    }else{
          $('.erreur_pass_reg').removeClass('pass_erreur');
      }
  
});





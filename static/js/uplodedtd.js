
         
//class
const wrapper1 = document.querySelector("#wrapper1");
const fileName1 = document.querySelector("#file-name1");
//id
const defaultBtn1 = document.querySelector(".default-btn1");
const customBtn1 = document.querySelector("#custom-btn");
const cancelBtn1 = document.querySelector(".cancel-btn1 i");



const imgxml = document.querySelector("#img1");




let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive(){
  defaultBtn1.click();
}


defaultBtn1.addEventListener("change", function(){

  const file1 = this.files[0];
  //var fileTypes = ['xml'];

  if(file1){
    //var extension = file1.name.split('.').pop().toLowerCase();
    //isSuccess = fileTypes.indexOf(extension) > -1;

      /* if(isSuccess)
       {*/
        const reader = new FileReader();
        reader.onload = function(){

        const result = reader.result;
        imgxml.src = "static/js/img/XML.jpg";
        wrapper1.classList.add("active");

        }
        cancelBtn1.addEventListener("click", function(){
           imgxml.src = "";          
           wrapper1.classList.remove("active");
         })
         reader.readAsDataURL(file1);

      // }
      /* else
       {
        defaultBtn1.value = '';  
       }*/
          

  }
  if(this.value){
    let valueStore = this.value.match(regExp);
    fileName1.textContent = valueStore;
  }

});


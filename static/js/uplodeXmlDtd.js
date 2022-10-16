
         
//class
const wrapper1 = document.querySelector("#wrapper1");
const fileName1 = document.querySelector("#file-name1");
//id
const defaultBtn1 = document.querySelector(".default-btn1");
const customBtn1 = document.querySelector("#custom-btn");
const cancelBtn1 = document.querySelector(".cancel-btn1 i");

//class

//id
const wrapper2 = document.querySelector("#wrapper2");
const fileName2 = document.querySelector("#file-name2");
const defaultBtn2 = document.querySelector(".default-btn2");
const cancelBtn2 = document.querySelector(".cancel-btn2 i");


const imgxml = document.querySelector("#img1");
const imgdtd = document.querySelector("#img2");



let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive(){
  defaultBtn1.click();
}

function defaultBtnActive2(){
  defaultBtn2.click();
}




 defaultBtn2.addEventListener("change", function(){

  const file1 = this.files[0];

  if(file1){
     
    const reader = new FileReader();
    reader.onload = function(){

      const result = reader.result;
      imgdtd.src = "static/js/img/DTD.jpg";
      wrapper2.classList.add("active");

    }
    cancelBtn2.addEventListener("click", function(){
      imgdtd.src = "";          
      wrapper2.classList.remove("active");
    })
    reader.readAsDataURL(file1);
  }
  if(this.value){
    let valueStore = this.value.match(regExp);
    fileName2.textContent = valueStore;
  }

});

defaultBtn1.addEventListener("change", function(){

  const file1 = this.files[0];

  if(file1){
     
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
  }
  if(this.value){
    let valueStore = this.value.match(regExp);
    fileName1.textContent = valueStore;
  }

});
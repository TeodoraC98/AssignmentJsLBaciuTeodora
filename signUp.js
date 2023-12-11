class Account{
    email;
    userName;
    password;
    mobileNr;
    constructor(){
      this.email="";
      this.userName="";
      this.password="";
      this.mobileNr="";
    }
    
  setEmailUser(emailUser){
  this.email=emailUser;
 }
setUserName(userName){
  this.userName=userName;
 }
setPassword(password){
  this.password=password;
 }
 setMobileNr(mobileNr){
  this.mobileNr=mobileNr;
 }
}
const userNameContainer=document.querySelector("#sgup-name");
const emailContainer=document.querySelector("#sgup-email");
const passContainer=document.querySelector("#sgup-pass");
const confirmPasswordContainer=document.querySelector("#confirm-pass");
const mobileNrContainer=document.querySelector("#sgup-mobile-nr");
const prefixContainer=document.querySelector("#prefix-selected");
const btnCreate=document.querySelector("#btn-create");
const errorMobileNr=document.querySelector("#err-mobile-nr");
const containerSignUp=document.getElementById("container-create-acc-id");
const containerSignIn=document.getElementById('container-si');
const wrapperSelectCountry=document.getElementById('wrapper-prefix-country');
const selectCountryPrefix=wrapperSelectCountry.querySelector("#select-country-id");
const viewPrefixSelectedCountry=wrapperSelectCountry.querySelector(".prefix-country");
const dateAccount=document.querySelectorAll(".date-sg");
const labelAccountInf=document.querySelectorAll(".lb-sg");
const arrowSelectCountry=wrapperSelectCountry.querySelector("#open-arrow");
var mapCountries=new Map();
var email;
var userName;
var password;
var confirPassword;
var prefix;
var mobileNr;
const account=new Account();
window.onload=function(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET','https://restcountries.com/v3.1/all', true);
  xhr.onload=function(){
      if(xhr.status==200){
          let countries=JSON.parse(this.response);
          countries.forEach(country=>{
              if(country.region==="Europe"){
              let prefix=country.idd.root+country.idd.suffixes;
              let name=country.name.common;
              mapCountries.set(name,prefix); }              
          })
      }else{
          console.log("ERROR")
      } 
      ;
      mapCountries=new Map([...mapCountries].sort());
      createOptionCountryPrefix(mapCountries,selectCountryPrefix);
  }
    xhr.send();
} 
function createOptionCountryPrefix(map,container){
  if(map){  
      map.forEach((value,key)=>{
          var option=document.createElement("option");
          option.textContent=value+" "+key;
         option.setAttribute("value",value);
           container.add(option); 
      })
    }else{
      console.log("Error");
  }
  }
  
  function setDynamicArrow(color,deg,time){
      arrowSelectCountry.removeAttribute("style");
      arrowSelectCountry.style.color=color;        
      arrowSelectCountry.style.transform="rotate("+deg+")";
      arrowSelectCountry.style.transition="'"+time+"s'";
  }
  
  selectCountryPrefix.onclick=function(ev){
  if(ev.detail==1){
  setDynamicArrow("rgb(245, 98, 72)",180,2.2)
  } if(ev.detail==0){
   var prefixCountrySelected=ev.target.options[selectCountryPrefix.selectedIndex].value;
   if(prefixCountrySelected!=null || prefixCountrySelected!==undefined){
   viewPrefixSelectedCountry.textContent=prefixCountrySelected;}
   setDynamicArrow("rgb(95, 94, 94)",0,2.2)
   }
  }
  

function getInformation(element){
    if(element!=null & element.value!=""){
         return element.value;
     }else{
       return null;
     }
   
}
function checkErrorShow(element,classError){
  let idErr=element.dataset.infAccount;
var error=document.getElementById(idErr);
    if(error.classList.contains(classError))
    {error.classList.remove(classError);}
}
function activeErrorShow(element,classError){
let idErr=element.dataset.infAccount;
var error=document.getElementById(idErr);
error.classList.add(classError);
}


function getPassword(passwordContainer, passwordConfCont){

  let password=getInformation(passwordContainer);
  let confPassword=getInformation(passwordConfCont)
  if(password!=null){
  if(validationPassword(password,passwordContainer)){
  if(confPassword!=null){
    if(checkMatchingPassword(password,confPassword)){
      checkErrorShow(passwordConfCont,"error-password")
      return password;
    }else{
      setErrorPasswordMatching(passwordConfCont,"error-password");
         }
  }else{
      activeErrorShow(passwordConfCont,"show-error");
    }
} 
} 
return null;
} 


function checkMatchingPassword(password, configPass){
  if(password===configPass){
    return true;
  }
  else{
    return false;
  }
}
function setErrorPasswordMatching(passwordConfCont,classError){

  let error=getContainerError(passwordConfCont);
  error.textContent="Passwords don't match. Please try again!"
  error.classList.add(classError);
}

 function validationPassword(password,passContainer){
   if(password.length<10){
       let error=getContainerError(passContainer);
       error.textContent="The password is not strong!";
       activeErrorShow(passContainer,"error-password");
       return false;
   }else{
    checkErrorShow(passContainer,"error-password");
    return true;
   }
 }
 function createMobileNumber(prefix, mobileNr){
  if(prefix!=null && mobileNr!=null){
    prefix=prefix.replace("+","00");
    mobileNr=prefix+mobileNr;
    mobileNr=parseInt(mobileNr);}
    return mobileNr;
  }
  function getMobileNumber(prefixContainer,mobileNrContainer){
         let prefix=prefixContainer.textContent;
         let mobileNr=getInformation(mobileNrContainer);
         if(prefix!=""){
          checkErrorShow(prefixContainer,"error-mobile-nr");
              if(mobileNr!=null){
              return  createMobileNumber(prefix,mobileNr);
              }
         }else{
          activeErrorShow(prefixContainer,"error-mobile-nr");
         }
         return null;
  }
  function justLetters(evt){
    evt = (evt) ? evt : window.ev;
    var charC = (evt.which) ? evt.which : evt.keyCode;
    if (charC > 31 && (charC < 65 || charC > 90) && (charC < 97 || charC > 122)) {
        return false;
    }
    return true;
  }
  function clearInfotmation(){
    var listInput=containerSignUp.querySelectorAll(".date-sg");
    for(let item of listInput){
     item.value="";
  }
  prefixContainer.textContent="";
  }
 function dateValidation(){
  if(email!=null & userName!=null & password!=null & mobileNr!=null){
   account.setUserName(userName);
   account.setMobileNr(mobileNr);
   account.setPassword(password);
   account.setEmailUser(email);
    clearInfotmation()
  }else{
    var listInput=containerSignUp.querySelectorAll(".date-sg");
    for(let item of listInput){
      if(item.value===""){
        activeErrorShow(item,'show-error');
      }else{
        checkErrorShow(item,'show-error');
      }
  }
}}
 function getContainerError(element){
  let idErr=element.dataset.infAccount;
var error=document.getElementById(idErr);
return error;
 }
function createAccount(){
         email=getInformation(emailContainer);
         userName=getInformation(userNameContainer);
         password=getPassword(passContainer,confirmPasswordContainer)
         mobileNr=getMobileNumber(prefixContainer,mobileNrContainer);

         dateValidation();
      
   
}
btnCreate.addEventListener("click",()=>{
    createAccount();
})

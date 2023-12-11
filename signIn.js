const signInBtn=document.querySelector('#sign-in-btn');
const accesCreateAcc=document.querySelector("#acces-create-acc");
function changeDimensionLabel(current){
    dateAccount.forEach(element=>{
    if(element.value==="" && element!=current){
    var label=(element.previousSibling).previousSibling;
    label.classList.remove("display-smaller");
    }
    })
    }
    document.addEventListener("click",(ev)=>{
    if(ev.target.closest(".date-account-dv")){
    var label=(ev.target.previousSibling).previousSibling;
    label.classList.add("display-smaller");
    changeDimensionLabel(ev.target);
    }else{
    changeDimensionLabel(ev.target);
    }
    })
    signInBtn.addEventListener("click",()=>{
        console.log("click on btn");
    })
accesCreateAcc.addEventListener("click",()=>{
      containerSignIn.classList.remove("cont-vis");
     containerSignIn.classList.add("hidden");
     containerSignUp.classList.remove("hidden");
      containerSignUp.classList.add("cont-vis");
})

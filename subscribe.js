const btnSubscribe=document.querySelector(".btn_subscr");
const lbEmail=document.querySelector(".lb_email");
const ipEmailSuscr=document.querySelector("#subscribe_ip");


btnSubscribe.addEventListener("click",()=>{
    try {
        if(ipEmailSuscr.value!="")
    { var sp=document.querySelector(".sp_thsubsc");
    lbEmail.textContent="";
    ipEmailSuscr.value="";
sp.style="opacity:1";
        
    }
}catch (error) {
    console.log("Subscribe error!");
}
})
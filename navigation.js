const content=document.getElementById("content");
 const body=document.getElementsByTagName('body');
const wrapperMenu=document.querySelector(".wrapper_menu");
 const navigation=document.querySelector(".container_dropdown_menu");
 const containerDropdownMenu=document.querySelector(".dropdown_menu");
 const dropdownMenuButtons=document.querySelectorAll("[data-dropdown-button]");
 const mainNav=document.querySelector("[data-is-main-navigation]");
 const supportMobile=document.getElementById("mobile-support-nav");
 const btnMenuOpen=document.getElementById("btnOpenMenu");
 const btnMenuClose=document.getElementById("btnCloseMenu");
 var isMain=mainNav.dataset.isMainNavigation;
var navigationMap=new Map(); 
var imageMap=new Map();
fetch('listNavigationElement.json').then(function(response){
    return response.json();
  }).then(function(obj){
try{navigationMap=extragereDateFromJson(obj);
if(navigationMap!=null){
parcurgereMap(navigationMap,"[data-category-menu]","[data-product-type-menu]","[data-product-list-menu]");
createNavigationMobile("[data-category-menu-mobile]","[data-product-type-menu-mobile]","[data-product-list-menu-mobile]");
setOnClickEventForUlCustomerType("customerCategory","Category");
  setOnClickEventForUlCustomerType("customerCategoryMobile","CategoryMobile");}
}
  catch(error){
    console.log("Reading data from  listNavigationElement.json"+error);
}
  });
  function setOnClickEventForUlCustomerType(itemSelected,typeCategory){
    try{
    var ul=document.getElementById(itemSelected);
    for(let child of ul.children){
      child.addEventListener("click",()=>{
        setItemSelected(ul,child);
         setImage(child.textContent);
         var id=getIdLiCategoryList(child.textContent,typeCategory);
      var elementSelected=document.getElementById(id);
      hideUlByParentClass(elementSelected.parentElement.className);
          elementSelected.classList.remove("hidden");
          elementSelected.classList.add("visible");
    })
    } }catch(error){
      console.log("Error for select customer type "+error);
    }
  }

  function getIdLiCategoryList(nameCategory,type){
    var id=nameCategory+type;
      return id=id.replace(" ","");
  }

  function extragereDateFromJson(obj){
    try{
    var map=new Map();
    if(obj!=null){
      var items=obj.listElements;
      if(items!=null){
           items.forEach(item=>{
            map.set(item.category,createMapProduct(item.productsList,item.products));
            imageMap.set(item.category,item.src);
           });
      }

    }
    return map; 
  }catch(error){
    console.log("Fail extract data from json object! "+error);
  }
  }
  function createMapProduct(listProducts, object){
    var mapProduct=new Map();
    if(listProducts!=null && listProducts!==undefined){
        for(let product of listProducts){
          if(product==="Clothing"){
            mapProduct.set(product,object[0].Clothing)
          }else if(product==="Shoes"){
            mapProduct.set(product,object[0].Shoes)
          }else if(product==="Accessories"){
            mapProduct.set(product,object[0].Accessories)
          }}}else{
            console.log("Error");
          }
        return mapProduct;
        
    }
    function createNavigationMobile(selectorContainerCC, selectorContainerTypePr,selectorContainerListPr){
    try{
      setClassAndIdToUl(createMenuOptionFromMap(navigationMap),selectorContainerCC,"customerCategoryMobile","style_CC");
      for(let key of navigationMap.keys()){
        var firstKey=key;
        var secondMap=navigationMap.get(key);
        var parent=document.querySelector(selectorContainerTypePr);
        let id=key+parent.dataset.id;
       id=id.replace(" ","");
       setClassAndIdToUl(createMenuOptionFromMap(secondMap),selectorContainerTypePr,id,"hidden style_ul_mobile");
        parent=document.querySelector(selectorContainerListPr);
          for(let secondKey of secondMap.keys()){
            let id=firstKey.replace(" ","")+secondKey+parent.dataset.id;
           
            setClassAndIdToUl( createUlListProductFromObject(secondMap.get(secondKey)),selectorContainerListPr,id,"hidden style_ul_mobile");
          }
                 }
                }catch(error){
                  console.log("Error create navigation for mobile suport."+error);
                }
    }
    function setClassAndIdToUl(ul,container,id,classUl){
      try{
      ul.setAttribute("id",id);
      ul.setAttribute("class",classUl);
      setConatiner(container,ul)
    }catch(error){
    console.log("Error to set class and id to ul "+error);
    }
   }
    function parcurgereMap(map,selectorContainerCC, selectorContainerTypePr,selectorContainerListPr){
      try{
      var ulCC=createMenuOptionFromMap(map);
      setClassAndIdToUl(ulCC,selectorContainerCC,"customerCategory","style_ul");
      setListProductToUl(map,selectorContainerTypePr);
        var parent=document.querySelector(selectorContainerListPr);
            for(let key of map.keys()){
              for(let productTypeK of (map.get(key)).keys()) {
              var ulTypePr = createUlListProductFromObject((map.get(key).get(productTypeK)));
            var  id=key+productTypeK+parent.dataset.id;
                 id=id.replace(" ","");
                 setClassAndIdToUl(ulTypePr,selectorContainerListPr,id,"hidden style_ul");
             }
            }
          }catch(error){
            console.log("Errot create navigation suport "+error);
          }
          }
  
    function setListProductToUl(map,selectorContainerTypePr){ 
      try{
      var parent=document.querySelector(selectorContainerTypePr);
      for(let key of map.keys()){
        var productTypeMap=map.get(key);
       var listTypeProduct=createMenuOptionFromMap(productTypeMap);
       var id=key+parent.dataset.id;
       id=id.replace(" ","");
       setClassAndIdToUl(listTypeProduct,selectorContainerTypePr,id,"hidden style_ul");}
      }catch(error){
            console.log("Error to set list product to ul element "+error);
      }
    }
    
  
    function createUlListProductFromObject(obj){
      try{
      var ul=document.createElement('ul');
      obj.forEach(item=>{
        var li=document.createElement("li");
        var a=document.createElement("a");
        a.textContent=item.name;
        a.setAttribute("href",item.href)
        li.appendChild(a);
        ul.appendChild(li);
      })
    
      return ul;}catch(error){
        console.log("Error to create list item product section"+error)
      }
    } 

    function settingProductsUlForCategory(container,ul,id){
          ul.setAttribute("id",id);
          ul.setAttribute("class","hidden style_ul")
          setConatiner(container,ul);
    }
  
    function  createMenuOptionFromMap(map){
      var list=parseMapToArray(map);
      if(list!=null || list!==undefined){
        var ul=createUlFromList(list);
        return ul;
      }
    
    }

    function createUlFromList(list){
        var ul=document.createElement('ul');
          for(let i=0;i<list.length;i++){
           var li=document.createElement("li");
           li.textContent=list[i];
           ul.appendChild(li);
          }
      return ul;
      }
      function setConatiner(itemSelected,ul){
        var container=document.querySelector(itemSelected);
        if(container!==undefined){
          container.appendChild(ul);
        }
      }
      
  
   function parseMapToArray(map){
    var list=Array.from(map.keys());
    return list;
   }

  function hideUlByParentClass(parentClass){
    var container=document.getElementsByClassName(parentClass);
   
    for(let parent of container){
     hideUlByParent(parent);
             }; 
  
  }
  function hideUlByParent(parent){
    var listeUlVisible=parent.querySelectorAll(".visible");
  
           if(listeUlVisible){
           listeUlVisible.forEach(element=>{
         
            element.classList.remove("visible");
            element.classList.add("hidden");
           });}
  }
  function getId(ul){
    try{
     let id=ul.localName;
     for (const attribute in ul.attributes) {
       if (ul.attributes.hasOwnProperty(attribute)) {
         const item = ul.attributes[attribute]
         if (item.localName === 'id') {
           id= item.value
         }
        }}
        return id;
      }catch(error){
           console.log("Error gettin id node "+error);
        }
  }
  function setImage(itemSelected){
    try{
    if(imageMap!=null || imageMap!==undefined){
      if(itemSelected!=null || itemSelected!== undefined){
      for(let key of imageMap.keys()){

        if(key===itemSelected){
          var img= document.querySelector(".imagine_banner_menu");
          img.setAttribute("src",imageMap.get(key));
        }
      }
     }
    } 
  }catch(error){
    console.log("Error setting image banner"+error);
  }
    
  }
 function setItemSelected(parent,element){
  for(let child of parent.children){
       child.setAttribute("style", "font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', Verdana, sans-serif");
  }
  element.setAttribute("style","font-family:'Courier New', Courier, monospace");
 }
 function displayDropdownMenu(isMainNav){
  try{ 
 btnMenuOpen.classList.remove("active");
  btnMenuOpen.classList.add("close");
  btnMenuClose.classList.remove("close");
  btnMenuClose.classList.add("active");
  if(isMainNav==="true" && window.innerWidth > 500){
  
   containerDropdownMenu.classList.add("active_flex");
    wrapperMenu.classList.add("active_flex");}
    else{
      if( wrapperMenu.classList.contains("active_flex"))

      {containerDropdownMenu.classList.remove("active_flex");
      wrapperMenu.classList.remove("active_flex");}
    
      supportMobile.classList.add("activeMobile");
     supportMobile.classList.remove("disable")
  
    content.classList.add("blurry-background");

  } }catch(error){
    console.log("Errror function open menu"+error);
  }
}
  function removeDropdownMenu(isMainNav){
try{ 
    btnMenuClose.classList.remove("active");
    btnMenuClose.classList.add("close");
    btnMenuOpen.classList.add("active");
    btnMenuOpen.classList.remove("close");
    
   if(isMainNav==='true' && window.innerWidth>500){
  
     containerDropdownMenu.classList.remove("active_flex");
     wrapperMenu.classList.remove("active_flex");
     }
    else{
   supportMobile.classList.remove("activeMobile");
   supportMobile.classList.add("disable")

    }
content.classList.remove("blurry-background");
  }catch(error){
    console.log("Error set function close menu "+error);
  }
  }


btnMenuOpen.addEventListener("click",()=>{
    var isMain=mainNav.dataset.isMainNavigation;         
    displayDropdownMenu(isMain);
  });
  
   
  btnMenuClose.addEventListener("click",()=>{
    var isMain=mainNav.dataset.isMainNavigation;   
    removeDropdownMenu(isMain);

  });

  function selectListProduct(selectorParent,partId){
    try {
    var parent=document.querySelector(selectorParent);
    var selectedUl=parent.querySelector(".visible");
    if(selectedUl!=null){
    for(let child of selectedUl.children){
      child.addEventListener("click",()=>{
        setItemSelected(selectedUl,child);
           var id=getId(selectedUl);
           
           var parentId=parent.dataset.id;
            id=id.replace(parentId,"");
            id+=child.textContent+partId;

         var elementSelected=document.getElementById(id);
           hideUlByParent(elementSelected.parentElement)
           elementSelected.classList.remove("hidden");
           elementSelected.classList.add("visible");
      
      })}}
    }catch(error){
      console.log("Error select produc from list "+error)
    }
  }

 document.addEventListener("click",e=>{
  if(e.target.closest("[data-dropdown-menu]")!=null){
  selectListProduct("[data-product-type-menu]","Product");}
  else if(e.target.closest("[data-mobile-nav]")!=null){
  selectListProduct("[data-product-type-menu-mobile]","ProductMobile")
  }
     
if((e.target.closest("[data-dropdown-menu]")!=null) || 
((e.target.closest("[data-dropdown-button]")!=null))  ||
 (e.target.closest("[data-mobile-nav]")!=null)
){
return;
}
else{
removeDropdownMenu(isMain);
} 
});

window.addEventListener("resize",(ev)=>{
  var mainNav=document.querySelector("[data-is-main-navigation]");
       if(window.innerWidth<500){
        mainNav.dataset.isMainNavigation="flase";
        btnMenuClose.classList.remove("active");
        btnMenuClose.classList.add("close");
        btnMenuOpen.classList.add("active");
        btnMenuOpen.classList.remove("close");
        wrapperMenu.classList.remove("active_flex");
       }else{

        mainNav.dataset.isMainNavigation="true";
        content.classList.remove("blurry-background");
        supportMobile.classList.add("disable");
       }
  })
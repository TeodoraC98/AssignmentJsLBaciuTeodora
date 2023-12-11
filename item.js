class item{
    price;
    description;
    src;
    sizeAvalibel;
    constructor(){
        this.price=null;
        this.description=null;
        this.src=null;
        this.sizeAvalibel=null;
    }
}
const listSrcImg=new Array();
listSrcImg.push("./images/coat_woman_1.jpg");
listSrcImg.push("./images/coat_woman_2.jpg");
listSrcImg.push("./images/coat_woman_3.jpg");
listSrcImg.push("./images/coat_woman_4.jpg");
listSrcImg.push("./images/coat_woman_6.jpg");
const wrapperItem=document.querySelector(".wrapper_item");
const listProduct=wrapperItem.querySelector(".list_product");
fetch("itemDescription.json").then(function(response){
    return response.json();
}).then(function (listObject){
  listObject.forEach(obj=>{
    let item=createContainerItem();
    let wrapperImg=createWrapperImg();
     let img=createImg(obj.src);
    
     item.append(wrapperImg);
     wrapperImg.append(img);
     createProductDescriptionSection(item,obj.description, obj.price);
    wrapperItem.append(item);
  })
})


function createWrapperImg(){
    let divWrapperImg=document.createElement("div");
    divWrapperImg.setAttribute("class","wrapper_img_product");
    return divWrapperImg;
    
}
function createContainerItem(){
    let divWrapperItem=document.createElement("div");
    divWrapperItem.setAttribute("class","container_product");
    console.log(divWrapperItem);
    return divWrapperItem;
}
function createProductDescriptionSection(container,itemName,itemPrice){
    let descriptionSection=document.createElement("div");
    descriptionSection.setAttribute("class","wrapper_product_description");
    let itemN=document.createElement("p");
    itemN.textContent=itemName;
    itemN.setAttribute("id","item_description");
    let itemP=document.createElement("p");
    itemP.textContent=itemPrice;
    descriptionSection.append(itemN);
    descriptionSection.append(itemP);
    container.append(descriptionSection);
  }
function createItemList(){
    let li=document.createElement("li");
    li.setAttribute("class","style_item_list")
      return li;
}
function createImg(src){
let img=document.createElement("img");
img.setAttribute("src",src);
img.setAttribute("class","style_img");
return img
}

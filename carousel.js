const carousel=document.querySelector(".carousel");
const items = carousel.querySelectorAll(".carousel__item");
const buttonArraws= carousel.querySelectorAll(".carousel_button_arrow");

const buttonCarouselsHtml = Array.from(items, () => {
      return `<li class="carousel_button"></li>`;
    });
          var index=0;
    carousel.insertAdjacentHTML(
      "beforeend",
      `
          <div class="navigation">
          <ul>
              ${buttonCarouselsHtml.join("")}
              </ul>
          </div>
      `
    );
    
    
    function unselectElementsCarousel(){
      items.forEach((item) =>
      item.classList.remove("carousel_item_selected")
    );
    buttons.forEach((button) =>
      button.classList.remove("carousel_button_selected")
    );
    }
    function selectElementsCarousel(index){
      items[index].classList.add("carousel_item_selected");
      buttons[index].classList.add("carousel_button_selected");
    }
    buttonArraws.forEach(buttonArrow =>{
      buttonArrow.addEventListener("click",()=>{
        index+=buttonArrow.dataset.carouselButton==="next" ? 1:-1;
        unselectElementsCarousel();
    if(index>items.length-1){
      index=0;
     selectElementsCarousel(index);
    }
       else if(index<0){
          index=items.length-1;
          selectElementsCarousel(index);
    }
      else{
        selectElementsCarousel(index);
      }
  });
    });
    const buttons=carousel.querySelectorAll(".carousel_button");
    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
        unselectElementsCarousel();
        index=i;
        selectElementsCarousel(index);
      });
    });
    selectElementsCarousel(index);
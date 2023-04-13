import animScroll from "./smoothScroll.mjs";

//prealoder
window.onload = function () {

  const loader = document.querySelector(".mod");
  loader.classList.add("_close");;
  document.body.classList.remove("_loading");
  
}

window.addEventListener('load', () => {

  setTimeout(() => {
    animScroll()
  }, 100)

})
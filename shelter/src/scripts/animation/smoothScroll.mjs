//Get all items to be animated
const animationItems = document.querySelectorAll('._animation-item')

function animScroll() {


  for (const animItem of animationItems) {
    //height of each animated items
    const itemHeight = animItem.offsetHeight

    //function offSet will return a normalized height from element to top of screen
    const itemOffset = offSet(animItem).top

    //The higher the coefficient, the sooner the animation will work.
    const start = 4

    let animItemPoint = window.innerHeight - itemHeight / start

    if (itemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / start
    }

    if ((window.pageYOffset > itemOffset - animItemPoint) && window.pageYOffset < (itemOffset + itemHeight)) {
      animItem.classList.add('_active')
    } else {
      if (!animItem.classList.contains('_animation-ended'))
        animItem.classList.remove('_active')
    }
  }
}


//for normalize offset
function offSet(el) {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

//animation only works if there is something to animate and if the device screen width is more than 800px
if (animationItems.length && window.innerWidth > 800) {
  window.addEventListener('scroll', animScroll)
}

export default animScroll 